"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Import icons for mobile menu

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blogs", label: "Blogs" },
    { href: "/register", label: "Register" },
  ];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">WordWave</h2>
        </div>

        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex flex-1">
          <ul className="flex justify-evenly text-lg sm:text-xl w-full max-w-2xl mx-auto">
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`block py-2 px-1 ${
                    isActive(link.href)
                      ? "text-pink-200"
                      : " hover:text-pink-300"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-1 bg-pink-600 transition-all duration-300 ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile menu button - visible only on mobile */}
        <button
          className="md:hidden p-2 "
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - appears when menu button is clicked */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
