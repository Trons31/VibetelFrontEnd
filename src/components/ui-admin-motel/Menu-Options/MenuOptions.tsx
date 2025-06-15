'use client';
import React, { useState } from 'react'
import { SheedAccessReservation, SheedRoom, SheedWalkInRoom } from '@/components';
import { AnimatePresence, motion } from 'framer-motion'
import { FaBars } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { IoBedOutline, IoLogIn } from 'react-icons/io5';
import { MdContentPasteSearch } from 'react-icons/md';

interface Props {
    motelId: string
    roomsInAvailable: number;
    totalReservation: number;
}

export const MenuOptions = ({ motelId, roomsInAvailable, totalReservation }: Props) => {

    const [isOpen, setIsOpen] = useState(true);
    const [isOpenSheedAccessReservation, setisOpenSheedAccessReservation] = useState(false);
    const [isOpenSheedRoom, setisOpenSheedRoom] = useState(false);
    const [isOpenSheedWalkInRoom, setisOpenSheedWalkInRoom] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
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
                                    className="flex items-center w-full gap-2 justify-between p-4 bg-gray-900 text-white">
                                    <h2 className="text-lg font-semibold">Acceso rapido</h2>
                                    <IoIosArrowForward className="h-5 w-5" />
                                </button>
                                <div className="flex flex-col items-start p-4 space-y-4">
                                    <button
                                        onClick={() => setisOpenSheedAccessReservation(true)}
                                        className="flex items-center space-x-3 hover:text-blue-600 focus:outline-none">
                                        <MdContentPasteSearch size={23} />
                                        <span>Acceso con reserva</span>
                                    </button>
                                    <button
                                        onClick={() => setisOpenSheedWalkInRoom(true)}
                                        className="flex items-center space-x-3 hover:text-blue-600 focus:outline-none">
                                        <IoLogIn size={22} />
                                        <span>Acceso sin reserva</span>
                                    </button>
                                    <button
                                        onClick={() => setisOpenSheedRoom(true)}
                                        className="flex items-center space-x-3 hover:text-blue-600 focus:outline-none">
                                        <IoBedOutline size={22} />
                                        <span>Gestion de habitaciones</span>
                                    </button>
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
                            <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
                                <button onClick={toggleMenu} className="mx-auto focus:outline-none">
                                    <FaBars />
                                </button>
                            </div>
                            <div className="flex flex-col items-start p-4 space-y-4">
                                <button
                                    onClick={() => setisOpenSheedAccessReservation(true)}
                                    className="flex items-center space-x-3 hover:text-blue-600 focus:outline-none">
                                    <MdContentPasteSearch size={23} />
                                </button>
                                <button
                                    onClick={() => setisOpenSheedWalkInRoom(true)}
                                    className="flex items-center space-x-3 hover:text-blue-600 focus:outline-none">
                                    <IoLogIn size={23} />
                                </button>
                                <button
                                    onClick={() => setisOpenSheedRoom(true)}
                                    className="flex items-center space-x-3 hover:text-blue-600 focus:outline-none">
                                    <IoBedOutline size={22} />
                                </button>
                            </div>
                        </motion.div>

                    </div>
                )}
            </AnimatePresence>


            <SheedAccessReservation
                motelId={motelId}
                totalReservation={totalReservation}
                isOpen={isOpenSheedAccessReservation}
                onClose={() => setisOpenSheedAccessReservation(false)}
            />

            <SheedRoom
                isOpen={isOpenSheedRoom}
                motelId={motelId}
                onClose={() => setisOpenSheedRoom(false)}
            />

            <SheedWalkInRoom
                motelId={motelId}
                roomsInAviable={roomsInAvailable}
                isOpen={isOpenSheedWalkInRoom}
                onClose={() => setisOpenSheedWalkInRoom(false)}
            />

        </>
    )
}
