'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { Lobster } from "@/config/fonts";
import { IoSearchOutline } from "react-icons/io5";
import { useBookingStore, useLocationStore, useUIStore } from "@/store";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { MdEditLocationAlt, MdNotListedLocation, MdOutlineMenu } from "react-icons/md";
import { BsCalendarEvent } from "react-icons/bs";
import { InputSearch, InputSearchMovil, ModalLocationUser, ModalLocationUserMovil } from "@/components";
import { TiArrowSortedDown } from "react-icons/ti";
import { searchCity } from "@/interfaces";


export const TopMenu = () => {

  const pathname = usePathname()
  const { data: session, status } = useSession();

  const [showSearch, setShowSearch] = useState(false)
  const [modalLocationUser, setModalLocationUser] = useState(false);
  const [searchInputMovil, setSearchInputMovil] = useState(false);
  const [isLoadingLocationUser, setIsLoadingLocationUser] = useState(true);
  const [detectedLocation, setDetectedLocation] = useState<searchCity | undefined>(undefined);

  const isAuthenticated = !!session?.user;

  const { openSideMenu } = useUIStore();
  const { Booking } = useBookingStore();
  const { locationUser } = useLocationStore();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' || status === 'unauthenticated') {
      setLoaded(true);
    }
  }, [status]);

  useEffect(() => {
    if (locationUser) {
      setDetectedLocation(locationUser);
    }
    setIsLoadingLocationUser(false);
  }, [locationUser])


  return (
    <>
      <ModalLocationUser
        isOpen={modalLocationUser}
        onClose={() => setModalLocationUser(false)}
      />

      <InputSearchMovil
        location={detectedLocation?.city}
        isOpen={searchInputMovil}
        onClose={() => setSearchInputMovil(false)}
      />

      <ModalLocationUserMovil
        isOpen={modalLocationUser}
        onClose={() => setModalLocationUser(false)}
      />

      {showSearch && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 transition-opacity"></div>
      )}

      <nav className="flex fixed px-2 md:px-3 py-1 z-20 top-0 border-b border-gray-100 shadow-sm bg-white justify-between items-center w-full"
      >

        <div className="flex items-center gap-4  h-full" >
          <Link href="/" className="flex space-x-1 items-center" >
            <Image
              src="/app/LogoApp.png"
              width={35}
              height={35}
              alt="logoOficial.png"
            />
            <div>
              <span className={`${Lobster.className} text-xl antialiased font-bold`}>Vibe</span>
              <span className={` ${Lobster.className} text-xl text-red-600 `}>Tel</span>
            </div>
          </Link>

          <button
            onClick={() => setModalLocationUser(true)}
            className="hidden md:flex ml-3 gap-1 items-center py-1 px-3 hover:underline hover:decoration-red-600 border-r border-r-gray-200 border-l border-l-gray-200" >
            {
              !detectedLocation
                ? (
                  <MdNotListedLocation
                    className="w-4 h-4 text-red-600"
                  />
                ) : (
                  <MdEditLocationAlt
                    className="w-4 h-4 text-red-600"
                  />
                )
            }

            {
              isLoadingLocationUser
                ? (
                  <>
                    <div className="px-5" >
                      <div className='flex space-x-1 justify-center items-center bg-white '>
                        <span className='sr-only'>Loading...</span>
                        <div className='h-1 w-1 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-1 w-1 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div className='h-1 w-1 bg-red-500 rounded-full animate-bounce'></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-red-600 text-sm"  >
                      {
                        detectedLocation
                          ? (
                            <>
                              {detectedLocation.city}, {detectedLocation.department}, {detectedLocation.country}
                            </>
                          ) : (
                            <>
                              Mi ubicacion
                            </>
                          )

                      }
                    </span>
                  </>
                )

            }

            <TiArrowSortedDown
              className="w-3 h-3 ml-2 text-red-600"
            />
          </button>

        </div>

        {
          !showSearch &&
          (
            <div className='hidden sm:block fade-in' >
              <Link href='/home'
                className={
                  clsx(
                    'm-2 px-2 py-1 rounded-md transition-all duration-150 hover:bg-red-500 hover:text-white',
                    {
                      'bg-red-500 text-white': pathname === '/home'
                    }
                  )
                }  >
                Inicio
              </Link>
              <Link href='/rooms'
                className={
                  clsx(
                    'm-2 px-2 py-1 rounded-md transition-all duration-150 hover:bg-red-500 hover:text-white',
                    {
                      'bg-red-500 text-white': pathname === '/rooms'
                    }
                  )
                }
              >
                Habitaciones
              </Link>
              <Link href='/motels' className={
                clsx(
                  'm-2 px-2 py-1 rounded-md transition-all duration-150 hover:bg-red-500 hover:text-white',
                  {
                    'bg-red-500 text-white': pathname === '/motels'
                  }
                )
              }
              >
                Moteles
              </Link>
            </div>
          )
        }


        <div className='flex items-center' >

          <Link
            href="/motel-partner"
            className="hidden md:block text-sm py-2 px-3 hover:bg-gray-200 rounded-full"
          >
            Registra tu motel en VibeTel
          </Link>

          <InputSearch
            location={detectedLocation?.city}
            openSearch={() => setShowSearch(true)}
            closeSearch={() => setShowSearch(false)}
          />

          <button
            onClick={() => setSearchInputMovil(true)}
            className='mx-2 block md:hidden' >
            <IoSearchOutline className="w-5 h-5" />
          </button>


          <Link
            title="Reserva en proceso"
            href={
              (isAuthenticated)
                ? Booking
                  ? '/payment-processing/user'
                  : '/empty'
                : Booking
                  ? '/payment-processing/guest'
                  : '/empty'

            } className='mx-1 p-2 rounded-md transition-all hover:bg-gray-200' >
            <div className='relative' >
              {
                (loaded && Booking) &&
                (
                  <span className='fade-in absolute text-xs px-1 rounded-full -top-2.5 -right-1 bg-red-600 text-white' >
                    1
                  </span>
                )
              }
              <BsCalendarEvent className="h-5 w-5" />
            </div>
          </Link>

          <button
            title="Abrir menú"
            className='flex m-2 p-2 rounded-md transition-all hover:bg-gray-200'
            onClick={openSideMenu}
          >
            <MdOutlineMenu className="h-5 w-5" />
          </button>

        </div>

      </nav>

      <button
        onClick={() => setModalLocationUser(true)}
        className="md:hidden fixed border-b top-12 border-t border-t-gray-200 z-20 w-full bg-white border-gray-200 flex justify-center py-2 gap-3 items-center shadow-sm"
      >

        {
          !detectedLocation
            ? (
              <MdNotListedLocation
                className="w-5 h-5 text-red-600"
              />
            ) : (
              <MdEditLocationAlt
                className="w-5 h-5 text-red-600"
              />
            )
        }
        {
          isLoadingLocationUser
            ? (
              <>
                <div className="px-5" >
                  <div className='flex space-x-1 justify-center items-center bg-white '>
                    <span className='sr-only'>Loading...</span>
                    <div className='h-1 w-1 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div className='h-1 w-1 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div className='h-1 w-1 bg-red-500 rounded-full animate-bounce'></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className="text-red-600 text-sm"  >
                  {
                    detectedLocation
                      ? (
                        <>
                          {detectedLocation.city}, {detectedLocation.department}, {detectedLocation.country}
                        </>
                      ) : (
                        <>
                          Mi ubicacion
                        </>
                      )

                  }
                </span>
              </>
            )

        }

        <TiArrowSortedDown
          className="w-3 h-3 ml-2 text-red-600"
        />
      </button>

    </>
  )
}
