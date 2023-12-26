import instance from '@/app/api/axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { IoIosImages } from 'react-icons/io'

type StatusSendProps = {
    status_text: string;
    status_img: string[];
}

export default function ReplyCard({ getNewIDCakap }: { getNewIDCakap: (v: string) => void }) {


    // use state btn
    const [isLoadingSendBtn, setIsLoadingSendBtn] = useState<boolean>(false)
    const [isSuccessSend, setIsSuccessSend] = useState<boolean>(false)

    // use state values cakap
    const [statusSend, setStatusSend] = useState<StatusSendProps>({
        status_text: '',
        status_img: []
    })

    // function handle send  new cakap
    async function _handleSendCakap(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoadingSendBtn(true)

        await instance.post('/status/new', {
            ...statusSend,
        })
            .then(v => {
                getNewIDCakap(v.data.data.id)
                setStatusSend({ status_img: [], status_text: '' })
            })
            .catch(e => console.error(e))
            .finally(() => setIsLoadingSendBtn(false))


    }

    function _handleChangeValues(e: ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target

        setStatusSend((prev) => ({
            ...prev, [name]: value
        }))
    }

    return (
        <form method='POST' onSubmit={_handleSendCakap} className="relative flex w-full flex-col items-end gap-2 border-b-2 border-base-200 md:px-5 px-2 py-3 " >
            <div className='w-full flex'>
                <div className='w-[10%]'>
                    <div className='md:w-12 w-10 md:h-12 h-10 bg-slate-500 rounded-full  flex items-center justify-center'></div>
                </div>
                <textarea name="status_text" id="status_text" className="h-32 md:mx-0 mx-2 w-full rounded-2xl rounded-tl-none p-3 bg-base-200 dark:border-gray-300 border-gray-500 border-2" placeholder="Posting Balasan Anda" value={statusSend.status_text} required onChange={(e) => _handleChangeValues(e)}>
                </textarea>
            </div>
            <div className='w-[90%] flex justify-between items-center'>
                <div className='flex items-center  gap-2'>
                    <label htmlFor="comment_img" >
                        <IoIosImages className="w-7 h-auto text-green-900" />
                    </label>
                    <input type="file" name="comment_img" id="comment_img" className='hidden' />
                </div>

                {/* send button  */}
                <button type="submit" className="w-auto rounded-full bg-slate-600 px-5 py-1 text-base hover:bg-green-600">
                    {
                        isLoadingSendBtn
                            ? <span className="loading loading-spinner loading-xs"></span>
                            : isSuccessSend ? "Succesed" : "kirim"
                    }
                </button>

            </div>
        </form >
    )
}
