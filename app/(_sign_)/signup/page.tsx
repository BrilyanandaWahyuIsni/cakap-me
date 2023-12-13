'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Link from 'next/link';
import instance from '@/app/api/axios';
import { useRouter } from 'next/navigation';

interface ValueForm {
  username: string;
  email: string;
  password: string;
  birthday: string;
}

//

export default function SignUpPage() {
  const router = useRouter()
  // use state loading, succes, error
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSucces] = useState<boolean>(false);
  const [isSuccess, setIsSucces] = useState<boolean>(false);

  // usestate for update form
  const [valueForm, setValueForm] = useState<ValueForm>({
    username: '',
    email: '',
    password: '',
    birthday: '',
  });

  // funtion for handle submit html
  function _handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    instance
      .post('/user/new', { ...valueForm })
      .then((v) => {
        setIsSucces(true);
        router.push("/signin")
      })
      .catch((e) => {
        setIsSucces(false);
        setIsLoading(false);
      })
      .finally(() => {
        setShowSucces(true);
      });
  }

  // function handle change input value
  function _handleChangeValueForm(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValueForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="bg-base-100 flex h-auto w-full flex-col items-center justify-center gap-6 rounded-2xl p-3 py-24 md:w-3/4 lg:w-1/2 ">
      <h1 className="text-center text-3xl md:text-4xl">Daftar Cakap Sekarang</h1>

      {showSuccess && (
        <div className={`rounded-3xl p-5 ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}>
          {isSuccess ? 'Account Success Create' : 'Username or Password Has Been Use!'}
        </div>
      )}

      <form onSubmit={_handleSubmitForm} method="post" className="flex w-full flex-col items-center gap-4">
        {/*  */}
        <label
          htmlFor="username"
          className="relative flex w-full flex-col justify-end rounded-xl border-2 border-slate-800 p-3 focus-within:border-2 md:w-3/5"
        >
          <input
            onChange={(e) => _handleChangeValueForm(e)}
            value={valueForm.username}
            type="username"
            name="username"
            id="username"
            placeholder="Username"
            className="bg-base-100 focus:outline-none"
            required
          />
        </label>
        {/*  */}
        <label
          htmlFor="email"
          className="relative flex w-full flex-col justify-end rounded-xl border-2 border-slate-800 p-3 focus-within:border-2 md:w-3/5"
        >
          <input
            onChange={(e) => _handleChangeValueForm(e)}
            value={valueForm.email}
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
            value={valueForm.password}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="bg-base-100 focus:outline-none"
            required
          />
        </label>
        {/*  */}
        <label
          htmlFor="birthday"
          className="relative flex w-full flex-col justify-end rounded-xl border-2 border-slate-800 p-3 focus-within:border-2 md:w-3/5"
        >
          <input
            onChange={(e) => _handleChangeValueForm(e)}
            value={valueForm.birthday}
            type="date"
            name="birthday"
            id="birthday"
            placeholder="Tanggal Lahir"
            className="bg-base-100 focus:outline-none"
            required
          />
        </label>
        <button
          // onClick={_handleSubmitForm}
          disabled={isLoading}
          type="submit"
          className="w-3/5 rounded-full border-2 border-gray-700 bg-black p-3 text-white dark:bg-slate-400 dark:text-black"
        >
          {isLoading ? <span className="loading loading-spinner loading-md"></span> : 'Daftar'}
        </button>{' '}
      </form>
      <div>
        Sudah punya akun?{' '}
        <Link href={'/signin'} className="text-blue-500">
          login
        </Link>
      </div>
    </div>
  );
}
