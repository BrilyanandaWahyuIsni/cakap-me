'use client';
import React, { ChangeEvent } from 'react';
import Link from 'next/link';

export default function page() {
  function _checkEmail(e: ChangeEvent<HTMLInputElement>) {
    console.log(e);
  }

  return (
    <div className="bg-base-100 flex h-auto w-full flex-col items-center justify-center gap-6 rounded-2xl p-3 py-28 md:w-3/4 lg:w-1/2">
      <h1 className="text-center text-4xl">Masukan email</h1>
      <InputResetData btn_name="Check Email" isShow={false} _handleChangeInput={_checkEmail} />
      <InputResetData btn_name="Check Email" isShow={false} _handleChangeInput={_checkEmail} />
      <InputResetData btn_name="Check Email" isShow={true} _handleChangeInput={_checkEmail} />
      <div>
        Kembali kehalaman Login?{' '}
        <Link href={'/signin'} className="text-blue-500">
          Login
        </Link>
      </div>
    </div>
  );
}

interface PropsInputResetData {
  btn_name: string;
  isShow: boolean;
  _handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

function InputResetData({ btn_name, isShow, _handleChangeInput }: PropsInputResetData) {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-4">
        {/*  */}
        <label
          htmlFor="email"
          className="relative flex w-full flex-col justify-end rounded-xl border-2 border-slate-800 p-3 focus-within:border-2 md:w-3/5"
        >
          <input
            onChange={(e) => _handleChangeInput(e)}
            // value={valueForm.birthday}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="bg-base-100 focus:outline-none"
          />
        </label>
        {/*  */}

        {isShow && (
          <button
            type="submit"
            className="w-3/5 rounded-full border-2 border-gray-700 bg-black p-3 text-white dark:bg-slate-400 dark:text-black"
          >
            {btn_name}
          </button>
        )}
      </div>
    </>
  );
}
