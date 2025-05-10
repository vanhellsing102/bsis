"use client"
import Link from "next/link";
import { navData } from "../../libs/data";
import { useState } from "react";

const Navbar = () => {
    const [navId, setNavId] = useState(0);
    // console.log(navId);
    return (
        <div className="flex justify-between items-center py-3">
            <a href="/" className='text-3xl font-semibold text-slate-500'>BS<span className="text-cyan-400">IS</span></a>
            <div>
                <ul className="flex items-center gap-3 bg-slate-200 rounded-lg border border-white/30 py-2 px-4">
                    {
                        navData.map(navItem => 
                            <li className={`py-1 px-3 text-[15px] ${navId == navItem.id ? "bg-cyan-300 rounded-lg" : ""}`} onClick={() =>setNavId(navItem.id)} key={navItem?.id}>
                                <Link href={navItem?.link}>{navItem?.title}</Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;