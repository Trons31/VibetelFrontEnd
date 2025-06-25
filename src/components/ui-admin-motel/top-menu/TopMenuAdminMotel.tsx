'use client';
import { useState } from 'react';
import { useUIStore } from '@/store'
import { CiBellOn, CiChat1 } from 'react-icons/ci'
import { TfiMenu } from 'react-icons/tfi';
import { ModalUpdateInServiceMotel } from '@/components';
import { isApprovedStatus, motelConfig } from '@/interfaces';
import clsx from 'clsx';
import { formatDate } from '@/utils';
import { IoIosArrowDown } from 'react-icons/io';
import { FaCircleArrowLeft } from 'react-icons/fa6';

interface Props {
  accessToken: string;
  motelConfig: motelConfig | null;
  motelStatus: isApprovedStatus;
}

export const TopMenuAdminMotel = ({ accessToken, motelConfig, motelStatus }: Props) => {

  const openSideMenuAdminMotel = useUIStore(state => state.openSideMenuAdminMotel);
  const openMenuAdminMotel = useUIStore(state => state.openMenuAdminMotel);
  const [service, setInService] = useState(motelConfig?.inService);
  const [modalUpdateInService, setModalUpdateInService] = useState(false);

  const isMenuOpenAdminMotel = useUIStore(state => state.isMenuOpenAdminMotel);
  const closeMenuAdminMotel = useUIStore(state => state.closeMenuAdminMotel);

  return (
    <>
      <ModalUpdateInServiceMotel
        accessToken={accessToken}
        motelConfig={motelConfig}
        isOpen={modalUpdateInService}
        onClose={() => setModalUpdateInService(false)}
      />

      <div className="sticky z-20 top-0 h-16 border-b bg-white py-2.5">

        <div className="px-1 md:px-2 flex items-center justify-between space-x-4">
          <div className='flex items-center gap-2' >
            <button
              onClick={openSideMenuAdminMotel}
              className="block md:hidden p-2 rounded-md hover:bg-gray-200">
              <TfiMenu className='h-5 w-5' />
            </button>

            {
              isMenuOpenAdminMotel
                ? (
                  <button
                    onClick={closeMenuAdminMotel}
                    className="hidden md:block p-2 rounded-md hover:bg-gray-200">
                    <FaCircleArrowLeft  className='h-5 w-5' />
                  </button>
                ) : (
                  <button
                    onClick={openMenuAdminMotel}
                    className="hidden md:block p-2 rounded-md hover:bg-gray-200">
                    <TfiMenu className='h-5 w-5' />
                  </button>
                )
            }

            {
              motelStatus === "APPROVED" && (
                <div className='flex justify-start items-center gap-3' >
                  {
                    service
                      ? (
                        <button
                          onClick={() => setModalUpdateInService(true)}
                          className="flex bg-blue-600 rounded-md px-2 py-1">
                          <p className="text-white text-xs" >En servicio</p>
                          <IoIosArrowDown className='text-white group-hover:text-black' />
                        </button>
                      )
                      : (
                        <button
                          onClick={() => setModalUpdateInService(true)}
                          className="group flex gap-2 items-center bg-black hover:bg-white border border-black rounded px-2 py-1">
                          <p className="text-white text-xs group-hover:text-black">
                            Fuera de servicio desde {motelConfig?.outOfServiceStart ? formatDate(motelConfig.outOfServiceStart) : "desconocido"} hasta {motelConfig?.outOfServiceEnd ? formatDate(motelConfig.outOfServiceEnd) : "desconocido"}
                          </p>
                          <IoIosArrowDown className='text-white group-hover:text-black' />
                        </button>
                      )
                  }
                </div>
              )
            }
          </div>

          <div className="flex space-x-2">
            {/* <div hidden className="md:block">
          <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
            <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
              <CiSearch />
            </span>
            <input type="search" name="leadingIcon" id="leadingIcon" placeholder="Search here" className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition" />
          </div>
        </div> */}

            {/* <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
              <CiSearch />
            </button> */}
            <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
              <CiChat1 size={25} />
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
              <CiBellOn size={25} />
            </button>
          </div>
        </div>
      </div >
    </>
  )
}
