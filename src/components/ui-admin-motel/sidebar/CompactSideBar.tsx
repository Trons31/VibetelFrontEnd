'use client';
import Link from 'next/link';
import { CiBookmarkCheck, CiLogout } from 'react-icons/ci';
import { IoBedOutline, IoMenu } from 'react-icons/io5';
import { AiOutlineSchedule } from 'react-icons/ai';
import { FaBuildingUser } from 'react-icons/fa6';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { Lobster, fontBe_Vietnam_Pro, fontPoppins } from '@/config/fonts';
import { MdContentPasteSearch, MdNotificationsActive, MdOutlineBedroomParent } from 'react-icons/md';
import { logout } from '@/actions';
import { AdminImage } from './AdminImage';
import { TiHomeOutline } from 'react-icons/ti';
import { TbDeviceAnalytics, TbPresentationAnalytics, TbReport } from 'react-icons/tb';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { LuUserCog } from 'react-icons/lu';

interface Props {
    motelActive: boolean;
}

export const CompactSideBar = ({ motelActive }: Props) => {
    const pathname = usePathname();
    const [showSubMenuAnalitycs, setShowSubMenuAnalitycsfirst] = useState(false);

    return (
        <aside className="fixed z-10 top-0 pb-3 px-3 w-16 flex flex-col justify-between h-screen border-r bg-white transition duration-300">
            <div className="flex flex-col h-full">
                <div className="flex px-2 justify-between py-4">
                    <button>
                        <IoMenu className='h-6 w-6 text-gray-700' />
                    </button>
                </div>
                <div className="tracking-wide mt-4 custom-scrollbar-sidebar overflow-y-auto flex-grow mb-20">
                    {motelActive ? (
                        <>
                            <div className="mt-4 mb-2 border border-gray-400 border-dashed" />
                            <div className="flex mt-3 flex-1 flex-col">
                                <div>
                                    <nav className="flex-1">
                                        <Link href="/admin/dashboard-partner-motel" title="" className={
                                            clsx(
                                                "flex cursor-pointer items-center justify-center py-2 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600",
                                                {
                                                    "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel"
                                                }
                                            )
                                        }>
                                            <TiHomeOutline className="h-5 w-5" />
                                        </Link>
                                        <Link href="/admin/dashboard-partner-motel/reports" className={
                                            clsx(
                                                "flex cursor-pointer items-center justify-center py-2 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600",
                                                {
                                                    "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/reports"
                                                }
                                            )
                                        }>
                                            <TbPresentationAnalytics className="h-5 w-5" />
                                        </Link>
                                        <div className="relative transition">
                                            <button
                                                onClick={() => setShowSubMenuAnalitycsfirst(!showSubMenuAnalitycs)}
                                                className={
                                                    clsx(
                                                        "flex peer relative w-full items-center justify-center py-3 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600  hover:border-l-rose-600"
                                                    )
                                                }
                                            >
                                                <TbDeviceAnalytics className="h-5 w-5" />
                                                <label className="absolute inset-0 h-full w-full cursor-pointer"></label>
                                            </button>
                                            {
                                                showSubMenuAnalitycs && (
                                                    <ul className="duration-400 fade-in flex m-2 flex-col overflow-hidden rounded-xs bg-gray-100 font-medium transition-all duration-300">
                                                        <Link href="/admin/dashboard-partner-motel/analytics">
                                                            <li className={
                                                                clsx(
                                                                    "flex cursor-pointer items-center justify-center py-2 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600",
                                                                    {
                                                                        "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/analytics"
                                                                    }
                                                                )
                                                            }>
                                                                <BiMoneyWithdraw className="h-5 w-5" />
                                                            </li>
                                                        </Link>
                                                    </ul>
                                                )
                                            }
                                        </div>
                                    </nav>
                                    <div className="mt-4 mb-2 border border-gray-400 border-dashed" />
                                    <nav className="flex-1">
                                        <Link href="/admin/dashboard-partner-motel/room" className={
                                            clsx(
                                                "flex cursor-pointer items-center justify-center py-2 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600",
                                                {
                                                    "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/room"
                                                }
                                            )
                                        }>
                                            <IoBedOutline className="h-5 w-5" />
                                        </Link>
                                        <Link href="/admin/dashboard-partner-motel/booking" className={
                                            clsx(
                                                "flex cursor-pointer items-center justify-center py-2 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600",
                                                {
                                                    "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/booking"
                                                }
                                            )
                                        }>
                                            <TbReport className="h-5 w-5" />
                                        </Link>
                                    </nav>
                                    <div className="mt-4 mb-2 border border-gray-400 border-dashed" />
                                    <nav className="flex-1">
                                        <Link href="/admin/dashboard-partner-motel/check-in" className={
                                            clsx(
                                                "flex cursor-pointer items-center justify-center py-2 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600",
                                                {
                                                    "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/check-in"
                                                }
                                            )
                                        }>
                                            <MdContentPasteSearch className="h-5 w-5" />
                                        </Link>
                                    </nav>
                                    <span className="ml-3 mt-7 mb-2 block text-xs font-semibold text-gray-500">Configuracion</span>
                                    <nav className="flex-1">
                                        <Link href="/admin/dashboard-partner-motel/profile" className={
                                            clsx(
                                                "flex cursor-pointer items-center justify-center py-2 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600",
                                                {
                                                    "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-partner-motel/profile"
                                                }
                                            )
                                        }>
                                            <LuUserCog className="h-5 w-5" />
                                        </Link>
                                    </nav>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='border border-gray-200 rounded-xl p-2 bg-white shadow-md'>
                            <div className='flex justify-center'>
                                <MdNotificationsActive size={20} />
                            </div>
                            <div className='mt-2 justify-center text-center'>
                                <h1 className='text-sm font-bold'>El motel no está activado</h1>
                                <p className='text-xs text-gray-700 font-extralight'>No tiene permisos suficientes. Debe completar los últimos pasos para activar su motel.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="px-6 w-full pt-4 flex justify-between items-center border-t absolute bottom-0 left-0">
                <button onClick={() => logout()} className="px-4 py-3 mb-5 flex items-center w-full hover:bg-gray-200 space-x-4 rounded-md text-gray-600 group">
                    <CiLogout />
                </button>
            </div>
        </aside>
    );
};
