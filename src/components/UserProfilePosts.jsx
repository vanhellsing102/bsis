import { getAuthContext } from "@/AuthContext/AuthContextProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";


const UserProfilePosts = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const {user} = getAuthContext();
    const userId = user?.uid;
    // console.log(user?.uid)

    useEffect( () =>{
        // console.log(userId)
        setLoading(true);
        axios.get(`/api/get/getUserPosts/${userId}`)
        .then(res =>{
            setUserPosts(res.data);
            setLoading(false);
        })
    }, [userId])
    console.log(userPosts);
    return (
        <div className="mt-10">
            <h2 className="text-center text-3xl font-semibold text-slate-800">My Posts</h2>
            <div className="md:w-[70%] w-full mx-auto space-y-3">
                {
                    (userPosts.length != 0 || !loading) ?
                    userPosts.map(post => <PostCard key={post?._id} post={post}></PostCard>)
                    : 
                    <p className="flex justify-center mt-16">
                        <span className="loading loading-spinner text-info"></span>
                    </p>
                }
            </div>
        </div>
    );
};

export default UserProfilePosts;