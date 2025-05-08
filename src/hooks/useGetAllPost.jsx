import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetAllPost = () => {
    const {data: allPost, isLoading} = useQuery({
        queryKey: ['allPost'],
        queryFn: async() =>{
            const res = await axios.get('/api/get/getAllPost');
            return res.data.allPost;
        }
    })
    return {allPost, isLoading};
};

export default useGetAllPost;