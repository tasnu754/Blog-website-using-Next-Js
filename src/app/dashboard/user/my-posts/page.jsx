"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import Link from "next/link";
import Swal from "sweetalert2";

const UserPosts = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (!currentUser?.uid) return;

        setLoading(true);
        const response = await fetch(`/api/posts?author=${currentUser.uid}`);

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(Array.isArray(data) ? data : data.posts || data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [currentUser]);

  const handleDelete = async (postId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await fetch(`/api/posts/${postId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete post");
        }

        await Swal.fire("Deleted!", "Your post has been deleted.", "success");

        setPosts(posts.filter((post) => post._id !== postId));
      }
    } catch (err) {
      // Show error message
      await Swal.fire(
        "Error!",
        err.message || "Failed to delete post",
        "error"
      );
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-black bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Your Posts</h1>
        <p>Loading your posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-black bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Your Posts</h1>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-7 text-black bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-800">Your Posts</h1>
        <Link
          href="/dashboard/user/add-post"
          className="px-4 py-2 text-xl bg-purple-800 text-white rounded hover:bg-purple-700"
        >
          Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p>You haven't created any posts yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr className="text-xl" key={post._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-gray-900">{post.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-4 inline-flex text-xl leading-9 font-semibold rounded-full bg-purple-100 text-purple-800 capitalize">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/post-Details/${post._id}`}
                        className="text-blue-600 hover:text-blue-900 p-1 text-xl"
                        title="View"
                      >
                        <FiEye />
                      </Link>
                      <Link
                        href={`/dashboard/user/edit-post/${post._id}`}
                        className="text-yellow-600 hover:text-yellow-900 p-1 text-xl"
                        title="Edit"
                      >
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-red-600 hover:text-red-900 p-1 text-xl"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserPosts;
