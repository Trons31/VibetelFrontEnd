'use client';

import React, { useState } from 'react'
import { ModalActivePromotion, ModalUpdatePriceRoom, ModalUpdateStateRoom } from '@/components';
import { RoomManagerProps } from '@/interfaces';
import { sleep } from '@/utils';
import toast, { Toaster } from 'react-hot-toast';
import { BiSolidDiscount } from 'react-icons/bi';
import { IoPricetagsSharp } from 'react-icons/io5';
import { LiaBroomSolid } from 'react-icons/lia';
import { TfiReload } from 'react-icons/tfi';
import clsx from 'clsx';

interface Props {
    selectedRooms: RoomManagerProps[];
    onRemoveRoom: (roomId: string) => void;
}

export const ActionsManager = ({ selectedRooms, onRemoveRoom }: Props) => {


    const [isLoadingCleaning, setIsLoadingCleaning] = useState(false);

    const [modalUpdatePrice, setModalUpdatePrice] = useState(false);
    const [modalActivePromotion, setModalActivePromotion] = useState(false);
    const [modalUpdateStateRoom, setModalUpdateStateRoom] = useState(false)

    const onRoomClean = async () => {
        setIsLoadingCleaning(true);
        // const resp = await roomCleaning(selectedRooms.map(room => room.id));
        // if (!resp.ok) {
        //     toast.error(resp.message);
        //     return;
        // }
        // toast.success(resp.message);
        setIsLoadingCleaning(false);
        await sleep(1);
        window.location.reload();
    }


    return (
        <>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <ModalUpdatePriceRoom
                selectedRooms={selectedRooms}
                onRemoveRoom={onRemoveRoom}
                isOpen={modalUpdatePrice}
                onClose={() => setModalUpdatePrice(false)}
            />

            <ModalActivePromotion
                selectedRooms={selectedRooms}
                onRemoveRoom={onRemoveRoom}
                isOpen={modalActivePromotion}
                onClose={() => setModalActivePromotion(false)}
            />

            <ModalUpdateStateRoom
                isOpen={modalUpdateStateRoom}
                onClose={() => setModalUpdateStateRoom(false)}
            />

            {selectedRooms.length > 0 && (
                <div className='flex gap-2 items-center' >

                    <button
                        onClick={onRoomClean}
                        disabled={isLoadingCleaning}
                        className={
                            clsx(
                                {
                                    "group fade-in flex gap-3 items-center bg-blue-200 border border-blue-400 py-2 px-3 rounded-md hover:bg-blue-600 mb-3": !isLoadingCleaning,
                                    "group fade-in flex gap-3 items-center bg-blue-600 border py-2 px-3 rounded-md  mb-3": isLoadingCleaning,
                                }
                            )
                        }>
                        {
                            isLoadingCleaning
                                ? (
                                    <div className='flex justify-center px-8 items-center' >
                                        <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                ) : (
                                    <>
                                        <LiaBroomSolid className="h-5 w-5 text-blue-600 group-hover:text-white" />
                                        <span className="text-blue-600 text-sm group-hover:text-white">
                                            Limpieza
                                        </span>
                                    </>
                                )
                        }

                    </button>

                    <button
                        onClick={() => setModalUpdatePrice(true)}
                        className="group fade-in flex gap-3 items-center bg-green-200 border border-green-400 hover:bg-green-600 py-2 px-3 rounded-md mb-3"
                    >
                        <IoPricetagsSharp className="h-5 w-5 text-green-600 group-hover:text-white" />
                        <span className="text-green-600 text-sm group-hover:text-white">
                            Actualizar precio
                        </span>
                    </button>

                    <button
                        onClick={() => setModalActivePromotion(true)}
                        className="group fade-in flex gap-3 items-center bg-red-200 border border-red-400 hover:bg-red-600 py-2 px-3 rounded-md mb-3"
                    >
                        <BiSolidDiscount className="h-5 w-5 text-red-600 group-hover:text-white" />
                        <span className="text-red-600 text-sm group-hover:text-white">
                            Activar promocion
                        </span>
                    </button>

                    <button
                        onClick={() => setModalUpdateStateRoom(true)}
                        className="group fade-in flex gap-3 items-center bg-purple-200 border border-purple-400 hover:bg-purple-600 py-2 px-3 rounded-md mb-3"
                    >
                        <TfiReload className="h-5 w-5 text-purple-600 group-hover:text-white" />
                        <span className="text-purple-600 text-sm group-hover:text-white">
                            Actualizar estado
                        </span>
                    </button>
                </div>
            )}

        </>
    )
}
