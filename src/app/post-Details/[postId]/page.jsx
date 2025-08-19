"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const PostDetails = () => {
  const params = useParams();
  const postId = params?.postId;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!postId) {
          throw new Error("No post ID provided");
        }

        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params?.id]);

  //   const handleLike = async () => {
  //     try {
  //       const response = await fetch(`/api/posts/${params.id}/like`, {
  //         method: "PUT", // Changed from POST to PUT
  //       });
  //       if (!response.ok) throw new Error("Failed to like post");
  //       const updatedPost = await response.json();
  //       setPost(updatedPost.data);
  //       setMessage("You liked this post!");
  //       setTimeout(() => setMessage(""), 2000);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   const handleDislike = async () => {
  //     try {
  //       const response = await fetch(`/api/posts/${params.id}/dislike`, {
  //         method: "PUT", // Changed from POST to PUT
  //       });
  //       if (!response.ok) throw new Error("Failed to dislike post");
  //       const updatedPost = await response.json();
  //       setPost(updatedPost.data);
  //       setMessage("You disliked this post.");
  //       setTimeout(() => setMessage(""), 2000);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   const handleCommentSubmit = async (e) => {
  //     e.preventDefault();
  //     if (newComment.trim() === "") return;

  //     try {
  //       const response = await fetch(`/api/posts/${postId}/comments`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           text: newComment,
  //           userId: "current-user-id", // Replace with actual user ID from auth
  //           userName: "Current User", // Replace with actual user name
  //         }),
  //       });

  //       if (!response.ok) throw new Error("Failed to add comment");
  //       const updatedPost = await response.json();
  //       setPost(updatedPost.data);
  //       setNewComment("");
  //       setMessage("Comment added successfully!");
  //       setTimeout(() => setMessage(""), 2000);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Post not found
        </div>
      </div>
    );
  }

  return (
    <div className=" font-sans text-gray-800 pb-10">
      <main className="container mx-auto mt-8 px-4 max-w-4xl">
        <article className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
          {/* Post Hero Image */}
          <img
            src={
              post.imageUrl ||
              "https://placehold.co/1200x600/10B981/ffffff?text=Blog+Post+Hero"
            }
            alt={post.title}
            className="w-full h-auto object-cover rounded-lg mb-6"
          />

          {/* Post Header */}
          <div className="border-b pb-4 mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-2">
              {post.title}
            </h1>
            <div className="text-sm text-gray-500 flex items-center space-x-4">
              <span>By {post.authorName}</span>
              <span>•</span>
              <span>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Like/Dislike and Social Sharing */}
          <div className="flex items-center space-x-4 mt-8 pt-4 border-t">
            <button
              //   onClick={handleLike}
              className="flex items-center space-x-2 bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-thumbs-up"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3"></path>
              </svg>
              <span>{post.likes || 0}</span>
            </button>
            <button
              //   onClick={handleDislike}
              className="flex items-center space-x-2 bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-400 transition duration-300 transform hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-thumbs-down"
              >
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-11h2.28a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-3"></path>
              </svg>
              <span>{post.dislikes || 0}</span>
            </button>
          </div>

          {message && (
            <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-lg shadow-inner transition-opacity duration-500">
              {message}
            </div>
          )}
        </article>

        {/* Comment Section */}
        <div className="bg-white rounded-xl shadow-lg mt-8 p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-6 border-b pb-4">
            Comments ({post.comments?.length || 0})
          </h2>

          <form
            //   onSubmit={handleCommentSubmit}
            className="mb-6"
          >
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 resize-none"
              rows="4"
              placeholder="Write your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-105"
            >
              Post Comment
            </button>
          </form>

          <div className="space-y-6">
            {post.comments?.map((comment) => (
              <div
                key={comment._id || comment.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="font-semibold text-gray-900">
                  {comment.author}
                </div>
                <p className="mt-1 text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostDetails;
