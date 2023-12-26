'use client';
import Link from 'next/link';
import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import instance from '../api/axios';

import { ContextValue, MAINMENU } from '@/components/hook/context';
import { FaHouse } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { IoMdMail, IoMdSettings } from 'react-icons/io';
import { MdLogin, MdPerson } from 'react-icons/md';
import { AxiosResponse } from 'axios';
import SettingPanel from '@/components/settingPanel';

interface PageLayoutProps {
    children: ReactNode;
}

const fetch = (url: string) => instance.get(url).then(r => r.data)

export default function PageLayout({ children }: PageLayoutProps) {

    const { menuAktive } = useContext(ContextValue)
    const [data, setData] = useState<AxiosResponse>()
    const [showSetting, setShowSetting] = useState<boolean>(false)


    useEffect(() => {
        instance.get("user/auth")
            .then((r) => {
                setData(r)
            })
            .catch(e => {
                null
            })
    }, [])

    function _handleClick() {
        instance
            .get('/user/nanda7'
            )
            .then((r) => console.log(r))
            .catch((e) => console.error(e));
    }

    function _handleOpenSetting() {
        setShowSetting(prev => !prev)

    }

    const menu_class = 'w-12 h-12 lg:px-3 flex lg:w-full items-center justify-center gap-3 text-2xl ';
    const menu_aktive = 'bg-orange-400 lg:px-3 lg:w-full w-12 h-12 flex items-center justify-center gap-3 text-2xl lg:rounded-2xl rounded-full';


    const { themeMode } = useContext(ContextValue)

    return (
        <body className="flex h-screen w-full flex-col-reverse overflow-hidden" data-theme={themeMode} >
            <div className="flex h-screen w-full flex-col-reverse overflow-hidden p-0 md:flex-row">
                <div className="flex h-14 w-full flex-row p-0 md:h-auto md:w-[12%] md:flex-col md:border-r-2 md:border-base-200 md:p-3 md:pl-10 lg:w-1/4">
                    <div className="hidden h-16 md:block">logo</div>
                    <ul className="mb-16 flex h-full w-full flex-row items-center justify-around gap-6 md:h-auto md:w-auto md:flex-col md:items-start md:justify-start md:gap-5 ">
                        <li >
                            <Link href={'/home'} className={menuAktive === MAINMENU.HOME ? menu_aktive : menu_class}>
                                <FaHouse className="w-6 text-red-500" />
                                <span className="hidden lg:block">Beranda</span>
                            </Link>
                        </li>
                        <li >
                            <Link href={'/explore'} className={menuAktive === MAINMENU.JELAJAH ? menu_aktive : menu_class}>
                                <IoSearch className="w-6 text-red-500" />
                                <span className="hidden lg:block">Jelajah</span>
                            </Link>
                        </li>
                        <li  >
                            <Link href={''} className={menuAktive === MAINMENU.PESAN ? menu_aktive : menu_class}>
                                <IoMdMail className="w-6 text-red-500" />
                                <span className="hidden lg:block">Pesan</span>
                            </Link>
                        </li>
                    </ul>
                    <div className=" hidden flex-row gap-5 md:flex md:flex-col items-start">
                        {
                            data &&
                            (<div >
                                <Link href={`/profile/${data.data.data.username}`} type="button" className={menuAktive === MAINMENU.PROFILE ? menu_aktive : menu_class}>
                                    <MdPerson className="w-6 text-red-500" />
                                    <span className="hidden lg:block">Profile</span>
                                </Link>
                            </div>)
                        }
                        <div >
                            <button onClick={_handleOpenSetting} type='button' className={menuAktive === MAINMENU.SETTING ? menu_aktive : menu_class}>
                                <IoMdSettings className="w-6 text-red-500" />
                                <span className="hidden lg:block">Pengaturan</span>
                            </button>
                        </div>
                    </div>
                    {/* side login page */}
                    {!data &&
                        <Link href="/signin" className='flex lg:gap-2 items-center justify-center h-12 lg:w-auto w-12 p-3 md:absolute relative md:bottom-5 md:left-[2.5rem] bg-teal-900 rounded-full md:mr-0 mr-5'>
                            <MdLogin size={20} className="w-8 text-indigo-300" />
                            <span className='hidden lg:block'>Sign In</span>
                        </Link>
                    }
                </div>
                {/* page main */}

                <div id="ini_id_scroll" className="m-0 h-screen w-full p-0 md:w-[88%] lg:w-3/4  overflow-y-auto">
                    {children}
                </div>
            </div>
            {showSetting &&
                <SettingPanel setShowSetting={setShowSetting} />
            }

        </body>
    );
}
