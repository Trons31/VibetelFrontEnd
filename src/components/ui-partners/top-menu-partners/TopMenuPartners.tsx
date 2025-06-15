'use client';
import { usePathname } from "next/navigation";
import Image from 'next/image';
import Link from "next/link";
import clsx from "clsx";
import { MdOutlineMenu } from "react-icons/md";
import { useUIStore } from "@/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const TopMenuPartners = () => {
  const pathname = usePathname()
  const { data: session, status } = useSession();
  const isAuthenticated = !!session?.user;
  const [isLoading, setIsLoading] = useState(true);
  const { openSideMenuMotelPartners } = useUIStore();

  useEffect(() => {
    if (status === 'authenticated' || status === 'unauthenticated') {
      setIsLoading(false);
    }
  }, [status]);

  return (
    <nav className='fixed flex top-0 z-20 bg-white border-b border-gray-100 px-2 md:px-5 justify-between items-center w-full' >

      <div className="flex h-full items-end space-x-2" >
        <Link href="/" className="flex space-x-1 items-center" >
          <Image
            src="/app/LogoApp.png"
            width={35}
            height={35}
            alt="logoOficial.png"
          />
          <div>
            <span className="text-lg md:text-xl md:text-md antialiased">Motel</span>
            <span className="text-lg md:text-xl md:text-md antialiased"> Partners </span>
          </div>
        </Link>
      </div>

      <div className='hidden sm:block fade-in' >
        <Link href='/motel-partner'
          className={
            clsx(
              'm-2 px-2 py-1 rounded-md transition-all duration-150 hover:bg-black hover:text-white',
              {
                'bg-black text-white': pathname === '/motel-partner'
              }
            )
          }  >
          Inicio
        </Link>
        <Link href='/motel-partner/pricing'
          className={
            clsx(
              'm-2 px-2 py-1 rounded-md transition-all duration-150 hover:bg-black hover:text-white',
              {
                'bg-black text-white': pathname === '/motel-partner/pricing'
              }
            )
          }
        >
          Precios
        </Link>
        <Link href='/motel-partner/contact-us' className={
          clsx(
            'm-2 px-2 py-1 rounded-md transition-all duration-150 hover:bg-black hover:text-white',
            {
              'bg-black text-white': pathname === '/motel-partner/contact-us'
            }
          )
        }
        >
          Contacto
        </Link>
      </div>

      <div className='flex items-center gap-1 md:gap-2' >
        {
          !isLoading && (
            isAuthenticated
              ? (
                <Link href="/admin/dashboard-partner-motel" >
                  <button
                    className='hidden  md:flex fade-in text-black px-2 md:px-4 py-1 text-xs md:text-sm rounded-md border-2 transition-all border-black hover:border-black'
                  >
                    Dashboard
                  </button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/partner" >
                    <button
                      className='hidden md:flex fade-in text-black px-2 md:px-4 py-1 text-xs md:text-sm rounded-md border-2 transition-all border-black hover:bg-black hover:text-white'
                    >
                      Ingresar
                    </button>
                  </Link>

                  <Link
                    href="/motel-partner"
                    className='hidden md:flex fade-in text-white px-2 md:px-4 py-1 text-xs md:text-sm border-2 border-black rounded-md transition-all bg-black hover:bg-white hover:text-black'
                  >
                    Registrar
                  </Link>
                </>

              )
          )
        }
        <button
          onClick={openSideMenuMotelPartners}
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-200'
        >
          <MdOutlineMenu className="h-5 w-5" />
        </button>

      </div>



    </nav >
  )
}
