'use client';
import React, { useEffect, useState } from 'react'
import { Reservation, ReservationApi, StatusReservation } from '@/interfaces/reservation.interface'
import { formatDateWithHours } from '@/utils';
import { motion } from 'framer-motion';
import { FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa6';

interface Props {
    reservation: ReservationApi;
}

export const BookingDetail = ({ reservation }: Props) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandedMotel, setIsExpandedMotel] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const toogleExpandeMotel = () => {
        setIsExpandedMotel(!isExpandedMotel)
    }

    const textToCopy = reservation.id;

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopySuccess(true);
            setTimeout(() => {
                setCopySuccess(false);
            }, 2000);
        } catch (err) {
            setCopySuccess(false);
        }
    };


    return (
        <div 
        id="details-section"
        className='grid grid-cols md:grid-cols-2 mt-9 md:mt-5 md:gap-10 space-y-9 md:space-y-0' >
            <div className='rounded-lg w-full bg-white shadow-sm md:shadow-md h-fit'>

                {
                    reservation.ServiceItem?.status === "en_espera" &&
                    (
                        <div className="rounded-t-md px-2 w-full h-10 bg-yellow-500">
                            <p className='text-white pt-2 text-center text-xl font-medium'>En espera</p>
                        </div>
                    )
                }

                {
                    reservation.ServiceItem?.status === "cancelado" &&
                    (
                        <div className="rounded-t-md px-2 w-full h-10 bg-red-600">
                            <p className='text-white pt-2 text-center text-xl font-medium'>Servicio cancelado</p>
                        </div>
                    )
                }

                {
                    reservation.ServiceItem?.status === "iniciado" &&
                    (
                        <div className="rounded-t-md px-2 w-full h-10 bg-blue-600">
                            <p className='text-white pt-2 text-center text-xl font-medium'>Servicio iniciado</p>
                        </div>
                    )
                }

                {
                    reservation.ServiceItem?.status === "completado" &&
                    (
                        <div className="rounded-t-md px-2 w-full h-10 bg-green-600">
                            <p className='text-white pt-2 text-center text-xl font-medium'>Servicio finalizado</p>
                        </div>
                    )
                }

                {
                    reservation.ServiceItem?.status === "no_iniciado" &&
                    (
                        <div className="rounded-t-md px-2 w-full h-10 bg-black">
                            <p className='text-white pt-2 text-center text-xl font-medium'>Servicio no iniciado</p>
                        </div>
                    )
                }

                <div className='mt-5 px-4 mb-5'>
                    <div className='block'>
                        <p className='font-bold text-md'>Codigo de reserva:  </p>
                        <div className='flex gap-4' >


                            <p className='text-md'> {reservation.id} </p>
                            {copySuccess ? (
                                <FaCheck size={16} color="green" className="transition duration-300 ease-in-out" />
                            ) : (
                                <p
                                    onClick={handleCopyClick}
                                    className='text-blue-600 font-semibold text-md cursor-pointer'
                                >copiar</p>
                            )}



                        </div>

                    </div>
                    <div className='mt-3 block md:flex justify-between items-center'>
                        <p className='font-bold text-md'>Reserva realizada el:</p>

                        <p className='text-md'> {formatDateWithHours(reservation.createdAt)} </p>

                    </div>

                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-3 mb-3 border border-gray-400 border-dashed" />
                        <div className='mt-2 justify-between items-center'>
                            <p className='font-bold text-md'>Entrada</p>


                            <p className='text-md'> {formatDateWithHours(reservation.ServiceItem?.arrivalDate!)}</p>

                        </div>
                        <div className='mt-2 justify-between items-center'>
                            <p className='font-bold text-md'>Salida</p>

                            <p className='text-md'>{formatDateWithHours(reservation.ServiceItem.departureDate)}</p>

                        </div>
                    </motion.div>

                    <div className="flex justify-center mt-5   mb-2">
                        <button onClick={toggleExpand} className="focus:outline-none">
                            {isExpanded ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
                        </button>
                    </div>
                </div>
            </div>



            <div className='rounded-lg w-full bg-white shadow-sm md:shadow-md h-fit' >

                <div className="rounded-t-md md:rounded-t-md px-2 w-full h-10 bg-gray-300 " >
                    <p className='pt-2 text-center text-xl font-medium' >Motel</p>
                </div>
                <div className='mt-5 px-4 mb-5' >
                    <div className='flex gap-2' >

                        <p className='font-bold text-md capitalize' >{reservation.ServiceItem?.room.motel.title}</p>
                        <p className='text-blue-600 font-semibold text-md' >Ubicacion</p>

                    </div>
                    <div className='mt-2 flex justify-between items-center' >
                        <p className='font-bold text-md' >
                            Dirreccion:
                        </p>

                        <p className='text-md' >
                            {reservation.ServiceItem?.room.motel.address}
                        </p>

                    </div>
                    <div className='mt-2 flex justify-between items-center' >
                        <p className='text-gray-800 font-semibold text-md' >
                            Barrio o sector:
                        </p>

                        <p className=' text-md' >
                            {reservation.ServiceItem?.room.motel.neighborhood}
                        </p>

                    </div>
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: isExpandedMotel ? 'auto' : 0, opacity: isExpandedMotel ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-2 mb-2 border border-gray-400 border-dashed" />
                        <div className='mt-2 block md:flex justify-between items-center' >
                            <p className='font-bold text-md' >
                                Habitacion:
                            </p>

                            <p className='text-md' >
                                {reservation.ServiceItem?.title}
                            </p>

                        </div>
                        <div className='mt-2 block md:flex justify-between' >
                            <p className='font-bold text-md' >
                                Nro°
                            </p>

                            <p className='text-md' >
                                {reservation.ServiceItem?.roomNumber}
                            </p>

                        </div>
                    </motion.div>
                    <div className="flex justify-center mt-4">
                        <button onClick={toogleExpandeMotel} className="focus:outline-none">
                            {isExpandedMotel ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
