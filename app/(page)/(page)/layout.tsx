"use client"
import AddFriends from '@/components/halamanSide/addFriends';
import SidePopuler from '@/components/halamanSide/sidePopuler';
import React, { ReactNode, useEffect, useRef } from 'react';
import { IoSearchSharp } from "react-icons/io5";


export default function PageLayout({ children }: { children: ReactNode }) {

    const scrollDivRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        scrollDivRef.current?.addEventListener("scroll", () => {

            const scrollTop = scrollDivRef.current?.scrollTop
            const scrollHeight = scrollDivRef.current?.scrollHeight
            const clientHeight = scrollDivRef.current?.clientHeight

            if (scrollTop! + clientHeight! >= scrollHeight!) {
                console.log("ok")
            } else {
                console.log("not ok")
            }

        })
    }, [])

    return (
        <div className='w-full flex flex-row relative h-screen'>

            <div className='lg:w-3/5 w-full min-h-screen'>
                {children}
            </div>
            <div className='lg:w-2/5 lg:flex lg:flex-col hidden sticky top-0 border-l-2 border-base-200 min-h-screen'>
                {/* pencarian */}
                <label className='w-full flex gap-2 items-center focus:outline-2 p-1 sticky top-0 h-16 bg-base-100 px-4'>
                    <IoSearchSharp size={20} className='absolute left-6' />
                    <input type="text" className='pl-12 w-full rounded-full p-2' placeholder='Cari' />
                </label>
                <div className='px-2 py-2 w-full flex flex-col gap-5'>
                    <SidePopuler />
                    <AddFriends />
                </div>
            </div>

        </div>
    );
}
