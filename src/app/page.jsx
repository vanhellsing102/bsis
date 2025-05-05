"use client"
import PostCard from "@/components/PostCard";
import useGetAllPost from "../hooks/useGetAllPost";

export default function Home() {
  const allPost = useGetAllPost();
  // console.log(allPost);
  return (
    <div className="md:w-[70%] w-full mx-auto space-y-3">
      {
        allPost.length > 0 &&
        allPost.map((post, index) => <PostCard key={index} post={post}></PostCard>)
      }
    </div>
  );
}
