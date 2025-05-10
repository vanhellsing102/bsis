"use client";
import PostCard from "@/components/PostCard";
import useGetTopIssue from "../../hooks/useGetTopIssue";

const page = () => {
  const { topPosts, isLoading } = useGetTopIssue();
//   console.log(topPosts);
  return (
    <div>
      <p className="bg-cyan-200 rounded-lg text-center py-5 text-slate-500 font-semibold">
        Here {`you'll`} find the most discussed and significant problems raised
        by the people. <br /> This list is based on public votes, opinions, and
        responses—so we can focus on the real issues affecting our country
        together.
      </p>
      <h2 className="text-3xl font-bold text-center my-2">Top Issue</h2>
      <div className="md:w-[70%] w-full mx-auto space-y-3">
        {isLoading ? (
          <p className="flex justify-center mt-16">
            <span className="loading loading-spinner text-info"></span>
          </p>
        ) : (
          topPosts.slice(0,10).map(post => <PostCard key={post?._id} post={post}></PostCard>)
        )}
      </div>
    </div>
  );
};

export default page;
