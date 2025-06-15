'use client';
import React, { useEffect } from 'react'
import { Reservation } from '@/interfaces/reservation.interface';
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
    reservation: Reservation;
    isOpen: boolean;
    onClose: () => void;
}

export const AccessCode = ({ reservation, isOpen, onClose }: Props) => {

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

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
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
                        className="fixed inset-0 z-30 flex items-end  md:items-center bg-black bg-opacity-50 backdrop-blur-sm"
                        onClick={handleBackdropClick}
                    >
                        <div className="mx-auto flex w-full md:max-w-sm md:rounded-lg flex-col bg-white border px-4 py-5 shadow-sm ">

                            {
                                reservation.ServiceItem?.canceledReservation &&
                                (
                                    <>
                                        <p className="text-md font-medium">Código de acceso anulado</p>
                                        <p className="mb-4 text-sm text-gray-500">Tu código de acceso fue anulado debido a la cancelacion de tu reserva</p>
                                    </>
                                )
                            }

                            {
                                reservation.ServiceItem?.serviceTaken !== true && reservation.ServiceItem?.canceledReservation !== true &&
                                (
                                    <>
                                        <p className="text-md font-medium">Código de acceso</p>
                                        <p className="mb-4 text-sm text-gray-500">Tu código de acceso para el motel es el siguiente:</p>
                                    </>
                                )
                            }

                            {
                                reservation.ServiceItem?.serviceTaken &&
                                (
                                    <>
                                        <p className="text-md font-medium">Código de acceso</p>
                                        <p className="mb-4 text-sm text-gray-500">
                                            Tu código de acceso para el motel ha sido utilizado y por motivos de seguridad ha sido protegido.
                                        </p>
                                    </>

                                )
                            }

                            <div className="mb-2 flex justify-center space-x-4">
                                {
                                    reservation.ServiceItem?.accessCode
                                        ? (
                                            reservation.ServiceItem?.accessCode!.split('').map((char, index) => (
                                                <div key={index}>
                                                    <p className='text-center text-xs ' >{index + 1}</p>
                                                    <p className="flex h-10 w-10 mb-2 items-center justify-center rounded-xl border md:text-lg font-medium sm:h-14 sm:w-14  text-md">
                                                        {char}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <>
                                                <p className="flex h-10 w-10 mb-2 items-center justify-center rounded-xl border text-4xl font-medium sm:h-20 sm:w-20 sm:text-xl">
                                                    #
                                                </p>
                                                <p className="flex h-10 w-10 mb-2 items-center justify-center rounded-xl border text-4xl font-medium sm:h-20 sm:w-20 sm:text-xl">
                                                    #
                                                </p>
                                                <p className="flex h-10 w-10 mb-2 items-center justify-center rounded-xl border text-4xl font-medium sm:h-20 sm:w-20 sm:text-xl">
                                                    #
                                                </p>
                                                <p className="flex h-10 w-10 mb-2 items-center justify-center rounded-xl border text-4xl font-medium sm:h-20 sm:w-20 sm:text-xl">
                                                    #
                                                </p>

                                            </>

                                        )
                                }
                            </div>
                            {
                                reservation.ServiceItem?.serviceTaken !== true && reservation.ServiceItem?.canceledReservation !== true && (
                                    <p className="mb-4 text-sm text-gray-500">Por favor, utiliza este código en el sistema de entrada para acceder a tu habitación. ¡Disfruta de tu servicio!</p>
                                )
                            }
                            {
                                reservation.ServiceItem?.serviceTaken !== true && reservation.ServiceItem?.canceledReservation !== true && (
                                    <p className="mb-4 text-sm text-gray-500">Protege tu codigo, no lo compartas</p>
                                )
                            }
                            <div className="flex flex-col sm:flex-row">
                                <button
                                    onClick={onClose}
                                    className="w-full rounded-md border bg-gray-700 px-8 py-2 font-medium text-white"
                                >
                                    Ocultar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
