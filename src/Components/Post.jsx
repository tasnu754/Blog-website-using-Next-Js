import Image from "next/image";
import Link from "next/link";

export default function Post() {
  return (
    <div className="max-w-5xl mx-auto px-5 md:px-2 lg:px-0">
      <div className="relative h-64 md:h-96 w-full bg-gray-100 mb-4 rounded-3xl">
        <Image
          src="/222.jpg"
          alt="Mars landscape"
          fill
          className="object-cover rounded-2xl"
          priority
        />
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-light leading-tight mb-2">
          I would like to die on Mars. Just not on impact.
        </h1>

        <div className="flex items-center text-gray-500 space-x-4 pb-8 border-t  border-gray-200">
          <time dateTime="2021-12-26" className="text-md my-2">
            December 26, 2021
          </time>
          <span className="text-gray-300">•</span>
          <Link href="/post-Details">
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
