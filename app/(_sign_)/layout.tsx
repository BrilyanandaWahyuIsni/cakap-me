'use client';
import React, { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-green-700 p-2 md:p-0 md:py-16">
      {children}
    </div>
  );
}
