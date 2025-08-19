import Hero from "@/Components/Hero";
import Home_page_blogs from "@/Components/Home_page_blogs";
import { Sidebar } from "lucide-react";
import Blogs from "./blogs/page";

export default function Home() {
  return (
    <>
      <div>
        <Hero></Hero>
        <Blogs></Blogs>
      </div>
    </>
  );
}
