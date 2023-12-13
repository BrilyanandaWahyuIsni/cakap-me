/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

import { MdVerified } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { FiMessageCircle } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";
import { IoShareSocialOutline } from "react-icons/io5";

export default function CakapStatus() {
    return (
        <div className='w-full flex justify-between p-2 pb-1 border-b-2 border-base-200'>
            <div className='md:w-[15%] w-1/5'>
                <div className='w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center'>P</div>
            </div>
            <div className='md:w-[85%] w-4/5 flex flex-col gap-1 p-3 pl-0 pt-0'>

                {/* nickname */}
                <div className='flex items-center justify-between gap-1'>
                    <h1 className='flex truncate gap-2'>
                        <span className='font-bold'>Name Account</span>
                        @name_abc
                    </h1>
                    <div className='flex whitespace-nowrap items-center gap-1'>
                        <MdVerified color='blue' className='text-blue-900' />
                        <div className='whitespace-nowrap'>27 Nov</div>
                        <HiDotsVertical className='' />
                    </div>
                </div>

                {/* status */}
                <div className='w-full'>
                    {/* status text */}
                    <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint adipisci omnis debitis in quia deserunt placeat, quis blanditiis a eius, necessitatibus nostrum laboriosam suscipit ab!</p>
                    {/* status text image */}
                    <div className='w-full rounded-lg overflow-hidden'>
                        <img src="https://pbs.twimg.com/media/GA-jzyqaIAAHZY5?format=jpg&name=medium" alt="" className='w-full' />
                    </div>
                </div>

                {/* balasan */}
                <div className='flex justify-between'>
                    <Link href="/comment" className='flex items-center gap-1'><FiMessageCircle /> 33</Link>
                    <button className='flex items-center gap-1'><GoHeart /> 33</button>
                    <button className='flex items-center gap-1'><HiMiniArrowPathRoundedSquare /> 33</button>
                    <button className='flex items-center gap-1'><IoShareSocialOutline /></button>
                </div>

            </div>
        </div>
    );
}
