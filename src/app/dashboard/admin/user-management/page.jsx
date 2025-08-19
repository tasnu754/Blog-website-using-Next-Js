"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch users",
      });
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
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
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: "DELETE",
        });
        const result = await response.json();

        if (result.success) {
          // Optimistically update UI
          setUsers(users.filter((user) => user._id !== userId));
          await Swal.fire("Deleted!", result.message, "success");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result.error || "Failed to delete user",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Network error - failed to delete user",
        });
      }
    }
  };

  //   const handleSuspend = async (userId, isSuspended) => {
  //     try {
  //       const response = await fetch(`/api/users/${userId}/suspend`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ suspended: !isSuspended }),
  //       });
  //       const result = await response.json();
  //       if (result.success) {
  //         await Swal.fire(
  //           "Success!",
  //           isSuspended
  //             ? "User activated successfully"
  //             : "User suspended successfully",
  //           "success"
  //         );
  //         fetchUsers();
  //       } else {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Error",
  //           text: result.error,
  //         });
  //       }
  //     } catch (error) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: "Failed to update user status",
  //       });
  //     }
  //   };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map((user) => user._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const toggleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedUsers?.length) {
      await Swal.fire({
        icon: "warning",
        title: "No Selection",
        text: "No users selected",
      });
      return;
    }

    const result = await Swal.fire({
      title: `Delete ${selectedUsers.length} users?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch("/api/users/bulk", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds: selectedUsers }),
        });
        const result = await response.json();

        if (result.success) {
          // Optimistically update UI
          setUsers(users.filter((user) => !selectedUsers.includes(user._id)));
          setSelectedUsers([]);
          await Swal.fire("Deleted!", result.message, "success");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result.error || "Failed to delete users",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Network error - failed to delete users",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-black">User Management</h1>

      <div className="mb-4 flex justify-between items-center">
        <div>
          {selectedUsers?.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
            >
              Delete Selected ({selectedUsers?.length})
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={
                    selectedUsers?.length === users?.length && users?.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => toggleSelectUser(user._id)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-lg font-medium text-gray-900">
                    {user.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-lg text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-lg leading-5 font-semibold rounded-full ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-lg leading-5 font-semibold rounded-full ${
                      user.suspended
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.suspended ? "Suspended" : "Active"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg font-medium">
                  <button
                    // onClick={() => handleSuspend(user._id, user.suspended)}
                    className={`mr-2 ${
                      user.suspended
                        ? "text-green-600 hover:text-green-900"
                        : "text-yellow-600 hover:text-yellow-900"
                    }`}
                  >
                    {user.suspended ? "Activate" : "Suspend"}
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
