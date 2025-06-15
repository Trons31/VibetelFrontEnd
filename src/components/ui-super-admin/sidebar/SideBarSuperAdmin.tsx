'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { CiLogout } from 'react-icons/ci'
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { Lobster, fontPoppins } from '@/config/fonts';
import { logout } from '@/actions';
import { TiHomeOutline } from 'react-icons/ti';
import { PiUserCircleGearFill } from 'react-icons/pi';
import { FaBuildingFlag } from 'react-icons/fa6';
import { LuUserCog } from 'react-icons/lu';

interface Props {

}

export const SideBarSuperAdmin = ({ }: Props) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated' || status === 'unauthenticated') {
      setIsLoading(false);
    }
  }, [status]);

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-3 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div className="flex flex-col h-full">
        <div className="flex px-2 justify-between items-center gap-3 py-4" >
          <Link href="/admin/dashboard-partner-motel">
            <span className={`${Lobster.className} text-xl md:text-xl antialiased font-bold`}>Motel</span>
            <span className={` ${Lobster.className} text-xl md:text-xl text-red-500 `}> Admin </span>
          </Link>
          <PiUserCircleGearFill className='h-6 w-6 text-gray-700' />
        </div>
        <div className="mt-2 -ml-4 flex gap-4 justify-center items-center">
          <div className='flex justify-center'>
            <div className='bg-gray-200 p-4 flex justify-center rounded-lg'>
              <LuUserCog className='h-8 w-8 text-gray-600' />
            </div>
          </div>
          <div className='text-center'>
            <h5 className="text-lg font-bold mt-2">Super admin</h5>
            <span className='underline text-center text-xs block max-w-[120px] truncate overflow-hidden'>
              {session?.user.email}
            </span>
          </div>
        </div>

        <div className="tracking-wide mt-4 custom-scrollbar-sidebar overflow-y-auto flex-grow mb-20">
          <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">Inicio</span>
          <div className="flex mt-3 flex-1 flex-col">
            <div className="">
              <nav className="flex-1">
                <Link href="/admin/dashboard-super-admin" title="" className={
                  clsx(
                    "flex cursor-pointer items-center  py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600",
                    {
                      "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-super-admin"
                    }
                  )
                }>
                  <TiHomeOutline className="mr-4 h-5 w-5 align-middle" />
                  Dashboard
                </Link>

                <Link href="/admin/dashboard-super-admin/motel" className={
                  clsx(
                    "flex cursor-pointer items-center  py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600",
                    {
                      "border-l-4 border-l-rose-600 text-rose-600": pathname === "/admin/dashboard-super-admin/motel"
                    }
                  )
                }>
                  <FaBuildingFlag className="mr-4 h-5 w-5 align-middle" />
                  Moteles
                </Link>
              </nav>
            </div>
          </div>

        </div>


      </div>

      <div className="px-6 w-full pt-4 flex justify-between items-center border-t absolute bottom-0 left-0">
        <button onClick={() => logout()} className="px-4 py-3 mb-5 flex items-center w-full hover:bg-gray-200 space-x-4 rounded-md text-gray-600 group">
          <CiLogout />
          <span className="group-hover:text-gray-700">Salir</span>
        </button>
      </div>
    </aside>
  );
};

