import Hero from "@/Components/Hero";
import Home_page_blogs from "@/Components/Home_page_blogs";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        <Hero></Hero>
        <Home_page_blogs></Home_page_blogs>
      </div>
    </>
  );
}
