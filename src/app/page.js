import Hero from "@/Components/Hero";
import Home_page_blogs from "@/Components/Home_page_blogs";
import { Sidebar } from "lucide-react";

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
