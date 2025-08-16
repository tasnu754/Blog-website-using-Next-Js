"use client";

import PrivateRoute from "@/Components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      const redirectPath =
        currentUser.role === "admin" ? "/dashboard/admin" : "/dashboard/user";
      router.push(redirectPath);
    }
  }, [currentUser, router]);

  return (
    <PrivateRoute requiredRole={currentUser.role}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    </PrivateRoute>
  );
}
