"use client"
import { getAuthContext } from "@/AuthContext/AuthContextProvider";
import { redirect } from "next/navigation";
import { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";

const Logout = () => {
    const {logoutUser} = getAuthContext();
    const [logout, setLogout] = useState(false);
    // const navigate = use
    const handleLogout = () =>{
        logoutUser()
        .then( () =>{
            console.log("Logout successfully");
            setLogout(true);
        })
        .catch(error => console.log(error));
    }
    logout && redirect("/");
    return (
        <div className='flex justify-end items-center'>
            <button onClick={handleLogout} className="flex gap-2 items-center bg-cyan-400 py-1 px-2 rounded-lg cursor-pointer hover:bg-cyan-500 hover:scale-[102%] transition-all duration-300">
                <span>Logout</span>
                <IoLogOutOutline className="text-slate-900"></IoLogOutOutline>
            </button>
        </div>
    );
};

export default Logout;