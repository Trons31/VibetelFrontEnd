'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Lobster, fontPoppins } from '@/config/fonts';
import { logout } from '@/actions';
import { AdminImage } from './AdminImage';
import { MdContentPasteSearch, MdNotificationsActive, MdSupportAgent } from 'react-icons/md';
import { TiHomeOutline } from 'react-icons/ti';
import { useAdmintore, useUIStore } from '@/store';
import { IoBedOutline, IoLogIn } from 'react-icons/io5';
import { LuUserCog } from 'react-icons/lu';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BiLogOut, BiMoneyWithdraw } from 'react-icons/bi';
import { PiUserCircleGearFill } from 'react-icons/pi';
import { TbDeviceAnalytics, TbPresentationAnalytics, TbSettingsPlus } from 'react-icons/tb';
import { RiBankCardFill, RiCalendarCheckFill, RiCalendarCloseFill } from 'react-icons/ri'; // Asumo que esta es la ruta correcta
import { isApprovedStatus, Tier } from '@/interfaces';
import { motion } from 'framer-motion';

interface Props {
  motelStatus: isApprovedStatus;
  motelName: string;
  motelImage?: string;
  subscription: Tier;
}

export const SideBarAdminMotel = ({ motelStatus, motelImage, motelName, subscription }: Props) => {
  const pathname = usePathname();
  const { newReservation, updateNewReservation, cleanNewReservation } = useAdmintore();
  const [isLoading, setisLoading] = useState(true);
  const [showSubMenuAnalitycs, setShowSubMenuAnalitycsfirst] = useState(false);
  const isMenuOpenAdminMotel = useUIStore(state => state.isMenuOpenAdminMotel);

  const TIER_ORDER: Tier[] = ['FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE'];

  const getNextTier = (current: Tier): Tier | null => {
    const currentIndex = TIER_ORDER.indexOf(current);
    return currentIndex < TIER_ORDER.length - 1 ? TIER_ORDER[currentIndex + 1] : null;
  };

  const nextTier = getNextTier(subscription);

  useEffect(() => {
    if (pathname === "/admin/dashboard-partner-motel/booking") {
      cleanNewReservation();
    }
    setisLoading(false);
  }, [pathname, cleanNewReservation])


  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.aside
      className="hidden md:flex fixed z-10 top-0 pb-3 px-3 w-full flex-col justify-between h-screen border-r bg-white md:w-4/12 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]"
      initial={true}
      animate={isMenuOpenAdminMotel ? "open" : "closed"}
      variants={sidebarVariants}
    >
      <div className="flex flex-col h-full">
        <div className="flex px-2 justify-between items-center gap-3 py-4" >
          <Link href="/admin/dashboard-partner-motel">
            <span className={`${Lobster.className} text-xl md:text-xl antialiased font-bold`}>Motel</span>
            <span className={` ${Lobster.className} text-xl md:text-xl text-red-500 `}> Partner </span>
          </Link>
          <PiUserCircleGearFill className='h-6 w-6 text-gray-700' />
        </div>

        <div className="mt-2 -ml-4 flex gap-4 justify-center items-center">
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
        <div className="tracking-wide mt-4 custom-scrollbar-sidebar overflow-y-auto flex-grow mb-20">
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

                    <Link href="/admin/dashboard-partner-motel/reservation-requests" className={
                      clsx(
                        "flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 ",
                        {
                          "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/reservation-requests"
                        }
                      )
                    }>
                      <RiCalendarCheckFill className="mr-4 h-5 w-5 align-middle" />
                      Solicitud de reservas
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
                      )}

                    {
                      subscription !== "FREE" && (
                        <div className="relative transition">
                          <button
                            onClick={() => setShowSubMenuAnalitycsfirst(!showSubMenuAnalitycs)}
                            className={
                              clsx(
                                "flex peer relative w-full items-center  py-3 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600  hover:border-l-rose-600"

                              )
                            }
                          >

                            <TbDeviceAnalytics className="mr-4 h-5 w-5 align-middle" />
                            Analitica
                            <label className="absolute inset-0 h-full w-full cursor-pointer"></label>
                          </button>
                          {
                            showSubMenuAnalitycs
                              ? (
                                <IoIosArrowUp className={
                                  clsx(
                                    "absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600 transition peer-checked:rotate-180 peer-hover:text-rose-600", {
                                    "text-rose-600": showSubMenuAnalitycs
                                  }
                                  )
                                } />

                              ) : (
                                <IoIosArrowDown className={
                                  clsx(
                                    "absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600 transition peer-checked:rotate-180 peer-hover:text-rose-600"
                                  )
                                } />
                              )
                          }


                          {
                            showSubMenuAnalitycs && (
                              <ul className="duration-400 fade-in flex m-2  flex-col overflow-hidden rounded-xs bg-gray-100 font-medium transition-all duration-300 ">
                                <Link href="/admin/dashboard-partner-motel/analytics" >
                                  <li className={
                                    clsx(
                                      "flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 ",
                                      {
                                        "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/analytics"
                                      }
                                    )
                                  }>
                                    <BiMoneyWithdraw className="mr-4 h-5 w-5 align-middle" />
                                    Reservas
                                  </li>
                                </Link>

                              </ul>
                            )
                          }


                        </div>
                      )}

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
                    )}

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
                    )}



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
                  </nav>
                </div>
              </div>

            </>
          ) : (
            motelStatus === "PENDING" || motelStatus === "DATA_CORRECTION"
              ? (
                <div>
                  <div className='border border-gray-200 rounded-xl p-2 bg-white shadow-md'>
                    <div className='flex justify-center'>
                      <MdNotificationsActive size={20} />
                    </div>
                    <div className='mt-2 justify-center text-center'>
                      <h1 className='text-sm font-bold'>El motel no está activado</h1>
                      <p className='text-xs text-gray-700 font-normal'>No tiene permisos suficientes. Debe completar los últimos pasos para activar su motel.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className='border border-gray-200 rounded-xl px-2 py-4 bg-white shadow-md'>
                    <div className='flex justify-center'>
                      <MdNotificationsActive size={20} />
                    </div>
                    <div className='mt-2 justify-center text-center'>
                      <h1 className='text-sm font-bold'>El motel no está desactivado</h1>
                      <p className='text-xs text-gray-700 font-extralight'>No tiene permisos suficientes.</p>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {nextTier && (
        <div className="mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-100 px-4 py-5 text-center">
          <h3 className="mb-2 font-semibold text-gray-900">
            Pasa al plan {nextTier}
          </h3>
          <p className="mb-4 text-gray-500 text-xs">
            Mejora tu experiencia accediendo a más beneficios con el plan <strong>{nextTier}</strong>.
          </p>
          <Link
            href={`/admin/dashboard-partner-motel/upgrade?tier=${nextTier}`}
            className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-indigo-600 text-sm hover:bg-indigo-700"
          >
            Actualizar a {nextTier}
          </Link>
        </div>
      )}

    </motion.aside>
  );
};