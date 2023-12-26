import { useRouter } from 'next/navigation'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { IoSearchSharp } from 'react-icons/io5'
import { RxDotsHorizontal } from 'react-icons/rx'

type SearchHeaderProps = {
  _handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  _handleChangeWords: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchHeader({ _handleKeyDown, _handleChangeWords }: SearchHeaderProps) {


  const router = useRouter()

  return (
    <div className='flex bg-base-300 md:p-3 gap-3 justify-between px-2 relative'>
      <button type='button' onClick={router.back}><FaArrowLeft /></button>
      {/* pencarian */}
      <label className='w-full flex gap-2 items-center focus:outline-2 relative p-1 h-16'>
        <IoSearchSharp size={20} className='absolute left-6 z-20' />
        <input
          onChange={(e) => _handleChangeWords(e)}
          onKeyDown={(e) => _handleKeyDown(e)}
          type="text"
          className='pl-12 w-full rounded-full p-2'
          placeholder='Cari'
        />
      </label>
      <button type='button'><RxDotsHorizontal /></button>
    </div>
  )
}