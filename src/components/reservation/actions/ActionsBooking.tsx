'use client';
import React, { useEffect, useState } from 'react';
import { AccessCode, AddTimeReservation, ModalCancelBooking, ModalCompletedBooking } from '@/components';
import { ReservationApi } from '@/interfaces/reservation.interface';
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { BsIncognito } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { FaBars, FaCheck, FaClock, FaLock } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { sleep } from '@/utils';

interface Props {
    reservation: ReservationApi;
}


export const ActionsBooking = ({ reservation }: Props) => {

    const { data: session } = useSession();

    const isAuthenticated = !!session?.user;

    const [loading, setLoading] = useState(true);

    const [isOpen, setIsOpen] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [isOpenAccessCode, setIsOpenAccessCode] = useState(false);
    const [isOpenAddTimeReservation, setIsOpenAddTimeReservation] = useState(false);
    const [isModalOpenCancelBooking, setIsModalOpenCancelBooking] = useState(false);
    const [isModalOpenCompletedBooking, setIsModalOpenCompletedBooking] = useState(false);

    const [isAviableCompletedBooking, setIsAviableCompletedBooking] = useState(false);
    const [isAddTimeReservation, setIsAddTimeReservation] = useState(false);
    const [isCancelBooking, setIsCancelBooking] = useState(false);

    useEffect(() => {
        const loadAuthenticated = async () => {
            await sleep(3);
            setLoading(false);
        }

        loadAuthenticated()
    }, [])

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const openAccessCode = () => {
        setIsVisible(false);
        setIsOpenAccessCode(true)
    }

    const OpenAddTimeReservation = () => {
        setIsVisible(false);
        if (reservation.ServiceItem?.canceledReservation === false &&
            reservation.ServiceItem.serviceCompleted === false &&
            reservation.ServiceItem.serviceTaken && reservation.ServiceItem.userConfirmServiceCompleted === false
        ) {
            setIsAddTimeReservation(true)
        }
        setIsOpenAddTimeReservation(true);
    }

    const openCompletedBooking = () => {
        setIsVisible(false);
        if (reservation.ServiceItem?.canceledReservation === false &&
            reservation.ServiceItem.serviceCompleted === false &&
            reservation.ServiceItem.serviceTaken && reservation.ServiceItem.userConfirmServiceCompleted === false
        ) {
            setIsAviableCompletedBooking(true)
        }
        setIsModalOpenCompletedBooking(true)
    }


    const openModalCancelBooking = () => {
        setIsVisible(false);
        if (reservation.ServiceItem?.serviceTaken === false && reservation.ServiceItem?.canceledReservation === false && reservation.ServiceItem.status !== "no_iniciado") {
            setIsCancelBooking(true)
        }
        setIsModalOpenCancelBooking(true);
    }

    const handleAccessCodeClose = () => {
        setIsOpenAccessCode(false);
        setIsVisible(true);
    };

    const handleAddTimeReservationClose = () => {
        setIsOpenAddTimeReservation(false);
        setIsVisible(true);
    };

    const handleCompletedBookingClose = () => {
        setIsModalOpenCancelBooking(false)
        setIsVisible(true);
    }

    const handleCancelBookingClose = () => {
        setIsModalOpenCompletedBooking(false)
        setIsVisible(true);
    }

    const handleLogout = () => {
        localStorage.removeItem("persist-reservation-anonymous");
        window.location.reload();
    };

    return (
        <>

            {
                isVisible && (
                    <>
                        <AnimatePresence>

                            {
                                isOpen && (
                                    <div className="fixed z-10 right-0 top-1/2 transform -translate-y-1/2">
                                        <motion.div
                                            className={`bg-white shadow-lg rounded-l-lg overflow-hidden w-64}`}
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            transition={{ type: 'spring', stiffness: 100 }}
                                        >
                                            <button
                                                onClick={toggleMenu}
                                                className="flex w-full items-center gap-2 justify-between p-4 bg-gray-800 text-white">
                                                <h2 className="text-lg font-semibold">Gestion de Reserva</h2>
                                                <IoIosArrowForward className="h-5 w-5" />
                                            </button>
                                            <div className="flex flex-col items-start p-4 space-y-4">

                                                <button
                                                    onClick={openAccessCode}
                                                    className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                    <FaLock /> <span>Código de Acceso</span>
                                                </button>

                                                <button
                                                    onClick={OpenAddTimeReservation}
                                                    className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                    <FaClock /> <span>Extender la Reserva</span>
                                                </button>

                                                <button
                                                    onClick={openCompletedBooking}
                                                    className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                    <FaCheck /> <span>Confirmar Salida</span>
                                                </button>

                                                <button
                                                    onClick={openModalCancelBooking}
                                                    className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                    <FaTimes /> <span>Cancelar Reserva</span>
                                                </button>

                                                {
                                                    !isAuthenticated && !loading && (
                                                        <button
                                                            onClick={handleLogout}
                                                            className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                            <BsIncognito className='h-5 w-5' /> <span>Salir y proteger reserva</span>
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </motion.div>

                                    </div>
                                )
                            }
                        </AnimatePresence >

                        <AnimatePresence>
                            {!isOpen && (
                                <div className="fixed z-10 right-0 top-1/2 transform -translate-y-1/2">
                                    <motion.div
                                        className={`bg-white shadow-lg rounded-l-lg overflow-hidden w-16}`}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 100 }}
                                        transition={{ type: 'spring', stiffness: 100 }}
                                    >
                                        <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
                                            <button onClick={toggleMenu} className="mx-auto focus:outline-none">
                                                <FaBars />
                                            </button>
                                        </div>
                                        <div className="flex flex-col items-start p-4 space-y-4">
                                            <button
                                                onClick={openAccessCode}
                                                className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                <FaLock />
                                            </button>
                                            <button
                                                onClick={OpenAddTimeReservation}
                                                className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                <FaClock />
                                            </button>
                                            <button
                                                onClick={openCompletedBooking}
                                                className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                <FaCheck />
                                            </button>
                                            <button
                                                onClick={openModalCancelBooking}
                                                className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                <FaTimes />
                                            </button>
                                            {
                                                !isAuthenticated && !loading && (
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                        <BsIncognito className='h-5 w-5' />
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </motion.div>

                                </div>
                            )}
                        </AnimatePresence>
                    </>
                )
            }

            <AccessCode
                reservation={reservation}
                isOpen={isOpenAccessCode}
                onClose={handleAccessCodeClose}
            />

            {/* <AddTimeReservation
                isAviable={isAddTimeReservation}
                reservation={reservation}
                isOpen={isOpenAddTimeReservation}
                onClose={handleAddTimeReservationClose}
            />  */}

            <ModalCancelBooking
                isAviable={isCancelBooking}
                idReservation={reservation.id}
                isOpen={isModalOpenCancelBooking}
                onClose={handleCompletedBookingClose} />

            <ModalCompletedBooking
                isAviable={isAviableCompletedBooking}
                idReservation={reservation.id}
                isOpen={isModalOpenCompletedBooking}
                onClose={handleCancelBookingClose} />

        </>

    )
}
