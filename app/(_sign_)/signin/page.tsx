'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import instance from '@/app/api/axios';

interface ValueForm {
  email: string;
  password: string;
}

export default function SigninEditPage() {
  const router = useRouter();

  const [isNotLoading, setIsNotLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // usestate form input file
  const [valueForm, setValueForm] = useState<ValueForm>({
    email: '',
    password: '',
  });

  // fungsi handle submit
  async function _handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsNotLoading(true);

    e.preventDefault();
    await instance
      .post('/user/login', { ...valueForm })
      .then((v) => {
        // Cookies.set('adnanid', v.data.data.token);
        router.replace('/home');
      })
      .catch(() => {
        setIsNotLoading(false);
        setIsError(true);
      })
  }

  async function _handleCheck() {
    setIsNotLoading(true);
    await instance
      .get('/user/test')
      .then((v) => {
        console.log(v)
        // Cookies.set('adnanid', v.data.data.token);
        // router.replace('/home');
      })
      .catch(() => {
        setIsNotLoading(false);
        setIsError(true);
      })
      .finally(() => { setIsNotLoading(false) });
  }

  // function handle change value input file
  function _handleChangeValueForm(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValueForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="flex h-auto w-full flex-col items-center justify-center gap-6 rounded-2xl bg-base-100 p-3 py-28 md:w-3/4 lg:w-1/2">
      <h1 className="text-4xl">Masuk Ke Cakap</h1>
      {isError && <div className={`rounded-3xl bg-red-500 p-5`}>Email or Password Wrong!</div>}

      <form onSubmit={_handleSubmit} method="post" className="flex w-full flex-col items-center gap-4">
        {/*  */}
        <label
          htmlFor="email"
          className="relative flex w-full flex-col justify-end rounded-xl border-2 border-slate-800 p-3 focus-within:border-2 md:w-3/5"
        >
          <input
            onChange={(e) => _handleChangeValueForm(e)}
            // value={valueForm.birthday}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="bg-base-100 focus:outline-none"
            required
          />
        </label>
        {/*  */}
        <label
          htmlFor="password"
          className="relative flex w-full flex-col justify-end rounded-xl border-2 border-slate-800 p-3 focus-within:border-2 md:w-3/5"
        >
          <input
            onChange={(e) => _handleChangeValueForm(e)}
            // value={valueForm.birthday}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="bg-base-100 focus:outline-none"
            required
          />
        </label>

        <button
          type="submit"
          disabled={isNotLoading}
          className="disabled w-3/5 rounded-full border-2 border-gray-700 bg-black p-3 text-white dark:bg-slate-400 dark:text-black"
        >
          {isNotLoading ? <span className="loading loading-spinner loading-sm"></span> : 'Login'}
        </button>
      </form>
      <button
        onClick={_handleCheck}
        // href={'/signin/edit'}
        type="button"
        className="w-3/5 rounded-full border-2 border-gray-700 p-3 text-center"
      >
        Lupa Kata Sandi
      </button>
      <div>
        Belum Punya Akun?{' '}
        <Link href={'/signup'} className="text-blue-500">
          Daftar
        </Link>
      </div>
    </div>
  );
}
