import React from 'react'
import { IoIosImages } from 'react-icons/io'

export default function ReplyCard() {
    return (
        <div className="relative flex w-full flex-col items-end gap-2 border-b-2 border-base-200 md:px-5 px-2 py-3 " >
            <div className='w-full flex'>
                <div className='w-[10%]'>
                    <div className='md:w-12 w-10 md:h-12 h-10 bg-slate-500 rounded-full  flex items-center justify-center'></div>
                </div>
                <textarea name="comment_text" id="comment_text" className="h-32 md:mx-0 mx-2 w-full rounded-2xl rounded-tl-none p-3 bg-base-200 dark:border-gray-300 border-gray-500 border-2" placeholder="Posting Balasan Anda">
                </textarea>
            </div>
            <div className='w-[90%] flex justify-between items-center'>
                <div className='flex items-center  gap-2'>
                    <label htmlFor="comment_img" >
                        <IoIosImages className="w-7 h-auto text-green-900" />
                    </label>
                    <input type="file" name="comment_img" id="comment_img" className='hidden' />
                </div>
                <button type="button" className="w-24  rounded-full bg-slate-600 px-5 py-1 text-base hover:bg-green-600">
                    Send
                </button>

            </div>
        </div >
    )
}
