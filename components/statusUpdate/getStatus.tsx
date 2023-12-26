import React, { ReactNode, useEffect, useState } from 'react'
import CakapStatus from '../cakapStatus'
import instance from '@/app/api/axios'
import useSWR, { SWRResponse } from 'swr';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AxiosResponse } from 'axios';

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

interface CakapStatusProps extends SWRResponse {
  data: Array<ArrayDataProps>
}

interface NewAxiosResponse extends AxiosResponse {
  data: Array<ArrayDataProps>
}

const fetcher = (url: string) => instance.get(url).then(r => r.data)



// bagian utama
export default function StatusRandom({ urlLink, idCakap }: { urlLink: string, idCakap: string }) {
  const [hasMore, setHasMore] = useState(true)
  const [lastId, setLastId] = useState(idCakap)
  const [firstTake, setFirstTake] = useState(true)

  const [laseData, setLaseData] = useState<Array<ArrayDataProps> | []>([])



  const { isLoading, data, mutate } = useSWR<CakapStatusProps>(`${urlLink}${idCakap !== "" ? `/${idCakap}/0` : ""}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  function loadMore() {
    fetcher(`${urlLink}/${lastId}/1`)
      .then((r: NewAxiosResponse) => {
        const newData = r.data

        if (newData.at(-1)) {
          setLastId(newData.at(-1)?.id!)
        } else {
          setLastId("null")
          setHasMore(false)
        }

        if (newData.length > 0) {
          setLaseData(prev => [...prev, ...newData])
          // mutate([...oldData, newData], false)
          // mutate((prev) => ({ ...prev, data: [...prev.data, ...newData] }), false);
          mutate((prev) => ({ ...prev, data: [...(prev?.data ?? []), ...newData], error: prev?.error, mutate: mutate, isValidating: prev?.isValidating ?? true, isLoading: prev?.isLoading ?? false }), false)

        }
      })
  }


  useEffect(() => {

    if (data && firstTake) {
      setLaseData(prev => ([...prev, ...data?.data!]))
      if (data.data.at(-1)) {
        setLastId(data.data.at(-1)?.id!)
      }
      setFirstTake(false)
    }

  }, [data, firstTake])

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    )
  } else if (data) {
    // data.data.map(e => {
    //   console.log()
    // })
    return (
      <InfiniteScroll
        dataLength={laseData.length + 1}
        scrollThreshold={1}
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