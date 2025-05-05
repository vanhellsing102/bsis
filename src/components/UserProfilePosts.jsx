import { useEffect, useState } from "react";


const UserProfilePosts = () => {
    const [userPosts, setUserPosts] = useState([]);
    useEffect( () =>{
        
    }, [])
    return (
        <div className="mt-10">
            <h2 className="text-center text-3xl font-semibold text-slate-800">My Posts</h2>
            <div>
                
            </div>
        </div>
    );
};

export default UserProfilePosts;