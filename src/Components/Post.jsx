import Image from "next/image";
import Link from "next/link";

export default function Post({ post }) {
  return (
    <div className="max-w-5xl mx-auto px-5 md:px-2 lg:px-0">
      <div className="relative object-cover w-full bg-gray-100 mb-4 rounded-3xl">
        <img
          src={post.imageUrl}
          alt="Mars landscape"
          // fill
          // sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover rounded-2xl h-64"
          // priority
        />
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-light leading-tight mb-2">
          {post.title}
        </h1>

        <div className="flex items-center text-gray-500 space-x-4 pb-8 border-t  border-gray-600">
          <time dateTime="2021-12-26" className="text-md my-2">
            {post.createdAt}
          </time>
          <span className="text-gray-300">•</span>
          <Link href={`/post-Details/${post._id}`}>
            {" "}
            <span className="text-md text-pink-500 hover:text-pink-800">
              Blog
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
