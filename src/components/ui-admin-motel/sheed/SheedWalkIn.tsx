'use client';
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IoIosArrowForward } from 'react-icons/io';
import { TbLogout, TbLogout2 } from 'react-icons/tb';
import { currencyFormat, formatTimeWithAmPm, formatDate, sleep } from '@/utils';
import { roomAddService } from '@/interfaces';
import toast, { Toaster } from 'react-hot-toast';
import clsx from 'clsx';

interface Props {
    isOpen: boolean;
    room: roomAddService;
    onClose: () => void;
}

export const SheedWalkIn = ({ isOpen, onClose, room }: Props) => {

    const [showLoading, setShowLoading] = useState(false);
    const [exitDateTime, setExitDateTime] = useState<Date | null>(null);



    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }

        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && room.timeLimit) {
            const entryDateTime = new Date();
            const exitDateTime = new Date(
                entryDateTime.getTime() + room.timeLimit * 60 * 60 * 1000 + 5 * 60 * 1000
            );
            setExitDateTime(exitDateTime);
        }
    }, [isOpen]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!showLoading) {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }

    };

    const onService = async () => {
        setShowLoading(true);
        const service = {
            roomId: room.id,
            arrivalDate: new Date(),
            departureDate: exitDateTime!,
        }
        // const resp = await serviceWalkIn(service);

        // if (resp.ok) {
        //     toast.success("Servicio generado correctamente");
        //     setShowLoading(false);
        //     await sleep(1);
        //     window.location.reload();
        // } else {
        //     toast.error("No se pudo generar el servicio")
        //     setShowLoading(false);
        // }
    }

    const onCloseSheed = () => {
        onClose();
    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <AnimatePresence>
                {
                    isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='fixed inset-0 z-30 flex items-center justify-end bg-black bg-opacity-50 backdrop-blur-sm'
                            onClick={handleBackdropClick}
                        >

                            <div className='bg-white w-5/12 h-screen ' >
                                <button
                                    onClick={onCloseSheed}
                                    className="flex items-center w-full gap-2 justify-between p-4 bg-blue-600 hover:bg-blue-700  transition-all duration-200 text-white"
                                >
                                    <h2 className="text-lg font-semibold capitalize ">
                                        Servicio: {room.title}
                                    </h2>
                                    <IoIosArrowForward className="h-5 w-5" />
                                </button>

                                <div className='px-4 py-8 mb-20 h-full custom-scrollbar overflow-y-scroll pb-20' >

                                    <div className='border border-gray-200 p-4 rounded-lg' >
                                        <div className='flex w-full justify-end' >
                                            <p className='font-normal text-sm underline' >Habitacion</p>
                                        </div>

                                        <div className='flex justify-between mt-4' >
                                            <div>
                                                <p className='font-semibold' >Habitacion</p>
                                                <p className='capitalize' >{room.title}</p>
                                            </div>
                                            <div>
                                                <p className='font-semibold' >Numero</p>
                                                <div className='flex gap-2 items-center' >
                                                    <p className='text-sm' >Nro°</p>
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white" >{room.roomNumber}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex justify-between w-full mt-4' >
                                            <div>
                                                <p className='font-semibold' >Precio</p>
                                                <p>{currencyFormat(room.price)}</p>
                                            </div>

                                            {
                                                room.promoActive
                                                && (
                                                    <div>
                                                        <p className='font-semibold' >´Promocion</p>
                                                        <p className='text-center' >{currencyFormat(room.promoPrice!)}</p>
                                                    </div>
                                                )
                                            }

                                            <div>
                                                <p className='font-semibold' >Tiempo de uso</p>
                                                <p className='text-end' >{room.timeLimit} horas</p>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='mt-6 border border-gray-200 p-4 rounded-lg' >
                                        <div className='flex w-full justify-end' >
                                            <p className='font-normal text-sm underline' >Servicio</p>
                                        </div>

                                        <div>
                                            <div className='flex items-center gap-2' >
                                                <TbLogout className='h-5 w-5' />
                                                <p className='font-semibold' >Entrada</p>
                                            </div>

                                            <div className='flex justify-between items-center mt-2' >
                                                <div>
                                                    <p className='font-medium' >Fecha</p>
                                                    <div>{formatDate(new Date())}</div>
                                                </div>

                                                <div>
                                                    <p className='font-medium' >Hora</p>
                                                    <div>{formatTimeWithAmPm(new Date())}</div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='mt-5' >
                                            <div className='flex items-center gap-2' >
                                                <TbLogout2 className='h-5 w-5' />
                                                <p className='font-semibold' >Salida</p>
                                            </div>

                                            <div className='flex justify-between items-center mt-2'>
                                                <div>
                                                    <p className='font-medium'>Fecha</p>
                                                    <div>{exitDateTime ? formatDate(exitDateTime) : 'Calculando...'}</div>
                                                </div>

                                                <div>
                                                    <p className='font-medium'>Hora</p>
                                                    <div>{exitDateTime ? formatTimeWithAmPm(exitDateTime) : 'Calculando...'}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 mb-4 border border-gray-400 border-dashed" />

                                        <div className='flex justify-between items-center' >
                                            <p className='font-bold' >Valor a pagar:</p>
                                            {
                                                room.promoActive
                                                    ? (
                                                        currencyFormat(room.promoPrice!)
                                                    ) : (
                                                        currencyFormat(room.price)
                                                    )
                                            }
                                        </div>

                                        <div className="mt-4 mb-2 border border-gray-400 border-dashed" />

                                        <button
                                            onClick={onService}
                                            disabled={showLoading}
                                            className={
                                                clsx(

                                                    {
                                                        "w-full bg-blue-600 p-3 text-white hover:bg-blue-700 rounded-lg mt-3": !showLoading,
                                                        "w-full flex justify-center items-center gap-2 bg-blue-600 p-3 text-white hover:bg-blue-700 rounded-lg mt-3 cursor-not-allowed": showLoading
                                                    }
                                                )
                                            }>
                                            {
                                                showLoading &&
                                                (<svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>)
                                            }

                                            {
                                                showLoading
                                                    ? (
                                                        <span>Cargando...</span>
                                                    ) : (
                                                        <span>Generar servicio</span>
                                                    )
                                            }

                                        </button>

                                    </div>
                                </div>
                            </div>
                        </motion.div >
                    )
                }
            </AnimatePresence >
        </>
    )
}
