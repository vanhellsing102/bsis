import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Opinion = ({opi}) => {
    const {text, userId, userName} = opi;
    console.log(userName)
    return (
        <div className='flex items-center gap-3'>
            <Image className='rounded-full' width={35} height={35} src={"/images/postcard/download.png"} alt='profile pic'></Image>
            <div className='bg-gray-300 w-full rounded-lg px-5 py-1'>
                <Link href={`/u/${userId}`} className='text-[14px] font-bold hover:underline underline-offset-4'>{userName}</Link>
                <p className='text-sm text-slate-700'>{text}</p>
            </div>
        </div>
    );
};

export default Opinion;