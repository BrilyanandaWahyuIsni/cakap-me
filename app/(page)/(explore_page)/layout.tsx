import AddFriends from '@/components/halamanSide/addFriends';
import SidePopuler from '@/components/halamanSide/sidePopuler';
import React, { ReactNode } from 'react';


export default function ExploreLayout({ children }: { children: ReactNode }) {

    return (
        <div className='w-full flex flex-row min-h-screen'>
            <div className='lg:w-3/5 w-full min-h-screen '>
                {children}

            </div>
            <div className='lg:w-2/5 lg:flex lg:flex-col hidden sticky top-0 border-l-2 border-base-200 px-4'>
                {/* pencarian */}
                <div className='px-2 py-2 w-full flex flex-col gap-5'>
                    <SidePopuler />
                    <AddFriends />
                </div>
            </div>

        </div>
    );
}
