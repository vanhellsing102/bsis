
"use client"
import { getAuthContext } from "@/AuthContext/AuthContextProvider";
import useGetCurrentUserPost from "../hooks/useGetCurrentUserPost";
import PostCard from "./PostCard";


const UserProfilePosts = () => {
    // const [userPosts, setUserPosts] = useState([]);
    const {user} = getAuthContext();
    const userId = user?.uid;
    if(!userId){
        return;
    }
    const {userPosts, isLoading} = useGetCurrentUserPost(userId);
    // console.log(userPosts);

    return (
        <div className="mt-10">
            <h2 className="text-center text-3xl font-semibold text-slate-800">Your Posts</h2>
            <div className="md:w-[70%] w-full mx-auto space-y-3">
                {
                    isLoading ? 
                    <p className="flex justify-center mt-16">
                        <span className="loading loading-spinner text-info"></span>
                    </p>
                    :
                    userPosts.length > 0 
                    ?
                    userPosts.map(post => <PostCard key={post?._id} post={post}></PostCard>)
                    :
                    <p className="text-lg text-red-600 mt-5">No post available!!!</p>
                }
            </div>
        </div>
    );
};

export default UserProfilePosts;