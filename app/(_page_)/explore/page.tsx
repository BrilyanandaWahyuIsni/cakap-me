"use client";
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


import { IoSearchSharp } from 'react-icons/io5';
import { FaArrowLeft } from "react-icons/fa";
import { RxDotsHorizontal } from "react-icons/rx";
import PeopleSearching from '../../../components/searching/people';
import PostingSeaching from '../../../components/searching/posting';
import { ContextValue, MainMenu } from '@/components/hook/context';


export default function ExplorePage() {
    const { _handleMenuAktive } = useContext(ContextValue);

    useEffect(() => {
        _handleMenuAktive(MainMenu.JELAJAH);
    }, [_handleMenuAktive]);

    enum enumSearchingType { POPULER, TERBARU, ORANG, MEDIA }

    const router = useRouter();

    const [searchingType, setSearchingType] = useState<number>(enumSearchingType.POPULER);

    const styleSelectSearchingActive: string = 'border-b-4 border-blue-600';

    function _handleChangeSearchingType(value: number) {
        setSearchingType(value);
    }

    return (
        <div className='w-full'>
            {/* header */}
            <div className='flex bg-base-300 md:p-3 gap-3 justify-between px-2 sticky top-0'>
                <button onClick={router.back}><FaArrowLeft /></button>
                {/* pencarian */}
                <label className='w-full flex gap-2 items-center focus:outline-2 p-1 sticky top-0 h-16'>
                    <IoSearchSharp size={20} className='absolute left-6' />
                    <input type="text" className='pl-12 w-full rounded-full p-2' placeholder='Cari' />
                </label>
                <button><RxDotsHorizontal /></button>
            </div>

            {/* result searching */}
            <div className='w-full'>
                <div className='w-full flex justify-between text-lg border-b-2 border-base-200 px-6 p-2'>
                    <button
                        onClick={() => _handleChangeSearchingType(enumSearchingType.POPULER)}
                        className={searchingType === enumSearchingType.POPULER ? styleSelectSearchingActive : ""}
                    >Populer</button>
                    <button
                        onClick={() => _handleChangeSearchingType(enumSearchingType.TERBARU)}
                        className={searchingType === enumSearchingType.TERBARU ? styleSelectSearchingActive : ""}
                    >Terbaru</button>
                    <button
                        onClick={() => _handleChangeSearchingType(enumSearchingType.ORANG)}
                        className={searchingType === enumSearchingType.ORANG ? styleSelectSearchingActive : ""}
                    >Orang</button>
                    <button onClick={() => _handleChangeSearchingType(enumSearchingType.MEDIA)}
                        className={searchingType === enumSearchingType.MEDIA ? styleSelectSearchingActive : ""}
                    >Media</button>
                </div>
                {
                    searchingType === enumSearchingType.ORANG ? <PeopleSearching /> : <PostingSeaching />
                }
            </div>
        </div >
    );
}
