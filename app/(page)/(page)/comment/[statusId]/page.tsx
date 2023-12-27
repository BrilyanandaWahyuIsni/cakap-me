import CommentCreate from '@/components/commentPage/comentCreate';
import GetStatusForComment from '@/components/commentPage/getStatusForComment';
import Link from 'next/link';
import React from 'react';
import { FaArrowLeft } from "react-icons/fa";

export default function CommentPage({ params }: { params: { statusId: string } }) {
    return (

        <div className='w-full min-h-screen'>
            <Link href="/home" className=' justify-start h-16 gap-3 items-center flex flex-row w-full sticky top-0 bg-base-300 px-5 z-10'>
                <FaArrowLeft size={20} />
                <span className='text-xl'>Postingan</span>
            </Link>
            {/* create new cakap */}
            <GetStatusForComment statusId={params.statusId} />
            <CommentCreate />

            <div>
                {/* <CakapStatus />
                <CakapStatus />
                <CakapStatus />
                <CakapStatus /> */}
            </div>

        </div>
    );
}
