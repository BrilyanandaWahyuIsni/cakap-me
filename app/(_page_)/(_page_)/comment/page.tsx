import Link from 'next/link';
import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { FiMessageCircle } from 'react-icons/fi';
import { GoHeart } from 'react-icons/go';
import { HiDotsVertical } from 'react-icons/hi';
import { HiMiniArrowPathRoundedSquare } from 'react-icons/hi2';
import { IoShareSocialOutline } from 'react-icons/io5';
import CakapStatus from '../../../../components/cakapStatus';

export default function CommentPage() {
    return (
        <div className='w-full min-h-screen'>

            <Link href="/home" className=' justify-start h-16 gap-3 items-center flex flex-row w-full sticky top-0 bg-base-300 px-5 z-10'>
                <FaArrowLeft size={20} />
                <span className='text-xl'>Postingan</span>
            </Link>
            {/* create new cakap */}
            <div className=''>
                {/* status */}
                <div className='w-full'>
                    <div className='w-full p-4'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-2'>
                                <div className='w-16 h-16 rounded-full bg-slate-600 flex justify-center items-center'>Foto</div>
                                <div>
                                    <h1 className='font-bold'>Name Vestia Zeta</h1>
                                    <h2>@name_abc</h2>
                                </div>
                            </div>
                            <HiDotsVertical size={24} className='' />
                        </div>
                        <div className='flex flex-col mt-2'>
                            <p className='text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta mollitia nulla error quo, perspiciatis numquam magnam quisquam vel fugit voluptate sit deleniti eveniet et pariatur officiis maxime accusantium itaque quia.</p>
                            <div className='w-full rounded-lg overflow-hidden'>
                                <img src="https://pbs.twimg.com/media/GAe2nLDa4AAj8Bh?format=jpg&name=small" alt="" className='w-full' />
                            </div>
                        </div>
                        <div className='py-1'>
                            09:34 PM - 04 Desember 2023
                        </div>
                    </div>
                    {/* balasan */}
                    <div className='flex justify-between py-2 border-y-2 px-4'>
                        <button type='button' className='flex items-center gap-1'><FiMessageCircle /> 33</button>
                        <button type='button' className='flex items-center gap-1'><GoHeart /> 33</button>
                        <button type='button' className='flex items-center gap-1'><HiMiniArrowPathRoundedSquare /> 33</button>
                        <button type='button' className='flex items-center gap-1'><IoShareSocialOutline /></button>
                    </div>
                </div>

                {/* posting reply */}
                <div className='w-full relative flex flex-col items-end gap-2 px-5 py-3 border-b-2' >
                    <div className='w-full'>membalas: <span>@name_blc</span></div>
                    <textarea name="" id="" className='w-full h-32 p-3' placeholder='Posting Balasan Anda'></textarea>
                    <button className='p-3 px-5 text-base bg-slate-600 rounded-full w-24 hover:bg-green-600'>Send</button>
                </div>

            </div>
            <div>
                <CakapStatus />
                <CakapStatus />
                <CakapStatus />
                <CakapStatus />
            </div>

        </div>
    );
}
