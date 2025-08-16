"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children, requiredRole }) {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    } else if (requiredRole && currentUser.role !== requiredRole) {
      router.push("/unauthorized");
    }
  }, [currentUser, requiredRole, router]);

  if (!currentUser || (requiredRole && currentUser.role !== requiredRole)) {
    return <div>Loading</div>;
  }

  return children;
}
