import React, { useEffect, useState } from 'react'
import CakapStatus from '../cakapStatus'
import instance from '@/app/api/axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWR, { SWRResponse } from 'swr';
import { AxiosResponse } from 'axios';

type CakapStatusProps = {
  id: string;
  usersId: string;
  status_text: string,
  status_img: string[] | [];
  count_comment: number,
  count_like: number,
  created_at: string,
  updated_at: string,
  users: {
    username: string,
    alias: string
  }
}

interface CustomSwrResponse extends SWRResponse {
  data: Array<CakapStatusProps>
}

interface CustomAxiosResponse extends AxiosResponse {
  data: Array<CakapStatusProps>
}

const fetcher = (url: string) => instance.get(url).then((r) => r.data)

export default function StatusSelfRandom({ usersId, url }: { usersId: string, url: string }) {
  const [firstTake, setFirstTake] = useState<boolean>(true)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [lastID, setLastID] = useState<string>('')

  const [laseData, setLaseData] = useState<Array<CakapStatusProps> | []>([])

  const { data, mutate } = useSWR<CustomSwrResponse>(`${url}/${usersId}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  useEffect(() => {
    if (data && firstTake) {

      setLaseData(prev => ([...prev, ...data?.data!]))
      if (data.data.at(-1)) {
        setLastID(data.data.at(-1)?.id!)
      }
      setFirstTake(false)
    }


  }, [data, firstTake, hasMore])

  function loadMore() {
    fetcher(`${url}/${usersId}/${lastID}`)
      .then((r: CustomAxiosResponse) => {
        const newData = r.data

        if (newData.at(-1)) {
          setLastID(newData.at(-1)?.id!)
        } else {
          setHasMore(false)
        }

        if (newData.length > 0) {
          setLaseData(prev => [...prev, ...newData])
          mutate((prev) => ({ ...prev, data: [...(prev?.data ?? []), ...newData], error: prev?.error, mutate: mutate, isValidating: prev?.isValidating ?? true, isLoading: prev?.isLoading ?? false }), false)

        }
      })
  }



  if (!data) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    )
  } else {
    if (laseData) {
      return (
        <InfiniteScroll
          dataLength={data.data.length + 1}
          next={loadMore}
          hasMore={hasMore}
          loader={<div>loading...</div>}
          endMessage={
            <div className='w-full text-center p-3 text-2xl text-black dark:text-white'>postingan berakhir</div>
          }
          scrollableTarget="ini_id_scroll"
          className='flex flex-col gap-3 '
        >
          {
            laseData.map((e: CakapStatusProps) => (
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
                key={e.id}
              />
            ))
          }
        </InfiniteScroll>
      )
    }
  }

}