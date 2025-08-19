"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FiImage, FiTag, FiSave, FiX } from "react-icons/fi";
import Swal from "sweetalert2";

const EditUserPost = () => {
  const { postId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    category: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const resData = await response.json();
        const data = resData.data;
        setPostData({
          title: data.title,
          content: data.content,
          imageUrl: data.imageUrl,
          category: data.category,
        });
      } catch (err) {
        setError(err.message);
        Swal.fire("Error!", err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update post");
      }

      await Swal.fire("Success!", "Post updated successfully", "success");
      router.push("/dashboard/user/my-posts");
    } catch (err) {
      setError(err.message);
      Swal.fire("Error!", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-800"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-800 mb-8">Edit Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-xl font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-xl text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-xl font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={postData.content}
            onChange={handleChange}
            required
            rows={7}
            className="w-full text-xl text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="imageUrl"
              className="flex items-center text-xl font-medium text-gray-700 mb-1"
            >
              <FiImage className="mr-2" /> Featured Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={postData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 text-xl text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="flex items-center text-xl font-medium text-gray-700 mb-1"
            >
              <FiTag className="mr-2" /> Category
            </label>
            <select
              id="category"
              name="category"
              value={postData.category}
              onChange={handleChange}
              required
              className="w-full text-xl px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a category</option>
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
        )}

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => router.push("/dashboard/user/my-posts")}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <FiX className="mr-2" /> Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400"
          >
            <FiSave className="mr-2" />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPost;
