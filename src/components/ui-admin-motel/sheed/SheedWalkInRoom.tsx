'use client';
import React, { useEffect, useState } from 'react'
import { TableWalkIn } from '@/app/admin/dashboard-partner-motel/walk-in/ui/TableWalkIn';
import { AnimatePresence, motion } from 'framer-motion'
import { IoIosArrowForward } from 'react-icons/io';

interface Props {
    motelId: string;
    roomsInAviable: number;
    isOpen: boolean;
    onClose: () => void;
}

export const SheedWalkInRoom = ({ isOpen, onClose, motelId, roomsInAviable }: Props) => {

    const [showLoading, setshowLoading] = useState(false);


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
        if (!showLoading) {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }

    };

    const onCloseSheed = () => {
        onClose();
    }

    return (
        <>
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

                            <div className='bg-white w-8/12 h-screen ' >
                                <button
                                    onClick={onCloseSheed}
                                    className="flex items-center w-full gap-2 justify-between p-4 bg-blue-600 hover:bg-blue-700  transition-all duration-200 text-white"
                                >
                                    <h2 className="text-lg font-semibold ">
                                        Confirmar acceso
                                    </h2>
                                    <IoIosArrowForward className="h-5 w-5" />
                                </button>
                                <div className='mb-20 h-full custom-scrollbar overflow-y-scroll pb-20 '>
                                    <div className='px-5 py-5' >
                                        <div className='mx-5 mt-5'>
                                            <p className="text-2xl font-semibold" >Acceso sin reserva</p>
                                            <p className="text-gray-500 text-sm text-start">
                                                En esta sección podrás gestionar el acceso a las habitaciones de tu motel sin previa reserva. Es importante registrar la entrada a cada habitacion para manterner actualizada la disponibiliada de cada habitacion en tiempo real.
                                            </p>
                                        </div>

                                        <TableWalkIn
                                            motelId={motelId}
                                            roomsInAviable={roomsInAviable} />
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}
