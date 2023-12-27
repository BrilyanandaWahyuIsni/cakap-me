"use client"
import instance from '@/app/api/axios';
import { useRouter } from 'next/navigation';
import React from 'react'

import { FiMessageCircle } from 'react-icons/fi';
import { GoHeart } from 'react-icons/go';
import { HiDotsVertical } from 'react-icons/hi';
import { HiMiniArrowPathRoundedSquare } from 'react-icons/hi2';
import { IoShareSocialOutline } from 'react-icons/io5';
import useSWR, { SWRResponse } from 'swr';
import { changeTimeIDShortWithClock } from '../script/timerCheck/timerCheck';

type GetStatusForCommentProps = {
    statusId: string
}

type ArrayDataProps = {
    readonly id: string;
    readonly usersId: string;
    status_text: string;
    status_img: Array<string> | [];
    count_comment: number;
    count_like: number;
    readonly created_at: string;
    readonly updated_at: string;
    users: {
        username: string;
        alias: string;
        readonly badge: string;
    };
    likeStatus?: [{
        id: string;
    }] | [];
}

interface CustomSwrResponseProps extends SWRResponse {
    data: ArrayDataProps
}

const fetcher = (url: string) => instance.get(url).then(r => r.data)

export default function GetStatusForComment({ statusId }: GetStatusForCommentProps) {
    const router = useRouter()
    const { data, isLoading, error } = useSWR<CustomSwrResponseProps>(`/status/${statusId}`, fetcher)

    if (isLoading) {
        return (
            <div className='w-full p-3'>
                <span className="loading loading-spinner loading-xs"></span>
            </div>
        )
    } else if (data) {
        return (
            <div className=''>
                {/* status */}
                <div className='w-full'>
                    <div className='w-full p-4'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-2'>
                                <div className='w-16 h-16 rounded-full bg-slate-600 flex justify-center items-center'>Foto</div>
                                <div>
                                    <h1 className='font-bold'>{data.data.users.alias}</h1>
                                    <h2>@{data.data.users.username}</h2>
                                </div>
                            </div>
                            <HiDotsVertical size={24} className='' />
                        </div>
                        <div className='flex flex-col mt-2'>
                            <p className='text-justify'>{data.data.status_text}</p>
                            {
                                data.data.status_img.length > 0
                                    ? (
                                        <div className='w-full rounded-lg overflow-hidden'>
                                            <img src={data.data.status_img[0]} alt="" className='w-full' />
                                        </div>
                                    )
                                    : null
                            }

                        </div>
                        <div className='py-1'>
                            {changeTimeIDShortWithClock(data.data.created_at)}
                        </div>
                    </div>
                    {/* balasan */}
                    <div className='flex justify-between py-2 border-y-2 border-base-300 px-4'>
                        <button type='button' className='flex items-center gap-1'><FiMessageCircle /> 33</button>
                        <button type='button' className='flex items-center gap-1'><GoHeart /> 33</button>
                        <button type='button' className='flex items-center gap-1'><HiMiniArrowPathRoundedSquare /> 33</button>
                        <button type='button' className='flex items-center gap-1'><IoShareSocialOutline /></button>
                    </div>
                </div>



            </div>
        )
    } else if (error) {
        router.push("/comment")
    }
}
