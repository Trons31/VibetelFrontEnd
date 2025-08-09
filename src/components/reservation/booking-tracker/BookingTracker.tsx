'use client';
import React, { useEffect, useState } from 'react';
import { DetailBooking, GuideSteps, UserReservationTracker } from '@/components';
import { ReservationApi } from '@/interfaces/reservation.interface';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface Props {
    reservation: ReservationApi;
}

const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
};

export const BookingTracker = ({ reservation }: Props) => {
    const [isLoading, setisLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('seguimiento');

    useEffect(() => {
        setisLoading(false);
    }, [])

    return (
        <div className="mt-9 rounded-lg px-4 bg-white shadow-sm md:shadow-md mb-10">

            <nav className="flex justify-between md:justify-start  md:gap-8">
                <button
                    onClick={() => setActiveTab('seguimiento')}
                    className={clsx(
                        "py-2 text-xs md:text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800",
                        {
                            "border-b-4 border-gray-900": activeTab === 'seguimiento'
                        }
                    )}
                >
                    Seguimiento
                </button>

                <button
                    onClick={() => setActiveTab('detalle')}
                    className={clsx(
                        "py-2 text-xs md:text-sm  font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800",
                        {
                            "border-b-4 border-gray-900": activeTab === 'detalle'
                        }
                    )}
                >
                    Detalle de la reserva
                </button>

                <button
                    onClick={() => setActiveTab('guia')}
                    className={clsx(
                        "py-2 text-xs md:text-sm  font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800",
                        {
                            "border-b-4 border-gray-900": activeTab === 'guia'
                        }
                    )}
                >
                    Guia
                </button>
            </nav>

            {
                isLoading
                    ? (
                        <div className='flex justify-center gap-5 mt-32 pb-36' >
                            <svg className="h-5 w-5 animate-spin text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Cargando informacion...
                        </div>
                    ) : (
                        <>
                            <motion.div
                                key={activeTab}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={fadeVariants}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className='py-5'
                            >
                                {activeTab === 'seguimiento' && (
                                    <>
                                        <h3 className="text-2xl text-gray-700 font-bold mb-6 ml-3"></h3>
                                        <UserReservationTracker reservation={reservation} />
                                    </>
                                )}
                                {activeTab === 'detalle' && (
                                    <>
                                        <DetailBooking reservation={reservation} />
                                    </>
                                )}
                                {activeTab === 'guia' && (
                                    <>
                                        <GuideSteps />
                                    </>
                                )}
                            </motion.div>
                        </>
                    )
            }
        </div >
    );
}
