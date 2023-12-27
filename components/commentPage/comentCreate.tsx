import instance from '@/app/api/axios'
import React from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => instance.get(url).then(r => r.data)

export default function CommentCreate() {

    const { } = useSWR(``, fetcher)

    return (
        <div className='w-full relative flex flex-col items-end gap-2 px-5 py-3 border-b-2 border-base-300' >
            <div className='w-full'>membalas: <span>@name_blc</span></div>

            <textarea
                name=""
                id=""
                className='w-full h-32 p-3 rounded-tl-2xl rounded-br-2xl rounded-bl-sm overflow-hidden rounded-tr-sm focus:outline-none bg-base-200'
                placeholder='Posting Balasan Anda'
            ></textarea>

            <button className='p-3 px-5 text-base bg-slate-600 rounded-full w-24 hover:bg-green-600'>Send</button>
        </div>
    )
}
