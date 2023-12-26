/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { FaArrowLeft } from "react-icons/fa6";
import { BsCake2Fill, BsCalendarDate } from "react-icons/bs";
import { TbLink } from "react-icons/tb";
import { MdLocationPin } from "react-icons/md";
import CakapStatus from "../../../../../components/cakapStatus";
import instance from "@/app/api/axios";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { ContextValue, MAINMENU } from "@/components/hook/context";
import StatusSelfRandom from "@/components/statusUpdate/getStatusSelf";
import { changeTimeID } from "@/components/script/timerCheck/timerCheck";

const fetch = async (url: string) => await instance.get(url).then((r) => r.data);

export default function ProfileAliasPage({
  params,
}: {
  params: { alias: string };
}) {

  const { isLoading, data } = useSWR(`/user/${params.alias}`, fetch);



  const { _handleMenuAktive } = useContext(ContextValue);


  enum enumAktiftMenu {
    POSTINGAN,
    BALASAN,
    MEDIA,
    SUKA,
  }




  const [aktifMenu, setAktifMenu] = useState<number>(enumAktiftMenu.POSTINGAN);

  const styleSelectMenuActive: string = "border-b-4 border-blue-600 font-bold";

  function _handleChangeAktifMenu(value: number) {
    setAktifMenu(value);
  }

  function _handleScroll(v: boolean) {
    console.log(v)
  }

  useEffect(() => {
    _handleMenuAktive(MAINMENU.PROFILE);
  }, [_handleMenuAktive])

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="loading loading-bars loading-lg text-neutral"></span>
      </div>
    );
  } else if (data) {
    return (
      <div className="w-full">
        <Link
          href="/home"
          className=" bg-base-300 sticky top-0 z-10 flex h-16 w-full flex-row items-center justify-start gap-3 px-5"
        >
          <FaArrowLeft size={20} />
          <span className="text-xl">{data.data.username}</span>
        </Link>

        <div className="relative w-full">
          {/* bg-header */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={data.data.bg_profile}
              className="absolute top-0 w-full"
              alt=""
            />
          </div>
          {/* foto */}
          <div className="absolute bottom-0 left-1 h-40 w-40 overflow-hidden rounded-full bg-slate-600">
            <img
              src="https://pbs.twimg.com/profile_images/1562107750062051328/A5iP1ZEq_400x400.jpg"
              className="w-40"
              alt=""
            />
          </div>

          {/* tombol mengubah isi profil */}

          <div className="flex  h-20 items-center justify-end px-4">
            {data.message.message_add
              ? (
                <Link
                  href={`/profile/${params.alias}/edit`}
                  className="rounded-full border-2 border-black px-3 py-1"
                >
                  Edit Profile
                </Link>
              )
              : (
                <button className={`px-4 rounded-full border-2 py-0 h-9 hover:text-error hover:border-error hover:before:content-["Berhenti"] hover:before:mr-2 hover:after:content-["Mengikuti"] after:content-["Mengikuti"]`}></button>
              )
            }
          </div>

        </div>

        <div className="flex w-full flex-col gap-3 p-3">
          <div>
            {/* username */}
            <h1 className="text-lg font-bold">{data.data.alias}</h1>
            <p>{`@${params.alias}`}</p>
          </div>
          {/* isi bio */}
          <p className="text-justify">
            {data.data.bio === "" || null ? "" : data.data.bio}
          </p>

          {/* isi dari lokasi */}
          <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-1">
            {data.data.lokasi && (
              <div className="flex w-auto items-center">
                <MdLocationPin />
                {data.data.lokasi}
              </div>
            )}
            {/* isi dari situs website */}
            {data.data.situs && (
              <div className="flex items-center gap-1">
                <TbLink />{" "}
                <a className="max-w-[16rem] truncate text-blue-500">
                  {data.data.situs}
                </a>
              </div>
            )}
            {/* isi dari keterangan ulang tahun */}
            <div className="flex items-center gap-2">
              <BsCake2Fill />
              <p>{changeTimeID(data.data.birthday)}</p>
            </div>

            <div className="flex items-center gap-2">
              <BsCalendarDate />
              <p>{changeTimeID(data.data.created_at)}</p>
            </div>
          </div>

          {/* profile follow */}
          <div className="flex gap-4">
            <button>
              <span className="font-semibold">{data.data.mengikuti} </span>Mengikuti
            </button>
            <button>
              <span className="font-semibold">{data.data.pengikut} </span>Pengikut
            </button>
          </div>
        </div>

        {/* menu */}
        <div className="w-full">
          <div className="border-base-200 flex w-full justify-between border-b-2 p-2 px-6 text-lg">
            <button
              onClick={() => _handleChangeAktifMenu(enumAktiftMenu.POSTINGAN)}
              className={
                aktifMenu === enumAktiftMenu.POSTINGAN
                  ? styleSelectMenuActive
                  : ""
              }
            >
              Postingan
            </button>
            <button
              type="button"
              onClick={() => _handleChangeAktifMenu(enumAktiftMenu.BALASAN)}
              className={
                aktifMenu === enumAktiftMenu.BALASAN
                  ? styleSelectMenuActive
                  : ""
              }
            >
              Balasan
            </button>
            <button
              type="button"
              onClick={() => _handleChangeAktifMenu(enumAktiftMenu.MEDIA)}
              className={
                aktifMenu === enumAktiftMenu.MEDIA ? styleSelectMenuActive : ""
              }
            >
              Media
            </button>
            <button
              type="button"
              onClick={() => _handleChangeAktifMenu(enumAktiftMenu.SUKA)}
              className={
                aktifMenu === enumAktiftMenu.SUKA ? styleSelectMenuActive : ""
              }
            >
              Suka
            </button>
          </div>
          <div className="w-full">
            {
              aktifMenu === enumAktiftMenu.POSTINGAN &&
              <StatusSelfRandom usersId={data.data.id} url="/status/my" />
            }
            {
              aktifMenu === enumAktiftMenu.BALASAN &&
              <StatusSelfRandom usersId={data.data.id} url="/status/my" />
            }
            {
              aktifMenu === enumAktiftMenu.MEDIA &&
              <StatusSelfRandom usersId={data.data.id} url={`/status/my/media`} />
            }
            {
              aktifMenu === enumAktiftMenu.SUKA &&
              <StatusSelfRandom usersId={data.data.id} url="/status/my" />
            }
          </div>
        </div>
      </div>
    );
  } else {
    return
  }
}
