import React, { useEffect, useState } from 'react';
import CakapStatus from '../cakapStatus';
import instance from '@/app/api/axios';
import { AxiosResponse } from 'axios';
import useSWR, { SWRResponse } from 'swr';
import InfiniteScroll from 'react-infinite-scroll-component';


type ArrayDataProps = {
    readonly id: string;
    readonly usersId: string;
    status_text: string,
    status_img: Array<string> | [];
    count_comment: number,
    count_like: number,
    readonly created_at: string,
    readonly updated_at: string,
    users: {
        username: string,
        alias: string
    },
    likeStatus?: [{
        id: string
    }] | []
}

interface CustomSwrResponseProps extends SWRResponse {
    data: Array<ArrayDataProps>
}

interface NewAxiosResponse extends AxiosResponse {
    data: Array<ArrayDataProps>
}


const fetcher = (url: string) => instance.get(url).then(r => r.data)

export function SearchingPostingPopuler({ urlLink }: { urlLink: string }) {
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [lastId, setLastId] = useState<string>("")
    const [firstTake, setFirstTake] = useState(true)

    const { data, isLoading, mutate } = useSWR<CustomSwrResponseProps>(urlLink, fetcher, { revalidateOnFocus: false })

    useEffect(() => {
        if (data && firstTake) {
            if (data.data.at(-1)) {
                setLastId(data.data.at(-1)?.id!)
            }
            setFirstTake(false)
        }
    }, [data, firstTake])

    function loadMore() {
        fetcher(`${urlLink}/${lastId}`)
            .then((v: NewAxiosResponse) => {
                const newData = v.data

                if (newData.at(-1)) {
                    setLastId(newData.at(-1)?.id!)
                } else {
                    setHasMore(false)
                }

                if (newData.length > 0) {
                    mutate((prev) => ({ ...prev, data: [...(prev?.data ?? []), ...newData], error: prev?.error, mutate: mutate, isValidating: prev?.isValidating ?? true, isLoading: prev?.isLoading ?? false }), false)
                }

            })
    }


    if (isLoading) {
        return (
            <div className='w-full p-5 flex justify-center items-center'>
                <span className="loading loading-spinner loading-xs"></span>
            </div>
        )
    } else if (data) {
        if (data.data.length <= 0) {
            return (
                <div className='w-full text-center p-5'>Postingan Tidak Ditemukan!</div>
            )
        }
        else {
            return (
                <InfiniteScroll
                    dataLength={data.data.length}
                    scrollThreshold={1}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={
                        <div className='w-full flex justify-center items-center'>
                            <span className="loading loading-spinner loading-xs"></span>
                        </div>
                    }
                    endMessage={
                        <div className='w-full text-center p-3 text-2xl text-black dark:text-white'>postingan berakhir</div>
                    }
                    scrollableTarget="ini_id_scroll"
                    className='flex flex-col gap-3 '
                >
                    {
                        data.data.map((e) => (
                            <CakapStatus
                                id={e.id}
                                usersId={e.usersId}
                                count_comment={e.count_comment}
                                count_like={e.count_like}
                                status_img={e.status_img}
                                created_at={e.created_at}
                                status_text={e.status_text}
                                updated_at={e.updated_at}
                                username={e.users.username}
                                alias={e.users.alias}
                                like_status={e.likeStatus?.length! > 0 ? true : false}
                                key={e.id}
                            />
                        ))
                    }
                </InfiniteScroll>
            )
        }
    }


}