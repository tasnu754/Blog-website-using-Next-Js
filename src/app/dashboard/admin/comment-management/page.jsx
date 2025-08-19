"use client";

import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiTrash2,
  FiEdit,
  FiCheck,
  FiX,
} from "react-icons/fi";

const CommentManagement = () => {
  // Dummy comment data
  const initialComments = [
    {
      id: 1,
      author: "John Doe",
      email: "john@example.com",
      content: "This is a great article! Very informative.",
      status: "approved",
      date: "2023-05-15",
      postTitle: "Getting Started with Next.js",
    },
    {
      id: 2,
      author: "Jane Smith",
      email: "jane@example.com",
      content: "I found a typo in the third paragraph.",
      status: "pending",
      date: "2023-05-16",
      postTitle: "React Hooks Explained",
    },
    {
      id: 3,
      author: "Mike Johnson",
      email: "mike@example.com",
      content: "Could you expand on the performance section?",
      status: "approved",
      date: "2023-05-17",
      postTitle: "Optimizing React Apps",
    },
    {
      id: 4,
      author: "Sarah Williams",
      email: "sarah@example.com",
      content: "Spam comment with promotional content.",
      status: "spam",
      date: "2023-05-18",
      postTitle: "CSS Grid Layouts",
    },
  ];

  const [comments, setComments] = useState(initialComments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedComments, setSelectedComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");

  // Filter comments based on search and status filter
  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.postTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || comment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handle comment selection
  const toggleCommentSelection = (commentId) => {
    if (selectedComments.includes(commentId)) {
      setSelectedComments(selectedComments.filter((id) => id !== commentId));
    } else {
      setSelectedComments([...selectedComments, commentId]);
    }
  };

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedComments.length === filteredComments.length) {
      setSelectedComments([]);
    } else {
      setSelectedComments(filteredComments.map((comment) => comment.id));
    }
  };

  // Change comment status
  const updateCommentStatus = (commentId, newStatus) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, status: newStatus } : comment
      )
    );
  };

  // Bulk status update
  const bulkUpdateStatus = (newStatus) => {
    setComments(
      comments.map((comment) =>
        selectedComments.includes(comment.id)
          ? { ...comment, status: newStatus }
          : comment
      )
    );
    setSelectedComments([]);
  };

  // Delete comments
  const deleteComments = (ids) => {
    setComments(comments.filter((comment) => !ids.includes(comment.id)));
    setSelectedComments(selectedComments.filter((id) => !ids.includes(id)));
    if (editingComment && ids.includes(editingComment)) {
      setEditingComment(null);
    }
  };

  // Start editing a comment
  const startEditing = (comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };

  // Save edited comment
  const saveEdit = () => {
    setComments(
      comments.map((comment) =>
        comment.id === editingComment
          ? { ...comment, content: editContent }
          : comment
      )
    );
    setEditingComment(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingComment(null);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-black">Comment Management</h1>

      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow-md text-black mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search comments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">
              Filter by status:
            </label>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="spam">Spam</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk actions */}
      {selectedComments.length > 0 && (
        <div className="bg-blue-50 rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="font-medium">
                {selectedComments.length} comment(s) selected
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => bulkUpdateStatus("approved")}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => bulkUpdateStatus("pending")}
                className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600"
              >
                Mark as Pending
              </button>
              <button
                onClick={() => bulkUpdateStatus("spam")}
                className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
              >
                Mark as Spam
              </button>
              <button
                onClick={() => deleteComments(selectedComments)}
                className="px-3 py-1 bg-gray-500 text-white rounded-md text-sm hover:bg-gray-600 flex items-center"
              >
                <FiTrash2 className="mr-1" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <input
                    type="checkbox"
                    checked={
                      selectedComments.length === filteredComments.length &&
                      filteredComments.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Author
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Comment
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  In Response To
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredComments.length > 0 ? (
                filteredComments.map((comment) => (
                  <tr
                    key={comment.id}
                    className={
                      selectedComments.includes(comment.id) ? "bg-blue-50" : ""
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedComments.includes(comment.id)}
                        onChange={() => toggleCommentSelection(comment.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {comment.author.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {comment.author}
                          </div>
                          <div className="text-sm text-gray-500">
                            {comment.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {editingComment === comment.id ? (
                        <div className="flex flex-col">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                            rows="3"
                          />
                          <div className="flex justify-end mt-2 space-x-2">
                            <button
                              onClick={saveEdit}
                              className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 flex items-center"
                            >
                              <FiCheck className="mr-1" /> Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="px-2 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 flex items-center"
                            >
                              <FiX className="mr-1" /> Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-900">
                          {comment.content}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {comment.postTitle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {comment.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          comment.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : comment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {comment.status.charAt(0).toUpperCase() +
                          comment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {comment.status !== "approved" && (
                          <button
                            onClick={() =>
                              updateCommentStatus(comment.id, "approved")
                            }
                            className="text-green-600 hover:text-green-900"
                            title="Approve"
                          >
                            <FiCheck />
                          </button>
                        )}
                        {comment.status !== "pending" && (
                          <button
                            onClick={() =>
                              updateCommentStatus(comment.id, "pending")
                            }
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Mark as Pending"
                          >
                            <FiFilter />
                          </button>
                        )}
                        {comment.status !== "spam" && (
                          <button
                            onClick={() =>
                              updateCommentStatus(comment.id, "spam")
                            }
                            className="text-red-600 hover:text-red-900"
                            title="Mark as Spam"
                          >
                            <FiX />
                          </button>
                        )}
                        <button
                          onClick={() => startEditing(comment)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => deleteComments([comment.id])}
                          className="text-gray-600 hover:text-gray-900"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No comments found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium text-gray-900">Total Comments</h3>
          <p className="text-3xl font-bold text-blue-600">{comments.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium text-gray-900">Approved</h3>
          <p className="text-3xl font-bold text-green-600">
            {comments.filter((c) => c.status === "approved").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium text-gray-900">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {comments.filter((c) => c.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium text-gray-900">Spam</h3>
          <p className="text-3xl font-bold text-red-600">
            {comments.filter((c) => c.status === "spam").length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentManagement;
