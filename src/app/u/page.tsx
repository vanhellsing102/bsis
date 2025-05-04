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
        <div>
            <Link href={'/login'}>Login</Link>
        </div>
    );
};

export default Page;