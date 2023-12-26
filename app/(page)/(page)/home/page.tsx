'use client';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { MdPerson } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';
import ReplyCard from '@/components/sendCakap';
import { ContextValue, MAINMENU } from '@/components/hook/context';
import StatusRandom from '@/components/statusUpdate/getStatus';
import { useRouter } from 'next/navigation';


export default function HomePage() {

  const router = useRouter()

  enum enumAktiftMenu { GLOBAL, FRIEND }

  const [menuAktif, setMenuAktif] = useState<number>(enumAktiftMenu.GLOBAL);
  const { _handleMenuAktive } = useContext(ContextValue);
  const [urlStatusWithID, setUrlStatusWithID] = useState<string>("")


  useEffect(() => {
    _handleMenuAktive(MAINMENU.HOME);
  }, [_handleMenuAktive]);


  const styleSelectMenuActive: string = 'border-b-4 border-blue-600 font-bold';
  const menu_class = 'flex items-center gap-3 text-2xl';

  function _handleChangeAktifMenu(value: number) {
    setMenuAktif(value);
  }


  function _handleIDCakap(v: string) {
    setUrlStatusWithID(v)
  }



  return (
    <div className="relative max-h-screen w-full">
      <div className=" bg-base-300 sticky top-0 z-10 flex h-auto w-full flex-col items-center justify-between md:h-16">
        <ul className="flex h-10 w-full items-center justify-between px-3 md:hidden">
          <li className="grid">
            <Link href={''} className={menu_class}>
              <MdPerson className="w-8 text-red-500" />
            </Link>
          </li>
          <li>logo cakap</li>
          <li>
            <Link href={''} className={menu_class}>
              <IoMdSettings className="w-8 text-red-500" />
            </Link>
          </li>
        </ul>
        <div className="flex h-auto w-full justify-around p-3 md:h-full">
          <button
            onClick={() => _handleChangeAktifMenu(enumAktiftMenu.GLOBAL)}
            className={menuAktif === enumAktiftMenu.GLOBAL ? styleSelectMenuActive : ''}
          >
            Untuk Anda
          </button>
          <button
            onClick={() => _handleChangeAktifMenu(enumAktiftMenu.FRIEND)}
            className={menuAktif === enumAktiftMenu.FRIEND ? styleSelectMenuActive : ''}
          >
            Mengikuti
          </button>
        </div>
      </div>
      <ReplyCard getNewIDCakap={_handleIDCakap} />
      {/* create new cakap */}
      <StatusRandom urlLink={`/status`} idCakap={urlStatusWithID} />
    </div>
  );
}
