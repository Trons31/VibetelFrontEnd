'use client';
import { useState } from 'react';
import { useUIStore } from '@/store'
import { CiBellOn, CiChat1, CiSearch } from 'react-icons/ci'
import { TfiMenu } from 'react-icons/tfi';
import { updateInServiceMotel } from '@/actions';
import { ModalUpdateInServiceMotel } from '@/components';
import { isApprovedStatus, motelConfig } from '@/interfaces';
import clsx from 'clsx';
import { formatDate } from '@/utils';
import { IoIosArrowDown } from 'react-icons/io';

interface Props {
  motelId: string;
  motelConfig?: motelConfig | undefined;
  motelStatus: isApprovedStatus;
}

export const TopMenuAdminMotel = ({ motelId, motelConfig, motelStatus }: Props) => {

  const openMenuAdminMotel = useUIStore(state => state.openSideMenuAdminMotel);
  const [isLoading, setIsLoading] = useState(false);
  const [service, setInService] = useState(motelConfig?.inService!);
  const [modalUpdateInService, setModalUpdateInService] = useState(false);

  const toogleIsInService = async () => {
    if (service) {
      setModalUpdateInService(true);
    } else {
      onUpdateInServiceMotel();
    }
  }

  const onUpdateInServiceMotel = async () => {
    setIsLoading(true);
    setInService((prev) => {
      updateInServiceMotel(motelId, !prev);
      return !prev;
    });
    setIsLoading(false);
  };


  return (
    <>
      {/* <ModalUpdateInServiceMotel
        motelId={motelId}
        motelConfig={motelConfig}
        isOpen={modalUpdateInService}
        onClose={() => setModalUpdateInService(false)}
      /> */}

      <div className="sticky z-20 top-0 h-16 border-b bg-white py-2.5">

        <div className="px-6 flex items-center justify-between space-x-4">
          {
            motelStatus === "APPROVED" && (
              <div className='flex justify-start items-center gap-3' >

                <h5 hidden className="text-lg text-black mt-3 font-medium lg:block">

                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={toogleIsInService}
                      checked={service}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </h5>

                {/* {
                  service
                    ? (
                      <div className={
                        clsx(
                          {
                            "block bg-blue-600 rounded-md px-2 py-1": !isLoading,
                            "block bg-blue-600 rounded-md px-10 py-1": isLoading
                          }
                        )
                      }>
                        {
                          isLoading
                            ? (
                              <svg className="h-4 w-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <p className="text-white text-xs" >En servicio</p>
                            )
                        }

                      </div>
                    )
                    : (
                      <button
                        onClick={() => setModalUpdateInService(true)}
                        className={
                          clsx(
                            {
                              "group flex gap-2 items-center bg-black hover:bg-white border border-black rounded px-2 py-2": !isLoading,
                              "block bg-black rounded px-10 py-2": isLoading,
                            }
                          )
                        }>
                        {
                          isLoading
                            ? (
                              <svg className="h-4 w-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <>
                                <p
                                  className="text-white text-xs group-hover:text-black" >Fuera de servicio desde {formatDate(motelConfig?.outOfServiceStart!)} hasta {formatDate(motelConfig?.outOfServiceEnd!)}</p>
                                <IoIosArrowDown className='text-white group-hover:text-black' />
                              </>
                            )
                        }
                      </button>
                    )
                } */}

              </div>
            )
          }
          <button
            onClick={openMenuAdminMotel}
            className="block w-6 h-6 md:w-12 md:h-16 lg:hidden">
            <TfiMenu size={20} />
          </button>
          <div className="flex space-x-2">

            {/* <div hidden className="md:block">
          <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
            <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
              <CiSearch />
            </span>
            <input type="search" name="leadingIcon" id="leadingIcon" placeholder="Search here" className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition" />
          </div>
        </div> */}

            <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
              <CiSearch />
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
              <CiChat1 size={25} />
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
              <CiBellOn size={25} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
