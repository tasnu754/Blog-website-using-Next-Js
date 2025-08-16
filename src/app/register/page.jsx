"use client";

import Link from "next/link";
import { SignUp } from "@/actions/authentication";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await SignUp(formData);
      if (result.success) {
        Swal.fire({
          title: "SignUp Successfull. Please Login!",
          icon: "success",
          draggable: true,
        });
        router.push("/login");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="flex items-center justify-center min-h-screen backdrop-blur-sm">
        <div className="w-full max-w-lg px-8 py-12 mx-4 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-lg">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">WordWave</h1>
            <p className="text-purple-200">Create your account</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded-lg">
              {error}
            </div>
          )}

          <form action={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium text-purple-100 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="John Doe"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium text-purple-100 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="you@example.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-md font-medium text-purple-100 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 bg-white/10 border-white/20 rounded focus:ring-purple-500 text-purple-600"
                required
                disabled={isLoading}
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-md text-purple-100"
              >
                I agree to the{" "}
                <Link href="#" className="text-purple-300 hover:text-white">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-purple-300 hover:text-white">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-xl py-3 px-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-lg shadow-lg transition-all duration-300 ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:from-purple-700 hover:to-violet-700 hover:shadow-purple-500/30"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-purple-200">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-white font-medium hover:text-purple-500 transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
