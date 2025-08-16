"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiUser,
  FiPlusSquare,
  FiFileText,
  FiLogOut,
  FiUsers,
  FiMessageSquare,
  FiHome,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

const Sidebar = () => {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useAuth();
  const pathname = usePathname();

  const commonMenuItems = [
    {
      href: `/dashboard/${
        currentUser?.role === "admin" ? "admin" : "user"
      }/profile`,
      title: "Profile",
      icon: <FiUser className="w-5 h-5" />,
    },
  ];

  const userMenuItems = [
    {
      href: "/dashboard/user/add-post",
      title: "Add Post",
      icon: <FiPlusSquare className="w-5 h-5" />,
    },
    {
      href: "/dashboard/user/my-posts",
      title: "My Posts",
      icon: <FiFileText className="w-5 h-5" />,
    },
  ];

  const adminMenuItems = [
    {
      href: "/dashboard/admin/user-management",
      title: "User Management",
      icon: <FiUsers className="w-5 h-5" />,
    },
    {
      href: "/dashboard/admin/post-management",
      title: "All Posts",
      icon: <FiFileText className="w-5 h-5" />,
    },
    {
      href: "/dashboard/admin/comment-management",
      title: "Comments",
      icon: <FiMessageSquare className="w-5 h-5" />,
    },
  ];

  const menuItems = [
    ...commonMenuItems,
    ...(currentUser?.role === "admin" ? adminMenuItems : userMenuItems),
  ];

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      router.push("/login");
      Swal.fire("Logged Out!");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 h-screen bg-purple-800 text-white">
        <div className="flex items-center justify-center h-16 px-4 bg-purple-900">
          <h1 className="text-2xl font-bold">
            {currentUser?.role === "admin" ? "Admin" : "User"} Dashboard
          </h1>
        </div>

        <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors 
                  ${
                    isActive(item.href)
                      ? "text-white bg-purple-600"
                      : "hover:text-pink-300"
                  }
                  ${
                    router.pathname === item.href
                      ? "bg-indigo-700 text-white"
                      : "text-gray-300 hover:bg-purple-700 hover:text-white"
                  }
                `}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="text-lg font-bold">{item.title}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto mb-4">
            <button
              onClick={() => {
                router.push("/");
              }}
              className="flex items-center w-full px-4 py-3 text-xl font-medium text-gray-300 rounded-lg hover:bg-purple-700 hover:text-white"
            >
              <FiHome className="w-5 h-5 mr-3" />
              Home
            </button>
          </div>
          <div className="mt-auto mb-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-xl font-medium text-gray-300 rounded-lg hover:bg-purple-700 hover:text-white"
            >
              <FiLogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
