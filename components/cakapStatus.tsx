/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react';
import Link from 'next/link';

import { MdVerified } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { FiMessageCircle } from "react-icons/fi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";
import { IoShareSocialOutline } from "react-icons/io5";
import { changeTimeIDShort } from './script/timerCheck/timerCheck';
import instance from '@/app/api/axios';


type CakapStatusProps = {
    id: string;
    usersId: string;
    status_text: string,
    status_img: string[] | [];
    count_comment: number,
    badge: string;
    count_like: number,
    created_at: string,
    updated_at: string,
    username: string,
    alias: string,
    like_status: boolean
}

export default function CakapStatus(props: CakapStatusProps) {
    // use state for liked button
    const [isLiked, setIsLiked] = useState<boolean>(props.like_status)
    const [isLoadingLike, setIsLoadingLiked] = useState<boolean>(false)
    const [countLike, setCountLike] = useState<number>(props.count_like)


    // function liked button
    function _handleLikedButton() {
        setIsLoadingLiked(true)
        if (!isLiked) {
            instance.post("/like_status/like", {
                statusId: props.id
            })
                .then((v) => {
                    setCountLike(prev => prev + 1)
                    setIsLiked(true)
                })
                .catch(r => console.log(r))
                .finally(() => { setIsLoadingLiked(false) })
        } else {
            instance.delete("/like_status/like", {
                data: {
                    statusId: props.id
                }
            })
                .then((v) => {
                    setCountLike(prev => prev - 1)
                    setIsLiked(false)
                })
                .catch(r => console.log(r))
                .finally(() => { setIsLoadingLiked(false) })
        }
    }


    return (
        <div key={props.id} set-nilai={props.id} className='w-full flex justify-between p-2 pb-1 border-b-2 border-base-200'>
            <div className='md:w-[15%] w-1/5'>

                <div className='w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center'>P</div>
            </div>
            <div className='md:w-[85%] w-4/5 flex flex-col gap-1 p-3 pl-0 pt-0'>

                {/* nickname */}
                <div className='flex items-center justify-between gap-1'>
                    <Link href={`/profile/${props.username}`} className='flex truncate gap-2'>
                        <span className='font-bold'>{props.alias}</span>
                        @{props.username}
                    </Link>
                    <div className='flex whitespace-nowrap items-center gap-1'>
                        {props.badge !== "none"
                            ? <MdVerified color='blue' className='text-blue-900' />
                            : null}
                        <div className='whitespace-nowrap'>{changeTimeIDShort(props.created_at)}</div>
                        <HiDotsVertical className='' />
                    </div>
                </div>

                {/* status */}
                <div className='w-full'>
                    {/* status text */}
                    <p className='text-justify'>{props.status_text}</p>
                    {/* status text image */}
                    {
                        props.status_img[0] &&
                        (
                            <div className='w-full rounded-lg overflow-hidden'>
                                <img src={props.status_img[0]} alt="" className='w-full' />
                            </div>
                        )
                    }
                </div>

                {/* balasan */}
                <div className='flex justify-between'>
                    <Link href={`/comment/${props.id}`} className='flex items-center gap-1'>
                        <FiMessageCircle /> {props.count_comment}
                    </Link>
                    <button onClick={_handleLikedButton} type='button' className='flex items-center gap-1'>
                        {
                            isLoadingLike
                                ? <span className="loading loading-spinner loading-xs"></span>
                                : isLiked ? <GoHeartFill className="text-info" /> : <GoHeart />
                        }
                        {countLike}
                    </button>
                    <button type='button' className='flex items-center gap-1'><HiMiniArrowPathRoundedSquare /> 33</button>
                    <button type='button' className='flex items-center gap-1'><IoShareSocialOutline /></button>
                </div>

            </div>
        </div>
    );
}
