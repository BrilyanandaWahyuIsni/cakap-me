'use client';
import Link from 'next/link';
import React, { ReactNode, useContext, useEffect } from 'react';
import { FaHouse } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { IoMdMail, IoMdSettings } from 'react-icons/io';
import { MdPerson } from 'react-icons/md';
import instance from '../api/axios';
import useSWR from 'swr';
import { ContextValue, MainMenu } from '@/components/hook/context';
// import axios from '../api/axios';

interface PageLayoutProps {
  children: ReactNode;
}

const fetch = (url: string) => instance.get(url).then(r => r.data)

export default function PageLayout({ children }: PageLayoutProps) {

  const { menuAktive } = useContext(ContextValue)

  useEffect(() => {
    console.log(menuAktive)

  }, [menuAktive])

  const { data } = useSWR('/user/auth', fetch)

  function _handleClick() {
    instance
      .get('/user/nanda7'
      )
      .then((r) => console.log(r))
      .catch((e) => console.error(e));
  }

  const menu_class = 'flex items-center gap-3 text-2xl';
  const menu_aktive = "bg-orange-700 lg:w-full  p-3 rounded-full"

  return (
    <div className="flex h-screen w-full flex-col-reverse overflow-hidden p-0 md:flex-row">
      <div className="flex h-14 w-full flex-row p-0 md:h-auto md:w-[12%] md:flex-col md:border-r-2 md:border-base-200 md:p-3 md:pl-10 lg:w-1/4">
        <div className="hidden h-16 md:block">logo</div>
        <ul className="mb-16 flex h-full w-full flex-row items-center justify-around gap-6 md:h-auto md:w-auto md:flex-col md:items-start md:justify-start md:gap-5 ">
          <li className={menuAktive === MainMenu.HOME ? menu_aktive : ''}>
            <Link href={'/home'} className={menu_class}>
              <FaHouse className="w-8 text-red-500" />
              <span className="hidden lg:block">Beranda</span>
            </Link>
          </li>
          <li className={menuAktive === MainMenu.JELAJAH ? menu_aktive : ''}>
            <Link href={'/explore'} className={menu_class}>
              <IoSearch className="w-8 text-red-500" />
              <span className="hidden lg:block">Jelajah</span>
            </Link>
          </li>
          <li className={menuAktive === MainMenu.HOME ? menu_aktive : ''} hidden>
            <Link href={''} className={menu_class}>
              <IoMdMail className="w-8 text-red-500" />
              <span className="hidden lg:block">Pesan</span>
            </Link>
          </li>
        </ul>
        <div className=" hidden flex-row gap-5 md:flex md:flex-col">
          {
            data &&
            (<div className={menuAktive === MainMenu.PROFILE ? menu_aktive : ''}>
              <Link href={`/profile/${data.data.username}`} type="button" className={menu_class}>
                <MdPerson className="w-8 text-red-500" />
                <span className="hidden lg:block">Profile</span>
              </Link>
            </div>)
          }
          <div className={menuAktive === MainMenu.SETTING ? menu_aktive : ''}>
            <button onClick={_handleClick} type='button' className={menu_class}>
              <IoMdSettings className="w-8 text-red-500" />
              <span className="hidden lg:block">Pengaturan</span>
            </button>
          </div>
        </div>
      </div>
      <div className="m-0 h-screen w-full overflow-y-scroll p-0 md:w-[88%] lg:w-3/4">{children}</div>
    </div>
  );
}
