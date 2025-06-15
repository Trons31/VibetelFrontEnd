'use client';
import React, { useCallback, useEffect, useState } from 'react'
import { getReservationByRoomId } from '@/actions';
import { ReservationDetailRoom, statusCounts } from '@/interfaces/reservation.interface';
import { formatDateWithHours } from '@/utils';
import { AnimatePresence, motion } from 'framer-motion'
import { IoIosArrowForward } from 'react-icons/io';

interface Props {
    roomId: string;
    nameRoom: string;
    isOpen: boolean;
    openSheedRoom: () => void;
    onClose: () => void;
}


export const DetailRoomReservation = ({ isOpen, onClose, roomId, nameRoom, openSheedRoom }: Props) => {

    const [isLoading, setisLoading] = useState(true);
    const [reservations, setReservations] = useState<ReservationDetailRoom[]>([]);
    const [totalCount, settotalCount] = useState(0);
    const [status, setStatus] = useState<statusCounts>({
        cancelado: 0,
        completado: 0,
        en_espera: 0,
        iniciado: 0,
    })

    const fetchReservations = useCallback(async () => {
        setisLoading(true);
        const data = await getReservationByRoomId(roomId);
        if (data.ok && data.totalCount !== undefined) {
            const { reservations, statusCounts, totalCount } = data;
            setStatus(statusCounts);
            setReservations(reservations);
            settotalCount(totalCount);
        }
        setisLoading(false);
    }, [roomId]);

    useEffect(() => {
        if (roomId && isOpen) {
            fetchReservations();
        }
    }, [roomId, isOpen]);


    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
            openSheedRoom();
        }
    };

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

    const onCloseButton = () => {
        onClose();
        openSheedRoom();
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className='fixed inset-0 z-30 flex items-center justify-end bg-black bg-opacity-50 backdrop-blur-sm'
                        onClick={handleBackdropClick}
                    >
                        <div className='bg-white w-9/12 h-screen'>
                            <button
                                onClick={onCloseButton}
                                className="flex items-center w-full gap-2 justify-between p-4 bg-purple-600 hover:bg-purple-700 transition-all duration-200 text-white"
                            >
                                <h2 className="text-lg font-semibold">
                                    Habitacion: {nameRoom}
                                </h2>
                                <IoIosArrowForward className="h-5 w-5" />
                            </button>
                            <div className='mb-2 h-full custom-scrollbar overflow-y-scroll pb-10'>
                                {
                                    isLoading
                                        ? (
                                            <>
                                                <div className='flex justify-center h-full gap-5 py-16 items-center' >
                                                    <svg className="h-5 w-5 animate-spin text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Cargando informacion...
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className='px-4 py-2 ' >
                                                    <div className='grid grid-cols-8 mt-5 mb-2' >
                                                        <div className='col-span-6' >
                                                            <p className='text-lg font-medium' >
                                                                Informacion general
                                                            </p>
                                                            <p className="text-xs  text-gray-500" >Aquí podrás ver todas las reservas realizadas hoy en la habitacion Suit presindecial en tiempo real. <strong>Para cargar más reservas, simplemente desplázate hacia abajo.</strong></p>
                                                        </div>
                                                        <div className='col-span-2 flex justify-end h-fit' >
                                                            <div className="relative overflow-hidden shadow border-t-4 border-gray-400 bg-gray-100 rounded-lg">
                                                                <div className="py-2 px-2">
                                                                    <div className="flex items-center">
                                                                        <h4 className="relative ml-1 inline-block text-xl text-gray-800 font-bold leading-none">
                                                                            {totalCount}
                                                                        </h4>
                                                                        <span className="ml-2 text-xs text-gray-800 font-medium capitalize">Reservas en total</span>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='flex  justify-between gap-1 mt-5' >


                                                        <div className="relative overflow-hidden shadow border-t-4 border-red-400 bg-red-100 rounded-lg">
                                                            <div className="py-2 px-2">
                                                                <div className="flex items-center">
                                                                    <h4 className="relative ml-1 inline-block text-xl text-red-800 font-bold leading-none">
                                                                        {status.cancelado}
                                                                    </h4>
                                                                    <span className="ml-2 text-xs text-red-800 font-medium capitalize">Reservas canceladas</span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="relative overflow-hidden shadow border-t-4 border-yellow-400 bg-yellow-100 rounded-lg">
                                                            <div className="py-2 px-1">
                                                                <div className="flex items-center">
                                                                    <h4 className="relative ml-1 inline-block text-xl text-yellow-800 font-bold leading-none">
                                                                        {status.en_espera}
                                                                    </h4>
                                                                    <span className="ml-2 text-xs text-yellow-800 font-medium capitalize">Reservas en espera</span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="relative overflow-hidden shadow border-t-4 border-blue-400 bg-blue-100 rounded-lg">
                                                            <div className="py-2 px-1">
                                                                <div className="flex items-center">
                                                                    <h4 className="relative ml-1 inline-block text-xl text-blue-800 font-bold leading-none">
                                                                        {status.iniciado}
                                                                    </h4>
                                                                    <span className="ml-2 text-xs text-blue-800 font-medium capitalize">Reservas iniciadas</span>
                                                                </div>

                                                            </div>
                                                        </div>


                                                        <div className="relative overflow-hidden shadow border-t-4 border-green-400 bg-green-100 rounded-lg">
                                                            <div className="py-2 px-1">
                                                                <div className="flex items-center">
                                                                    <h4 className="relative ml-1 inline-block text-xl text-green-800 font-bold leading-none">
                                                                        {status.completado}
                                                                    </h4>
                                                                    <span className="ml-2 text-xs text-green-800 font-medium capitalize">Reservas finalizadas</span>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mx-auto px-2 mt-5 mb-5">
                                                        <div className="mt-6 rounded-xl bg-white shadow">
                                                            <div className="overflow-x-auto">
                                                                <div className="max-h-[500px] custom-scrollbar-table overflow-y-auto" >
                                                                    <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                                                                        {/* Cabecera de la tabla */}
                                                                        <thead className="bg-gray-100 border-b sticky top-0 z-10">
                                                                            <tr>
                                                                                <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Nro°</th>
                                                                                <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Fecha de entrada</th>
                                                                                <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Fecha de salida</th>
                                                                                <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Tiempo de uso</th>
                                                                                <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Estado</th>

                                                                            </tr>
                                                                        </thead>
                                                                        {/* Cuerpo de la tabla con scroll vertical */}
                                                                        <tbody className="bg-white lg:border-gray-300">
                                                                            {!isLoading && (
                                                                                reservations.length > 0 ? (
                                                                                    reservations.map((reservation, index) => (
                                                                                        <motion.tr
                                                                                            key={reservation.id}
                                                                                            initial={{ opacity: 0, x: -100 }}
                                                                                            animate={{ opacity: 1, x: 0 }}
                                                                                            exit={{ opacity: 0, x: 100 }}
                                                                                            transition={{ duration: 0.3 }}
                                                                                        >
                                                                                            <td className="whitespace-no-wrap py-4 text-center text-sm text-gray-600 sm:px-3 ">
                                                                                                {index + 1}
                                                                                            </td>
                                                                                            <td className="whitespace-no-wrap py-4 text-center text-sm text-gray-600 sm:px-3 ">
                                                                                                {formatDateWithHours(new Date(reservation.arrivalDate))}
                                                                                            </td>
                                                                                            <td className="whitespace-no-wrap hidden text-center  py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                                                                {formatDateWithHours(new Date(reservation.departureDate))}
                                                                                            </td>
                                                                                            <td className="whitespace-no-wrap text-center  hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                                                                {reservation.timeLimit} hrs
                                                                                            </td>
                                                                                            <td className="whitespace-no-wrap text-center  hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">

                                                                                                {
                                                                                                    reservation.status === 'en_espera' && (
                                                                                                        <span className="rounded-md px-2 py-1 text-xs font-medium bg-yellow-200 text-yellow-600" >
                                                                                                            En espera
                                                                                                        </span>
                                                                                                    )
                                                                                                }

                                                                                                {
                                                                                                    reservation.status === 'completado' && (
                                                                                                        <span className="rounded-md px-2 py-1 text-xs font-medium bg-green-200 text-green-600" >
                                                                                                            Completado
                                                                                                        </span>
                                                                                                    )
                                                                                                }

                                                                                                {
                                                                                                    reservation.status === 'iniciado' && (
                                                                                                        <span className="rounded-md px-2 py-1 text-xs font-medium bg-blue-200 text-blue-600" >
                                                                                                            Iniciado
                                                                                                        </span>
                                                                                                    )
                                                                                                }

                                                                                                {
                                                                                                    reservation.status === 'cancelado' && (
                                                                                                        <span className="rounded-md px-2 py-1 text-xs font-medium bg-red-200 text-red-600" >
                                                                                                            Cancelado
                                                                                                        </span>
                                                                                                    )
                                                                                                }


                                                                                                {
                                                                                                    reservation.status === 'no_iniciado' && (
                                                                                                        <span className="rounded-md px-2 py-1 text-xs font-medium bg-orange-200 text-orange-600" >
                                                                                                            No inciado
                                                                                                        </span>
                                                                                                    )
                                                                                                }


                                                                                            </td>
                                                                                        </motion.tr>
                                                                                    ))
                                                                                ) : (

                                                                                    <tr>
                                                                                        <td colSpan={4} className="py-4 text-center text-sm text-gray-600">
                                                                                            No se encontraron reservas.
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            )}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </>
                                        )
                                }

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence >
        </>
    )
}
