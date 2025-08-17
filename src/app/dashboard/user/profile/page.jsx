"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import {
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!currentUser?.uid) {
          throw new Error("No user logged in");
        }

        const response = await fetch(`/api/users/${currentUser.uid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
        setEditForm({
          name: data.name,
          email: data.email,
        });
      } catch (err) {
        setError(err.message || "An unknown error occurred");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditForm({
      name: userData.name,
      email: userData.email,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/${currentUser.uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      setEditing(false);
    } catch (err) {
      setError(err.message || "Failed to update profile");
      console.error("Update error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg shadow">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-3xl mx-auto  p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-purple-900">User Profile</h1>
        {!editing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <PencilSquareIcon className="h-5 w-5" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <CheckIcon className="h-5 w-5" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              <XMarkIcon className="h-5 w-5" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">
              Basic Information
            </h2>
            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <p className="text-lg text-gray-500">Name</p>
                  <p className="text-xl text-purple-800 font-bold">
                    {userData?.name}
                  </p>
                </div>
                <div>
                  <p className="text-lg  text-gray-500">Email</p>
                  <p className="text-xl text-purple-800 font-bold">
                    {userData?.email}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-gray-500">Role</p>
                  <p className="text-xl text-purple-800 font-bold capitalize">
                    {userData?.role}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-gray-500">Member Since</p>
                  <p className="text-xl text-purple-800 font-bold">
                    {new Date(userData?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">
              Statistics
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                <span className="text-gray-600">Posts Created</span>
                <span className="font-bold text-purple-800">
                  {userData?.posts?.length || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                <span className="text-gray-600">Account Status </span>
                <span className="font-bold text-green-600"> Active</span>
              </div>
            </div>
          </div>
        </div>

        {userData?.role === "admin" && (
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Admin Privileges
            </h2>
            <p className="text-blue-700">
              You have access to administrative features.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
