"use client"
import PostCard from "@/components/PostCard";
import useGetAllPost from "../hooks/useGetAllPost";

export default function Home() {
  const {allPost,isLoading} = useGetAllPost();
  // console.log(allPost);
  return (
    <div className="md:w-[70%] w-full mx-auto space-y-3">
      {
        isLoading ?
        <p className="flex justify-center mt-16">
          <span className="loading loading-spinner text-info"></span>
        </p>:
        allPost.length > 0 &&
        allPost.map((post, index) => <PostCard key={index} post={post}></PostCard>)
      }
    </div>
  );
}
