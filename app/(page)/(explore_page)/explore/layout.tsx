"use client";
import React, { useContext, useEffect, useState, KeyboardEvent, ChangeEvent, ReactNode } from 'react';
import { ContextValue, MAINMENU } from '@/components/hook/context';
import SearchHeader from '@/components/searching/searchButton';
import { SearchingPostingPopuler } from '@/components/searching/searchPosting';
import PeopleSearching from '@/components/searching/searchPeople';
import { useRouter } from 'next/navigation';

enum enumSearchingType { POPULER, TERBARU, ORANG, MEDIA }

export default function ExplorePage({ children }: { children: ReactNode }) {
    const router = useRouter()

    const { _handleMenuAktive } = useContext(ContextValue);
    const [words, setWords] = useState<string>("")
    const [searchNow, setSearchNow] = useState<boolean>(false)
    const [searchingType, setSearchingType] = useState<number>(enumSearchingType.POPULER);
    const [urlSearch, setUrlSearch] = useState<string>(`/status/search`)

    useEffect(() => {
        _handleMenuAktive(MAINMENU.JELAJAH);
    }, [_handleMenuAktive, searchingType, urlSearch, words]);

    const styleSelectSearchingActive: string = 'border-b-4 border-blue-600';

    function _handleChangeSearchingType(value: number) {
        setSearchingType(value);
        if (value === enumSearchingType.POPULER) {
            router.replace(`/explore/${words}`)
        }
        if (value === enumSearchingType.TERBARU) {
            router.replace(`/explore/new/${words}`)
        }
        if (value === enumSearchingType.MEDIA) {
            router.replace(`/explore/media/${words}`)
        }
        if (value === enumSearchingType.ORANG) {
            router.replace(`/explore/people/${words}`)
        }
    }

    function _handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            if (searchingType === enumSearchingType.POPULER) {
                router.replace(`/explore/${words}`)
            }
            if (searchingType === enumSearchingType.TERBARU) {
                router.replace(`/explore/new/${words}`)
            }
            if (searchingType === enumSearchingType.MEDIA) {
                router.replace(`/explore/media/${words}`)
            }
            if (searchingType === enumSearchingType.POPULER) {
                router.replace(`/explore/${words}`)
            }
        }
    }

    function _handleChangeWords(e: ChangeEvent<HTMLInputElement>) {
        setWords(e.target.value)
        setSearchNow(false)
    }

    return (
        <div className='w-full'>
            {/* header */}
            <div className='sticky top-0'>
                <SearchHeader
                    _handleKeyDown={e => _handleKeyDown(e)}
                    _handleChangeWords={(v) => _handleChangeWords(v)}
                />

                <div className='w-full flex justify-between text-lg border-b-2 border-base-200 px-6 p-2 bg-base-200'>
                    <button type='button'
                        onClick={() => _handleChangeSearchingType(enumSearchingType.POPULER)}
                        className={searchingType === enumSearchingType.POPULER ? styleSelectSearchingActive : ""}
                    >Populer</button>
                    <button type='button'
                        onClick={() => _handleChangeSearchingType(enumSearchingType.TERBARU)}
                        className={searchingType === enumSearchingType.TERBARU ? styleSelectSearchingActive : ""}
                    >Terbaru</button>
                    <button type='button'
                        onClick={() => _handleChangeSearchingType(enumSearchingType.ORANG)}
                        className={searchingType === enumSearchingType.ORANG ? styleSelectSearchingActive : ""}
                    >Orang</button>
                    <button type='button'
                        onClick={() => _handleChangeSearchingType(enumSearchingType.MEDIA)}
                        className={searchingType === enumSearchingType.MEDIA ? styleSelectSearchingActive : ""}
                    >Media</button>
                </div>
            </div>

            {/* result searching */}
            <div className='w-full'>
                <div className='w-full'>
                    {children}
                </div>
            </div>
        </div >
    );
}
