'use client';

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoTimer } from 'react-icons/io5';

export const TotalReservationRequests = () => {

    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <AnimatePresence>
                {
                    isOpen && (
                        <div className="fixed z-10 right-0 top-28 transform -translate-y-1/2">
                            <motion.div
                                className={`bg-white shadow-lg rounded-l-lg overflow-hidden w-64}`}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                transition={{ type: 'spring', stiffness: 100 }}
                            >
                                <button
                                    onClick={toggleMenu}
                                    className="flex items-center w-full gap-2 justify-between py-2 px-4 bg-gray-900 text-white">
                                    <h2 className="text-sm font-semibold">15 solicitudes de reservas</h2>
                                    <IoIosArrowForward className="h-4 w-4" />
                                </button>
                                <div className="flex flex-col items-start p-4 space-y-4">
                                    <p className='text-xs' >Responde tus solicitudes en el tiempo indicado</p>
                                </div>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence >

            <AnimatePresence>
                {!isOpen && (
                    <div className="fixed z-10 right-0 top-28 transform -translate-y-1/2">
                        <motion.div
                            className={`bg-white shadow-lg rounded-l-lg overflow-hidden w-16}`}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ type: 'spring', stiffness: 100 }}
                        >
                            <button
                                onClick={toggleMenu}
                                className="flex items-center justify-between gap-2 py-2 px-4 bg-gray-900 text-white">
                                <IoIosArrowBack className="h-4 w-4" />
                                <h2 className="mx-auto focus:outline-none text-sm">
                                    15
                                </h2>
                            </button>
                        </motion.div>

                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
