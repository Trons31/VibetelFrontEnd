'use client';
import { UserInterface } from '@/interfaces/user.interface';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaRegCalendarCheck, FaRegUser } from 'react-icons/fa';
import { IoGiftOutline } from 'react-icons/io5';
import { LuHeart } from 'react-icons/lu';

interface Props {
  user: UserInterface
}

export const SideMenu = ({ user }: Props) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInterface>();
  const pathname = usePathname();

  useEffect(() => {
    setUserInfo(user);
    setLoading(false)
  }, [user]);

  return (
    <div className="col-span-2 hidden pt-24 sm:block border-r border-solid bg-white ">

      {
        loading
          ? (
            <>
              <div role="status" className="flex items-center justify-center h-24 max-w-sm bg-gray-300 rounded-lg animate-pulse mx-4">
                <div className="block items-center space-y-2 justify-center mt-2">
                  <svg className="w-8 h-8 mx-auto text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  <div className="w-24 h-2 bg-gray-200 rounded-full "></div>
                  <div className="w-24 h-2 bg-gray-200 rounded-full "></div>
                </div>
              </div>
            </>
          )
          : (
            <div className="py-3 mx-2 rounded-md bg-red-600 ">
              <div className="">
                <div>
                  <div className="flex justify-center">
                    <svg
                      className="w-8 h-8 text-gray-200 me-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </div>
                  <div className="px-5 mt-3">
                    <p className="text-center text-md font-bold text-white truncate w-full overflow-hidden whitespace-nowrap">
                      {user.email}
                    </p>
                    <p className="text-sm text-center text-white">{user.name} {user.lastname}</p>
                  </div>
                </div>
              </div>
            </div>

          )
      }
      <nav className="flex-1 mt-8 ml-4 space-y-3">
        <Link href="/profile" title="" className={
          clsx(
            "flex cursor-pointer items-center  py-2 px-4 text-lg  font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600",
            {
              "border-l-4 border-l-rose-600 text-rose-600": pathname === "/profile"
            }
          )
        }>
          <FaRegUser className="mr-4 h-5 w-5 align-middle" />
          Cuenta
        </Link>

        <Link href="/vibeCoins" title="" className={
          clsx(
            "flex cursor-pointer items-center  py-2 px-4 text-lg  font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600",
            {
              "border-l-4 border-l-rose-600 text-rose-600": pathname === "/vibeCoins"
            }
          )
        }>
          <IoGiftOutline className="mr-4 h-6 w-6 align-middle" />
          VibePuntos
        </Link>

        <Link href="/booking" title="" className={
          clsx(
            "flex cursor-pointer items-center  py-2 px-4 text-lg   font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600",
            {
              "border-l-4 border-l-rose-600 text-rose-600": pathname === "/booking"
            }
          )
        }>
          <FaRegCalendarCheck className="mr-4 h-5 w-5 align-middle" />
          Reservas
        </Link>

        <Link href="/favoriteRoom" title="" className={
          clsx(
            "flex cursor-pointer items-center  py-2 px-4 text-lg  font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600",
            {
              "border-l-4 border-l-rose-600 text-rose-600": pathname === "/favoriteRoom"
            }
          )
        }>
          <LuHeart className="mr-4 h-5 w-5 align-middle" />
          Favoritos
        </Link>

      </nav>
    </div>
  )
}
