"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// import useGetCurrentLocation from './useGetCurrentLocation';

const useGetAllPost = () => {
    // const {location} = useGetCurrentLocation();
    // console.log(location);
    const {data: allPost = [], isLoading, refetch: refetchVotesAndBoycott} = useQuery({
        queryKey: ['allPost'],
        queryFn: async() =>{
            // if(!location) return [];
            // console.log(location)
            const res = await axios.get(`/api/get/getAllPost`);
            // console.log("getall post", res.data.allPost)
            return res.data.allPost;
        },
    })
    return {allPost, isLoading, refetchVotesAndBoycott};
};

export default useGetAllPost;