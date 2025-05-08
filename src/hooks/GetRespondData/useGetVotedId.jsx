import { getAuthContext } from "@/AuthContext/AuthContextProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";


const useGetVotedId = (postId) => {
    const [isVoted, setIsVoted] = useState(null);
    const {user} = getAuthContext();
    const userId = user?.uid;
    if(!userId) return;
    // console.log(userId);
    const {data, isSuccess, refetch} = useQuery({
        queryKey: ['userId', postId],
        queryFn: async() =>{
            const res = await axios.post(`/api/get/getVotedPostId/${postId}`, {userId});
            return res.data;
        }
    })
    useEffect( () =>{
        if(data && isSuccess){
            setIsVoted(data?.status);
        }
    }, [data, isSuccess])
    // setIsVoted(data?.status);
    return {isVoted, refetch};
};

export default useGetVotedId;