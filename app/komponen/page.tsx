/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';
import instance from '../api/axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const fetcher = (url: string) => instance.get(url).then((res) => res.data);



export default function PagePage() {
    const [firstLoad, setFirstLoad] = useState(true)
    const [lastId, setLastId] = useState("")
    const [hasMore, setHasMore] = useState(true)

    const yesData: any[] = []

    const divRef = useRef(null)


    const { data, mutate, isLoading } = useSWR(`/status`, fetcher);


    function loadMore() {

        setTimeout(() => {
            fetcher(`/status/${lastId}`)
                .then((res) => {
                    const newData = res.data

                    if (newData.at(-1)) {
                        setLastId(newData.at(-1).id)
                    } else {
                        setHasMore(false)
                    }

                    if (newData.length > 0) {
                        mutate((prev: { data: any; }) => ({ ...prev, data: [...prev.data, ...newData] }), false);
                    }
                })
                .catch((e) => { console.log(e) })

        }, 3000)

    }

    useEffect(() => {
        if (data && firstLoad) {
            setLastId(data.data.at(-1).id);
            setFirstLoad(false)
        }

        if (data) {
            yesData.push(data.data)
        }

        console.log(yesData)

    }, [lastId, data]);

    if (isLoading) return (<body><div>Loading...</div></body>);
    else if (data) {
        return (
            <body >
                <div ref={divRef} className='flex p-10 flex-col gap-3 w-full h-screen overflow-y-scroll'>
                    <InfiniteScroll
                        dataLength={data.data.length + 1}
                        next={loadMore}
                        hasMore={hasMore}
                        // height={300}

                        loader={<div>loading...</div>}
                        endMessage={
                            <div className='w-full text-center p-5 text-2xl text-base-300'>postingan berakhir</div>
                        }
                        scrollableTarget={divRef.current}
                        className='flex flex-col gap-3'
                    >

                        {data.data.map((item) => (
                            <div className='w-auto p-10 py-56 text-xl bg-orange-600 rounded-2xl' key={item.id}>{item.status_text}</div>
                        ))}
                    </InfiniteScroll>
                </div>
            </body>
        );
    }
}
