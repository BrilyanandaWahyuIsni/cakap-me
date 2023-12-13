/* eslint-disable @next/next/no-img-element */
import React from 'react';

export function CardName() {
    return (
        <div className='flex w-full md:p-3 p-1 gap-3 bg-base-200 rounded-lg'>
            <div className='md:w-[10%] w-[15%]'>
                <img src="https://pbs.twimg.com/media/GA_aCILbkAA0g2F?format=jpg&name=large" className='md:w-14 md:h-14 h-12 w-12 rounded-full overflow-hidden' alt="image name" />
            </div>
            <div className='md:w-[90%] w-[85%] flex flex-col gap-2'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-extrabold'>Name Akun</h1>
                        <p className='text-sm'>@username</p>
                    </div>
                    <button className={`px-4 rounded-full border-2 py-0 h-9 hover:text-error hover:border-error hover:after:content-["Stop"] after:content-["Mengikuti"]`}></button>
                </div>
                <div className='w-full text-justify text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere odio quasi reprehenderit illum omnis dolor veniam architecto modi obcaecati iure! Expedita sint nulla quas facilis ullam minus illum quisquam repudiandae.</div>
            </div>
        </div>
    );
}


export function MiniCardName() {
    return (
        <div className='flex w-full md:p-3 p-1 gap-3 bg-base-200 rounded-lg'>
            <div className='w-[25%]'>
                <img src="https://pbs.twimg.com/media/GA_aCILbkAA0g2F?format=jpg&name=large" className='md:w-14 md:h-14 h-12 w-12 rounded-full overflow-hidden' alt="image name" />
            </div>
            <div className='md:w-[80%] w-[85%] flex flex-col gap-2'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-extrabold'>Name Akun</h1>
                        <p className='text-sm'>@username</p>
                    </div>
                    <button className={`px-6 rounded-full border-2 py-0 h-9 bg-gray-600 text-gray-100 hover:bg-gray-300 hover:text-gray-600`}>Ikuti</button>
                </div>
            </div>
        </div>
    );
}
