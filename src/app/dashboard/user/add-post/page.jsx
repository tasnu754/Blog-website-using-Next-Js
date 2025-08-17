"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FiImage, FiTag, FiSave } from "react-icons/fi";

const AddPostPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    category: "",
    comments: [],
    likes: 0,
    dislikes: 0,
    author: currentUser?.uid || "",
    authorName: currentUser?.name || "Anonymous",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!currentUser)
        throw new Error("You must be logged in to create a post");

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...postData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create post");
      }

      router.push("/dashboard/user/my-posts");
    } catch (err) {
      setError(err.message);
      console.error("Post creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-800 mb-8">
        Create New Post
      </h1>

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
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            rows={8}
            className="w-full text-black px-4 te py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

        <div className="flex justify-center space-x-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-5 py-3 bg-purple-800 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400"
          >
            <FiSave className="mr-2" />
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostPage;
