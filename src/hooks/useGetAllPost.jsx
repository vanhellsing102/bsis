import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetAllPost = () => {
    const [allPost, setAllPost] = useState([]);
    useEffect( () =>{
        axios.get('/api/get/getAllPost')
    .then(res => setAllPost(res.data.allPost));
    }, [])
    return allPost;
};

export default useGetAllPost;