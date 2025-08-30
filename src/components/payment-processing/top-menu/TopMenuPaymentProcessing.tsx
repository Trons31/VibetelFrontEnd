'use client';
import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image';
import { Lobster } from "@/config/fonts";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";


export const TopMenuPaymentProcessing = () => {

  const pathName = usePathname();

  const router = useRouter();

  console.log(localStorage.getItem("redirectUrl"));
  const handleBack = () => {
    const redirectUrl = localStorage.getItem("redirectUrl") || "/home";
    localStorage.removeItem("redirectUrl");
    router.push(redirectUrl);
  };


  return (
    <nav className="flex fixed px-3 md:px-12 z-20 top-0 md:py-3 bg-white justify-start md:justify-between items-center w-full"
    >
      {
        pathName === "/payment-processing/user"
        && (
          <>
            <button
              onClick={handleBack}
              className="hidden md:flex items-center gap-2" >
              <IoArrowBackOutline className="h-5 w-5" />
              <p className="font-medium text-lg" >Confirmacion de la reserva</p>
            </button>

            <Link href="/" target="_blank" className="hidden md:flex space-x-1 items-center" rel="noopener noreferrer" >
              <Image
                src="/app/LogoApp.png"
                width={35}
                height={35}
                alt="logoOficial.png"
              />
              <div>
                <span className={`${Lobster.className} text-2xl antialiased font-bold`}>Vibe</span>
                <span className={` ${Lobster.className} text-2xl text-red-600 `}>Tel</span>
              </div>
            </Link>


            <button
              onClick={handleBack}
              className="flex md:hidden gap-3 py-3 items-center" >
              <IoArrowBackOutline className="h-5 w-5" />
              <p className="font-medium text-md" >Confirmacion de la reserva</p>
            </button>

          </>
        )
      }

      {
        pathName === "/payment-processing/guest"
        && (
          <>
            <button
              onClick={handleBack}
              className="hidden md:flex items-center gap-2" >
              <IoArrowBackOutline className="h-5 w-5" />
              <p className="font-medium text-lg" >Confirmacion de la reserva</p>
            </button>

            <Link href="/" target="_blank" className="hidden md:flex space-x-1 items-center" rel="noopener noreferrer" >
              <Image
                src="/app/LogoApp.png"
                width={35}
                height={35}
                alt="logoOficial.png"
              />
              <div>
                <span className={`${Lobster.className} text-2xl antialiased font-bold`}>Vibe</span>
                <span className={` ${Lobster.className} text-2xl text-red-600 `}>Tel</span>
              </div>
            </Link>


            <button
              onClick={handleBack}
              className="flex md:hidden gap-3 py-3 items-center" >
              <IoArrowBackOutline className="h-5 w-5" />
              <p className="font-medium text-md" >Confirmacion de la reserva</p>
            </button>

          </>
        )
      }

      {
        pathName === "/payment-processing/status" &&
        (
          <>
            <div
              className="hidden md:flex items-center gap-2" >
              <p className="font-medium text-lg" >Reserva finalizada correctamente</p>
            </div>

            <Link href="/" target="_blank" className="hidden md:flex space-x-1 items-center" rel="noopener noreferrer" >
              <Image
                src="/app/LogoApp.png"
                width={35}
                height={35}
                alt="logoOficial.png"
              />
              <div>
                <span className={`${Lobster.className} text-2xl antialiased font-bold`}>Vibe</span>
                <span className={` ${Lobster.className} text-2xl text-red-600 `}>Tel</span>
              </div>
            </Link>

            <div className="flex md:hidden gap-4 py-3 items-center" >
              <p className="font-medium text-md" >Reserva finalizada correctamente</p>
              <IoIosArrowForward className="w-5 h-5" />
            </div>

          </>
        )
      }

    </nav >
  )
}
