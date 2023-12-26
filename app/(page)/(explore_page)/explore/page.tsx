"use client";
import React, { useContext, useEffect, useState, KeyboardEvent, ChangeEvent } from 'react';
import { ContextValue, MAINMENU } from '@/components/hook/context';
import SearchHeader from '@/components/searching/searchButton';
import { SearchingPostingPopuler } from '@/components/searching/searchPosting';
import PeopleSearching from '@/components/searching/searchPeople';

enum enumSearchingType { POPULER, TERBARU, ORANG, MEDIA }

export default function ExplorePage() {


    const { _handleMenuAktive } = useContext(ContextValue);
    const [words, setWords] = useState<string>("")
    const [searchNow, setSearchNow] = useState<boolean>(false)
    const [searchingType, setSearchingType] = useState<number>(enumSearchingType.POPULER);
    const [urlSearch, setUrlSearch] = useState<string>(`/status/search`)





    useEffect(() => {
        _handleMenuAktive(MAINMENU.JELAJAH);



        console.log(`${urlSearch}/${words}`)
    }, [_handleMenuAktive, searchingType, urlSearch, words]);





    const styleSelectSearchingActive: string = 'border-b-4 border-blue-600';

    function _handleChangeSearchingType(value: number) {
        setSearchingType(value);
    }


    function _handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            setSearchNow(true)
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
                    {(searchNow && searchingType === enumSearchingType.ORANG
                        && <PeopleSearching urlLink={`/user/search/${words}`} />)}
                    {(searchNow && searchingType === enumSearchingType.POPULER
                        && <SearchingPostingPopuler urlLink={`/status/search/${words}`} />)}
                    {(searchNow && searchingType === enumSearchingType.TERBARU
                        && <SearchingPostingPopuler urlLink={`/status/search/new/${words}`} />)}
                    {(searchNow && searchingType === enumSearchingType.MEDIA
                        && <SearchingPostingPopuler urlLink={`/status/search/media/${words}`} />)}
                </div>
            </div>
        </div >
    );
}
