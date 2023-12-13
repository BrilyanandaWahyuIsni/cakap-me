'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push('signin');
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [router]);

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <span className="loading loading-bars loading-lg"></span>
    </main>
  );
}
