// components/Hero.js
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative  py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Discover & Share{" "}
              <span className="text-pink-600">Great Ideas</span>
            </h1>
            <p className="text-lg text-gray-350">
              Explore insightful articles, tutorials, and stories from our
              community of passionate writers and thinkers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/blogs"
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300 text-center"
              >
                Browse Articles
              </Link>
              <Link
                href="/"
                className="border border-pink-600 text-pink-600 hover:bg-pink-600 hover:border-pink-900 hover:text-white px-6 py-3 rounded-lg font-medium transition duration-300 text-center"
              >
                Get Updates
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
              <div className="relative h-48 md:h-64 w-full">
                <Image
                  src="/hero.jpg"
                  alt="Person writing in notebook with laptop on desk"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover overflow-hidden"
                  priority
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-md text-pink-600 mb-2 font-bold "></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Ignite Your Curiosity Through Thoughtful Writing
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-4">
                  Learn the essential steps to launch your own blog and grow
                  your audience with these proven strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
