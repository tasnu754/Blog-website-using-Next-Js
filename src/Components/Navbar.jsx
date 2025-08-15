"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { auth } from "@/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, loading, setCurrentUser } = useAuth();
  console.log(currentUser, "usserrr");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const isActive = (path) => pathname === path;

  const commonLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blogs", label: "Blogs" },
  ];

  const authLinks = [
    { href: "/dashboard", label: "Dashboard" },
    {
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const unauthLinks = [
    { href: "/register", label: "Register" },
    { href: "/login", label: "Login" },
  ];

  const navLinks = [...commonLinks, ...(currentUser ? authLinks : unauthLinks)];

  if (loading) {
    return <div className="py-6 px-4 sm:px-6 lg:px-8">Loading...</div>;
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">WordWave</h2>
        </div>

        <div className="hidden md:flex flex-1">
          <ul className="flex justify-evenly text-lg sm:text-xl w-full max-w-2xl mx-auto">
            {navLinks.map((link) => (
              <li key={link.href || link.label} className="relative">
                {link.href ? (
                  <Link
                    href={link.href}
                    className={`block py-2 px-1 ${
                      isActive(link.href)
                        ? "text-pink-200"
                        : "hover:text-pink-300"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-1 bg-pink-600 transition-all duration-300 ${
                        isActive(link.href)
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                ) : (
                  <button
                    onClick={link.onClick}
                    className="block py-2 px-1 hover:text-pink-300"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-1 bg-pink-600 w-0 group-hover:w-full transition-all duration-300"></span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <li key={link.href || link.label} className="relative">
                {link.href ? (
                  <Link
                    href={link.href}
                    className={`block py-2 px-1 text-lg ${
                      isActive(link.href) ? "text-pink-200" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-1 bg-pink-600 transition-all duration-300 ${
                        isActive(link.href) ? "w-full" : "w-0"
                      }`}
                    ></span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      link.onClick();
                      setMobileMenuOpen(false);
                    }}
                    className="block py-2 px-1 text-lg text-left"
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
