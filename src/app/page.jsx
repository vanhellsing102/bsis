"use client"
import PostCard from "@/components/PostCard";
import useGetAllPost from "../hooks/useGetAllPost";

export default function Home() {
  const {allPost,isLoading} = useGetAllPost();
  // console.log(allPost);
  return (
    <div>
      <p className="bg-cyan-200 rounded-lg text-center py-5 text-slate-500 font-semibold">
        This section displays all issues reported by citizens. <br /> Posts with the highest number of votes appear at the top, helping us focus on the most pressing problems in our communities.
      </p>
      <div className="md:w-[70%] w-full mx-auto space-y-3 mt-3">
      {
        isLoading ?
        <p className="flex justify-center mt-16">
          <span className="loading loading-spinner text-info"></span>
        </p>:
        allPost.length > 0 &&
        allPost.map((post, index) => <PostCard key={index} post={post}></PostCard>)
      }
    </div>
    </div>
  );
}
