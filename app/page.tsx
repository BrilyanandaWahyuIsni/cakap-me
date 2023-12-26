'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';
import instance from './api/axios';
import { ContextValue } from '@/components/hook/context';
import useSWR from 'swr';


export default function Home() {
  const router = useRouter();
  const { themeMode } = useContext(ContextValue)


  instance.get('/user/auth')
    .then((e) => router.replace('/home'))
    .catch(e => router.replace('/signin'))

  return (
    <body data-theme={themeMode} >
      <main className="flex h-screen w-full items-center justify-center">
        <span className="loading loading-bars loading-lg"></span>
      </main>
    </body>
  );
}
