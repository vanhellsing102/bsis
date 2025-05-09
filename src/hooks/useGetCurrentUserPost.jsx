import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetCurrentUserPost = (userId) => {
    // console.log(userId);
    const {data: userPosts, refetch: refetchCurrentUserPostVoteAndBoycott,isLoading} = useQuery({
        queryKey: ["userPost", userId],
        queryFn: async() =>{
            const res = await axios.get(`/api/get/getUserPosts/${userId}`);
            return res.data;
        },
        enabled: !!userId
    })
    return {userPosts, refetchCurrentUserPostVoteAndBoycott, isLoading};
};

export default useGetCurrentUserPost;
