import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetTopIssue = () => {
    const {data: topPosts = [], isLoading} = useQuery({
        queryKey: ['topPosts'],
        queryFn: async() =>{
            const res = await axios.get('/api/get/top');
            return res.data;
        }
    })
    return {topPosts, isLoading};
};

export default useGetTopIssue;