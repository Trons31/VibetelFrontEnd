'use client';
import React, { useEffect, useState } from 'react';
import { AccessCode, AddTimeReservation, ModalCancelBooking, ModalCompletedBooking, ModalRequestAccesMotel } from '@/components';
import { ReservationApi } from '@/interfaces/reservation.interface';
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { BsIncognito } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { FaBars, FaCheck, FaClock, FaLock } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { sleep } from '@/utils';
import { LuLogIn, LuLogOut } from 'react-icons/lu';
import { IoLogIn, IoLogOut } from 'react-icons/io5';
import { TbClockEdit } from 'react-icons/tb';
import { MdOutlineLock } from 'react-icons/md';

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
    const [isModalOpenRequestAccessMotel, setIsModalOpenRequestAccessMotel] = useState(false);


    const [isAviableCompletedBooking, setIsAviableCompletedBooking] = useState(false);
    const [isAddTimeReservation, setIsAddTimeReservation] = useState(false);
    const [isCancelBooking, setIsCancelBooking] = useState(false);
    const [isRequestAccessMotel, setIsRequestAccessMotel] = useState(false);


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

    const openRequestAccesMotel = () => {
        const now = new Date();
        const arrivalDate = new Date(reservation.ServiceItem.arrivalDate);

        const timeBefore = 10; // minutos antes del inicio permitidos
        const timeAfter = reservation.ServiceItem.room.motel.MotelConfig.timeAwaitTakeReservation; // minutos después permitidos

        const diffInMs = now.getTime() - arrivalDate.getTime();
        const diffInMinutes = diffInMs / (1000 * 60);

        const isAvailable = diffInMinutes >= -timeBefore && diffInMinutes <= timeAfter;

        if (reservation.ServiceItem.serviceTaken) {
            setIsRequestAccessMotel(false);
        } else {
            setIsRequestAccessMotel(isAvailable);
        }


        setIsVisible(false);
        setIsModalOpenRequestAccessMotel(true);
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

    const handleRequestAccessMotelClose = () => {
        setIsModalOpenRequestAccessMotel(false)
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
                                    <div 
                                    id="side-menu"
                                    className="fixed z-10 right-0 top-1/2 transform -translate-y-1/2">
                                        <motion.div
                                            className={`bg-white shadow-lg rounded-l-lg overflow-hidden xs:w-52 md:w-72}`}
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            transition={{ type: 'spring', stiffness: 100 }}
                                        >
                                            <button
                                                onClick={toggleMenu}
                                                className="flex w-full items-center gap-2 justify-between p-4 bg-gray-800 text-white">
                                                <h2 className="text-sm md:text-lg font-semibold">Gestion de Reserva</h2>
                                                <IoIosArrowForward className="h-4 md:h-5 w-4 md:w-5" />
                                            </button>
                                            <div className="flex flex-col items-start p-4 space-y-4">

                                                <button
                                                    onClick={openAccessCode}
                                                    className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                    <MdOutlineLock className='w-3 h-3 md:h-4 md:w-4' />
                                                    <span className='text-xs md:hidden' >Código de Acceso</span>
                                                    <span className='hidden md:block' >Código de Acceso</span>
                                                </button>

                                                {/* <button
                                                    onClick={OpenAddTimeReservation}
                                                    className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                    <TbClockEdit className='w-3 h-3 md:h-4 md:w-4' />
                                                    <span className='text-xs md:hidden' >Extender la Reserva</span>
                                                    <span className='hidden md:block' >Extender la Reserva</span>
                                                </button> */}

                                                <button
                                                    onClick={openRequestAccesMotel}
                                                    className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                    <LuLogIn className='w-3 h-3 md:h-4 md:w-4' />
                                                    <span className='text-xs md:hidden' >Solicitar acceso</span>
                                                    <span className='hidden md:block' >Solicitar acceso</span>
                                                </button>

                                                <button
                                                    onClick={openCompletedBooking}
                                                    className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                    <LuLogOut className='w-3 h-3 md:h-4 md:w-4' />
                                                    <span className='text-xs md:hidden' >Confirmar Salida</span>
                                                    <span className='hidden md:block' >Confirmar Salida</span>
                                                </button>

                                                <button
                                                    onClick={openModalCancelBooking}
                                                    className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                    <FaTimes className='w-3 h-3 md:h-4 md:w-4' />
                                                    <span className='text-xs md:hidden' >Cancelar Reserva</span>
                                                    <span className='hidden md:block' >Cancelar Reserva</span>
                                                </button>

                                                {
                                                    !isAuthenticated && !loading && (
                                                        <button
                                                            onClick={handleLogout}
                                                            className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                            <BsIncognito className='w-3 h-3 md:h-4 md:w-4' />
                                                            <span className='text-xs md:hidden' >Salir y proteger reserva</span>
                                                            <span className='hidden md:block' >Salir y proteger reserva</span>
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
                                            {/* <button
                                                onClick={OpenAddTimeReservation}
                                                className="flex items-center space-x-3 hover:text-gray-700 focus:outline-none">
                                                <FaClock />
                                            </button> */}
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

            <AddTimeReservation
                isAviable={isAddTimeReservation}
                reservation={reservation}
                isOpen={isOpenAddTimeReservation}
                onClose={handleAddTimeReservationClose}
            />

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

            <ModalRequestAccesMotel
                isAviable={isRequestAccessMotel}
                idReservation={reservation.id}
                isOpen={isModalOpenRequestAccessMotel}
                onClose={handleRequestAccessMotelClose} />

        </>

    )
}
