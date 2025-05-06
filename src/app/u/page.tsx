"use client"
import { getAuthContext } from "@/AuthContext/AuthContextProvider";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = () => {
    const {user} = getAuthContext();
    if(user){
        redirect(`/u/${user?.uid}`);
    }
    // console.log(user);

    return (
        <div className="flex justify-end items-center">
            <Link href={'/login'} className="bg-cyan-400 py-1 px-3 rounded-lg cursor-pointer hover:bg-cyan-500 hover:scale-[102%] transition-all duration-300 text-white font-semibold">Please Login First</Link>
        </div>
    );
};

export default Page;