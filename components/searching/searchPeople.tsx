import React from 'react';
import { CardName } from '../cardName';
import instance from '@/app/api/axios';
import useSWR from 'swr';

type DataArrayProps = {
    id: string;
    alias: string;
    username: string;
    bio: string;
}

const fetch = (url: string) => instance.get(url).then(r => r.data)

export default function PeopleSearching({ urlLink }: { urlLink: string }) {

    const { data, isLoading } = useSWR(urlLink, fetch)


    if (isLoading) {
        return (
            <div className='w-full p-5 flex justify-center items-center'>
                <span className="loading loading-spinner loading-xs"></span>
            </div>
        )
    }
    else if (data.data.length === 0) {
        return (
            <div className='w-full text-center p-5'>Akun Tidak Ditemukan!</div>
        )
    }
    else if (data) {
        return (
            <div className='w-full p-2 grid gap-2'>
                {
                    data.data.map((e: DataArrayProps) => (
                        <CardName key={e.id} alias={e.alias} bio={e.bio} username={e.username} />
                    ))
                }
            </div>
        );
    }
}
