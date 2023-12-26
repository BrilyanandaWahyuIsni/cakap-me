'use client';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { ContextValue } from '@/components/hook/context';
import { useRouter } from 'next/navigation';
import instance from '../api/axios';
import { AxiosResponse } from 'axios';

const fetch = (url: string) => instance.get(url).then(r => r.data)

export default function SignLayout({ children }: { children: ReactNode }) {
  const { themeMode } = useContext(ContextValue)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    instance.get("/user/auth")
      .then(() => router.replace("/home"))
  }, [router])

  return (
    <body data-theme={themeMode} >
      <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-green-700 p-2 md:p-0 md:py-16">
        {children}
      </div>
    </body>
  );
  // }

}
