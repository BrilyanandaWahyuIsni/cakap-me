import React, { ChangeEvent, useContext, useState } from 'react'
import { ContextValue, THEMEMODE } from './hook/context'
import { FaPowerOff } from "react-icons/fa";
import instance from '@/app/api/axios';
import { useRouter } from 'next/navigation';

export default function SettingPanel({ setShowSetting }: { setShowSetting: (v: boolean) => void }) {
    const { themeMode, _handleChangeTheme } = useContext(ContextValue)

    const router = useRouter()

    function _handleClickButton() {
        setShowSetting(false)
    }


    function _handleInputValue(e: ChangeEvent<HTMLInputElement>) {
        const valueTheme = themeMode === THEMEMODE.DARK ? THEMEMODE.RETRO : THEMEMODE.DARK
        _handleChangeTheme(valueTheme)
    }

    function _handleLogoutAkun() {
        instance.get("/user/logout")
            .then(r => {
                return router.replace("/signin")
            })
            .catch(e => console.error(e))
    }

    return (
        <div className='w-full h-screen absolute z-30'>
            <div className='w-full h-screen opacity-70 bg-base-200'></div>
            <div className='absolute w-1/2 h-[90vh] right-1/4 top-[5vh] bg-base-300  border-2 border-teal-700 shadow-2xl rounded-2xl'>
                {/* close modal */}
                <button onClick={_handleClickButton} type='button' className='flex items-center justify-center h-8 w-8 absolute -right-4 -top-4 bg-red-400 rounded-full font-bold text-xl border-2 border-teal-700 text-base-200'>X</button>

                {/* button change theme */}
                <div className='w-full p-3 text-right flex gap-2 justify-end items-center'>
                    <span className='text-xl font-bold'>Tampilan</span>
                    <label className="swap swap-rotate">

                        {/* this hidden checkbox controls the state */}
                        <input name='change-theme' onChange={_handleInputValue} checked={themeMode === THEMEMODE.RETRO ? true : false} type="checkbox" className="theme-controller" value={themeMode} />

                        {/* sun icon */}
                        <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                        {/* moon icon */}
                        <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                    </label>
                </div>

                {/* button login */}
                <div className='flex p-3 gap-2 items-center justify-end'>
                    <span className='text-xl font-bold'>Keluar dari Akun!</span>
                    <button type='button' onClick={_handleLogoutAkun}>
                        <FaPowerOff size={24} />
                    </button>

                </div>

            </div>
        </div>
    )
}
