/* eslint-disable @next/next/no-img-element */
"use client";
import instance from "@/app/api/axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { TbCameraPlus } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai"

interface FormEdit {
  bg_profile: string;
  foto_profile: string;
  alias: string;
  bio: string;
  lokasi: string;
  situs: string;
  birthday: string;
}

export default function ProfileEditPage({
  params,
}: {
  params: { alias: string };
}) {
  // use state for loading page
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // button data
  // use state button loading
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false)
  // use state is save data
  const [isSaveData, setIsSaveData] = useState<boolean>(false)
  // buton save data
  const [isStartBtn, setIsStartBtn] = useState<boolean>(true)

  // use state value form
  const [valueForm, setValueForm] = useState<FormEdit>({
    bg_profile: "",
    foto_profile: "",
    alias: "",
    bio: "",
    lokasi: "",
    situs: "",
    birthday: "",
  });

  const router = useRouter();

  useEffect(() => {
    instance
      .get(`/user/${params.alias}`)
      .then((r) => {
        if (!r.data.message.message_add) {
          return router.push(`/profile/${params.alias}`);
        }
        setValueForm({
          bg_profile: "",
          foto_profile: "",
          alias: r.data.data.alias,
          bio: r.data.data.bio,
          lokasi: r.data.data.lokasi,
          situs: r.data.data.situs,
          birthday: r.data.data.birthday,
        })
        setIsLoading(false)
      })
      .catch((e) => router.push(`/profile/${params.alias}`));
  }, []);

  // function change input
  function _handleChangeValueForm(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValueForm((prev) => ({ ...prev, [name]: value }));
  }

  // function for update profil user
  function _handleSubmitForm() {

    setIsStartBtn(false)
    setIsBtnLoading(true)
    instance.put(`/user/update/${params.alias}`, { ...valueForm })
      .then(r => {
        setIsSaveData(true)
        setIsBtnLoading(false)
      })
      .catch(e => {
        setIsSaveData(false)
        setIsBtnLoading(false)
      })
      .finally(() => {
        setTimeout(() => {
          setIsStartBtn(true)
        }, 1000)
      })
  }

  // function handle back page
  function _handleBackPage() {
    router.back()
  }

  function _handleScroll(v: boolean) {
    console.log(v)
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else {
    return (
      <div className="w-full">
        {/* edit profile */}
        {/*  */}
        <div className=" sticky top-0 z-10 flex h-16 w-full flex-row items-center justify-between gap-3 bg-base-300 px-5">
          <div className="flex items-center gap-1">
            <button onClick={_handleBackPage} type="button">
              <IoClose size={28} className="font-bold" />
            </button>
            <span className="text-xl">Edit Profile</span>
          </div>
          {/* button save data */}
          <button
            onClick={_handleSubmitForm}
            type="button"
            className={`rounded-full border-2  p-1 px-5 flex items-center gap-1 ${isStartBtn ? " dark:text-white text-black  dark:border-white border-black" : isSaveData ? "text-success border-success" : "text-error border-error"}`}
          >
            {isStartBtn
              ? "Simpan"
              : (<>
                {isBtnLoading
                  ? <span className="loading loading-spinner loading-xs"></span>
                  : isSaveData
                    ? <span className="flex items-center"><FaCheck size={20} /> Save</span>
                    : <span className="flex items-center"><AiOutlineCloseCircle size={20} /> Failed</span>
                }
              </>)
            }
          </button>
        </div>
        {/* edit */}
        <div className="relative w-full">
          {/* bg-header */}
          <div className="relative h-52 overflow-hidden">
            <img
              src="https://pbs.twimg.com/media/GALWqZRbUAA_OeP?format=jpg&name=medium"
              className="absolute top-0 w-full"
              alt=""
            />
            <label
              htmlFor="select-gambar-bg"
              className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 opacity-50 hover:opacity-80"
            >
              <div className="rounded-full bg-slate-400 p-3">
                <TbCameraPlus size={32} />
              </div>
              <input
                onChange={(e) => _handleChangeValueForm(e)}
                type="file"
                name="bg_profile"
                id="select-gambar-bg"
                className="hidden"
              />
            </label>
          </div>
          {/* foto */}
          <div className="absolute bottom-0 left-1 h-40 w-40 overflow-hidden rounded-full">
            <img
              src="https://pbs.twimg.com/profile_images/1562107750062051328/A5iP1ZEq_400x400.jpg"
              className="w-40"
              alt=""
            />
            <label
              htmlFor="select-gambar-bg"
              className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 opacity-50 hover:opacity-80"
            >
              <div className="rounded-full bg-slate-400 p-3">
                <TbCameraPlus size={32} />
              </div>
              <input
                onChange={(e) => _handleChangeValueForm(e)}
                type="file"
                name="foto_profile"
                id="select-gambar-bg"
                className="hidden"
              />
            </label>
          </div>
          <div className="flex  h-20 items-center justify-end px-4"></div>
        </div>

        <div className="flex w-full flex-col gap-2 p-3">
          {/* Name */}
          <label
            htmlFor="name"
            className="relative flex flex-col justify-end rounded-xl border-2 border-slate-800 p-3 focus-within:border-2 "
          >
            <span className="">name</span>
            <input
              onChange={(e) => _handleChangeValueForm(e)}
              value={valueForm.alias}
              type="text"
              name="alias"
              id="alias"
              placeholder="Nama"
              className="bg-base-100 focus:outline-none"
            />
          </label>

          {/* Bio */}
          <label
            htmlFor="bio"
            className="relative flex flex-col justify-end rounded-xl border-2 border-slate-800 p-3 focus-within:border-2 "
          >
            <span className="">bio</span>
            <input
              onChange={(e) => _handleChangeValueForm(e)}
              value={valueForm.bio}
              type="text"
              name="bio"
              id="bio"
              placeholder="Bio"
              className="bg-base-100 focus:outline-none"
            />
          </label>

          {/* Lokasi */}
          <label
            htmlFor="lokasi"
            className="relative flex flex-col justify-end rounded-xl border-2 border-slate-800 p-3 focus-within:border-2 "
          >
            <span className="">Lokasi</span>
            <input
              onChange={(e) => _handleChangeValueForm(e)}
              value={valueForm.lokasi}
              type="text"
              name="lokasi"
              id="lokasi"
              placeholder="Lokasi"
              className="bg-base-100 focus:outline-none"
            />
          </label>

          {/* Situs */}
          <label
            htmlFor="situs"
            className="relative flex flex-col justify-end rounded-xl border-2 border-slate-800 p-3 focus-within:border-2 "
          >
            <span className="">Situs</span>
            <input
              onChange={(e) => _handleChangeValueForm(e)}
              value={valueForm.situs}
              type="text"
              name="situs"
              id="situs"
              placeholder="Situs"
              className="bg-base-100 focus:outline-none"
            />
          </label>

          {/* date */}
          <label
            htmlFor="birthday"
            className="relative flex flex-col justify-end rounded-xl border-2 border-slate-800 p-3 focus-within:border-2 "
          >
            <span className="">Tanggal Lahir</span>
            <input
              onChange={(e) => _handleChangeValueForm(e)}
              value={valueForm.birthday}
              type="date"
              name="birthday"
              id="birthday"
              className="bg-base-100 focus:outline-none"
            />
          </label>
        </div>
      </div>
    );
  }

}
