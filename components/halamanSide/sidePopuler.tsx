import React from 'react'

export default function SidePopuler() {
    return (
        <div className='w-full rounded-2xl bg-base-200 overflow-hidden text-left'>
            <div className='w-full text-left text-2xl mb-3 p-3 font-bold pb-2 border-b-2 border-b-base-100'>Yang sedang terjadi</div>
            <div className='w-full flex flex-col p-3 gap-4'>
                <TextSide />
                <TextSide />
                <TextSide />
                <TextSide />
                <TextSide />
                <TextSide />
                <TextSide />
            </div>
            <button className='w-full p-2 text-blue-500 hover:text-gray-700 hover:bg-cyan-200'>
                Tampilkan Lebih Banyak
            </button>
        </div>
    )
}


export function TextSide() {
    return (
        <button className='text-left'>
            <div>
                <p className='text-xs '>Trending</p>
                <h2 className='text-lg font-bold'>Name Tranding</h2>
                <p className='text-xs '>{1238} post</p>
            </div>
        </button>
    )
}