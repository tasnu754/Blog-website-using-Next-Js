import Link from "next/link";
import { SignUp } from "@/actions/authentication";

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="flex items-center justify-center min-h-screen backdrop-blur-sm">
        <div className="w-full max-w-lg px-8  py-12 mx-4 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-lg">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">WordWave</h1>
            <p className="text-purple-200">Create your account</p>
          </div>

          <form className="space-y-6 " action={SignUp}>
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
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 bg-white/10 border-white/20 rounded focus:ring-purple-500 text-purple-600"
                required
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
              className="w-full text-xl py-3 px-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300 hover:shadow-purple-500/30"
            >
              Sign Up
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
