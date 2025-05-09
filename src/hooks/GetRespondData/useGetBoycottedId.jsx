import { useQuery } from "@tanstack/react-query";
import {getAuthContext} from "../../AuthContext/AuthContextProvider";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetBoycottedId = (postId) => {
    const [isBoycott, setIsBoycott] = useState(null);
    const {user} = getAuthContext();
    const uid = user?.uid;
    if(!uid) return;
    // console.log(uid);
    const {data, isSuccess, refetch: ref} = useQuery({
        queryKey: ["postId", postId],
        queryFn: async() =>{
            const res = await axios.post(`/api/get/getBoycottedPostId/${postId}`, {uid});
            return res.data;
        }
    });
    useEffect( () =>{
        if(data && isSuccess){
            setIsBoycott(data.message);
        }
    }, [data, isSuccess])
    return {isBoycott, ref};
};

export default useGetBoycottedId;