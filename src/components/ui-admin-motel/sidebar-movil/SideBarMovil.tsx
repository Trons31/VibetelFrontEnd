'use client';

import Link from 'next/link';
import { clsx } from 'clsx';

import { useUIStore } from '@/store';
import { IoBedOutline, IoLogIn } from 'react-icons/io5';
import { fontPoppins, Lobster } from '@/config/fonts';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MdContentPasteSearch, MdNotificationsActive, MdSupportAgent } from 'react-icons/md';
import { isApprovedStatus, Tier } from '@/interfaces';
import { AdminImage } from '@/components';
import { IoMdCloseCircle } from 'react-icons/io';
import { TiHomeOutline } from 'react-icons/ti';
import { LuUserCog } from 'react-icons/lu';
import { RiCalendarCheckFill, RiCalendarCloseFill, RiBankCardFill } from 'react-icons/ri';
import { TbPresentationAnalytics, TbSettingsPlus } from 'react-icons/tb';
import { BiLogOut } from 'react-icons/bi';
import { logout } from '@/actions/auth/logout';

interface Props {
  motelStatus: isApprovedStatus;
  motelName: string;
  motelImage?: string;
  subscription: Tier;
}

export const SideBarMovil = ({ motelStatus, motelName, motelImage, subscription }: Props) => {
  const isSideMenuOpenAdminMotel = useUIStore(state => state.isSideMenuOpenAdminMotel);
  const closeSideMenuAdminMotel = useUIStore(state => state.closeSideMenuAdminMotel);

  const pathname = usePathname()

  useEffect(() => {
    if (isSideMenuOpenAdminMotel) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isSideMenuOpenAdminMotel]);

  return (
    <div>
      {isSideMenuOpenAdminMotel && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-30" onClick={closeSideMenuAdminMotel} />
      )}

      <nav className={clsx(
        "fixed inset-y-0 left-0 w-full md:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 overflow-y-auto",
        {
          "translate-x-0": isSideMenuOpenAdminMotel,  // visible state
          "-translate-x-full": !isSideMenuOpenAdminMotel  // hidden state
        }
      )}>
        <div className="flex items-center justify-between px-5 py-4">
          <Link href="/admin/dashboard-partner-motel">
            <span className={`${Lobster.className} text-xl md:text-xl antialiased font-bold`}>Motel</span>
            <span className={` ${Lobster.className} text-xl md:text-xl text-red-500 `}> Partner </span>
          </Link>

          <button
            className="hover:bg-gray-200 p-1 rounded-md"
            onClick={closeSideMenuAdminMotel}
          >
            <IoMdCloseCircle className=" h-6 w-6 text-gray-600 md:h-5 md:w-5  cursor-pointer" />
          </button>
        </div>

        <div className="mt-6 -ml-4 flex gap-4 justify-center items-center">
          <div className='flex justify-center'>
            <AdminImage
              src={motelImage}
              width={300}
              height={100}
              alt='administrador'
              className="rounded-full shadow-lg justify-center  text-center h-16 w-16 object-cover"
            />
          </div>
          <div className='text-center' >
            <h5 className={`${fontPoppins.className} text-xl font-bold mt-2`}>{motelName}</h5>
            {
              motelImage
                ? (
                  <Link className='underline text-center text-xs' href="/admin/dashboard-partner-motel/config-motel/motel-cover">
                    Editar portada
                  </Link>
                )
                : (
                  <Link className='underline text-xs' href="/admin/dashboard-partner-motel/config-motel/motel-cover">
                    Agregar portada
                  </Link>
                )
            }

          </div>
        </div>

        <div className="tracking-wide mt-4 custom-scrollbar-sidebar overflow-y-auto flex-grow mb-20 px-4 py-6">
          {motelStatus === "APPROVED" ? (
            <>
              <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">Inicio</span>

              <div className="flex mt-3 flex-1 flex-col">
                <div className="">
                  <nav className="flex-1">
                    <Link href="/admin/dashboard-partner-motel" title="" className={
                      clsx(
                        "flex cursor-pointer items-center  py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600",
                        {
                          "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel"
                        }
                      )
                    }>
                      <TiHomeOutline className="mr-4 h-5 w-5 align-middle" />
                      Dashboard
                    </Link>

                    <Link href="/admin/dashboard-partner-motel/room" className={
                      clsx(
                        "flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 ",
                        {
                          "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/room"
                        }
                      )
                    }>
                      <IoBedOutline className="mr-4 h-5 w-5 align-middle" />
                      Habitaciones
                    </Link>

                    {
                      subscription !== "FREE" && (
                        <Link href="/admin/dashboard-partner-motel/reports" className={
                          clsx(
                            "flex cursor-pointer items-center  py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600",
                            {
                              "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/reports"
                            }
                          )
                        }>
                          <TbPresentationAnalytics className="mr-4 h-5 w-5 align-middle" />
                          Reportes
                          <span className="ml-auto rounded-full bg-rose-600 px-2 text-xs text-white">6</span>
                        </Link>
                      )
                    }
                  </nav>


                  {
                    subscription !== "FREE" && (
                      <>
                        <span className="ml-3 mt-7 mb-2 block text-xs font-semibold text-gray-500">Gestion de acceso</span>

                        <nav className="flex-1">
                          <Link href="/admin/dashboard-partner-motel/check-in" className={
                            clsx(
                              "flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 ",
                              {
                                "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/check-in"
                              }
                            )
                          }>
                            <MdContentPasteSearch className="mr-4 h-5 w-5 align-middle" />
                            Acceso con reserva
                          </Link>

                          <Link href="/admin/dashboard-partner-motel/walk-in" className={
                            clsx(
                              "flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 ",
                              {
                                "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/walk-in"
                              }
                            )
                          }>
                            <IoLogIn className="mr-4 h-5 w-5 align-middle" />
                            Acceso sin reserva
                          </Link>

                        </nav>
                      </>
                    )
                  }


                  {
                    subscription !== "FREE" && (
                      <>
                        <span className="ml-3 mt-7 mb-2 block text-xs font-semibold text-gray-500">Gestion de servicios</span>

                        <nav className="flex-1">
                          <Link href="/admin/dashboard-partner-motel/booking" className={
                            clsx(
                              "flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 ",
                              {
                                "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/booking"
                              }
                            )
                          }>
                            <RiCalendarCheckFill className="mr-4 h-5 w-5 align-middle" />
                            Servicio con reserva
                            {/* {
                              !isLoading && newReservation > 0 && (
                                <div
                                  className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none"
                                >
                                  {
                                    newReservation > 9
                                      ? "+9"
                                      : newReservation
                                  }
                                </div>
                              )
                            } */}
                          </Link>

                          <Link href="/admin/dashboard-partner-motel/walk-in-services" className={
                            clsx(
                              "flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 ",
                              {
                                "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/walk-in-services"
                              }
                            )
                          }>
                            <RiCalendarCloseFill className="mr-4 h-5 w-5 align-middle" />
                            Servicio sin reserva
                          </Link>

                        </nav>
                      </>
                    )
                  }


                  <span className="ml-3 mt-7 mb-2 block text-xs font-semibold text-gray-500">Soporte</span>

                  <nav className="flex-1">
                    <Link href="/admin/dashboard-partner-motel/support" className={
                      clsx(
                        "flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 ",
                        {
                          "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/support"
                        }
                      )
                    }>
                      <MdSupportAgent className="mr-4 h-5 w-5 align-middle" />
                      Acceder al soporte
                    </Link>

                  </nav>

                  <span className="ml-3 mt-7 mb-2 block text-xs font-semibold text-gray-500">Configuracion</span>

                  <nav className="flex-1">
                    <Link href="/admin/dashboard-partner-motel/profile" className={
                      clsx(
                        "flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 ",
                        {
                          "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/profile"
                        }
                      )
                    }  >
                      <LuUserCog className="mr-4 h-5 w-5 align-middle" />
                      Perfil
                    </Link>

                    <Link href="/admin/dashboard-partner-motel/config-motel/bank-account" className={
                      clsx(
                        "flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 ",
                        {
                          "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/config-motel/bank-account"
                        }
                      )
                    }  >
                      <RiBankCardFill className="mr-4 h-5 w-5 align-middle" />
                      Cuenta bancaria
                    </Link>

                    {
                      subscription !== "FREE" && (
                        <Link href="/admin/dashboard-partner-motel/additional-settings" className={
                          clsx(
                            "flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 ",
                            {
                              "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/additional-settings"
                            }
                          )
                        }  >
                          <TbSettingsPlus className="mr-4 h-5 w-5 align-middle" />
                          Ajustes adicionales
                        </Link>
                      )
                    }
                  </nav>
                </div>
              </div>

            </>
          ) : (
            motelStatus === "PENDING" || motelStatus === "DATA_CORRECTION"
              ? (
                <div className='border border-gray-200 rounded-xl p-2 bg-white shadow-lg'>
                  <div className='flex justify-center'>
                    <MdNotificationsActive size={20} />
                  </div>
                  <div className='mt-2 justify-center text-center'>
                    <h1 className='text-sm font-bold'>El motel no está activado</h1>
                    <p className='text-xs text-gray-700 font-extralight'>No tiene permisos suficientes. Debe completar los últimos pasos para activar su motel.</p>
                  </div>
                </div>
              ) : (
                <div className='border border-gray-200 rounded-xl px-2 py-4 bg-white shadow-md'>
                  <div className='flex justify-center'>
                    <MdNotificationsActive size={20} />
                  </div>
                  <div className='mt-2 justify-center text-center'>
                    <h1 className='text-sm font-bold'>El motel no está desactivado</h1>
                    <p className='text-xs text-gray-700 font-extralight'>No tiene permisos suficientes.</p>
                  </div>
                </div>
              )
          )}
        </div>
        <div className="px-6 w-full pt-4 flex justify-center items-center border-t absolute bottom-0 left-0">
          <button onClick={() => logout()} className="px-4 py-3 mb-5 flex items-center w-full hover:bg-gray-200 space-x-2 rounded-md text-gray-600 group">
            <BiLogOut className='text-gray-600 w-5 h-5' />
            <span className="group-hover:text-gray-700">Salir</span>
          </button>
        </div>
      </nav>
    </div>
  );
}