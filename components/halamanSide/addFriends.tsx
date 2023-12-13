import React from 'react'
import { MiniCardName } from '../cardName'

export default function AddFriends() {
    return (
        <div className='w-full rounded-2xl bg-base-200 overflow-hidden text-left'>
            <div className='w-full text-left text-2xl mb-3 p-3 font-bold pb-2 border-b-2 border-b-base-100'>Untuk di Ikuti</div>
            <div className='w-full flex flex-col p-3 gap-4'>
                <MiniCardName />
                <MiniCardName />
                <MiniCardName />
            </div>
            <button className='w-full p-2 text-blue-500 hover:text-gray-700 hover:bg-cyan-200'>
                Tampilkan Lebih Banyak
            </button>
        </div>
    )
}

