import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { SetContextProvider } from '@/components/hook/context';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html data-theme="retro" lang="en">
      <SetContextProvider>
        <body data-theme="retro" className={inter.className}>
          {children}
        </body>
      </SetContextProvider>
    </html>
  );
}
