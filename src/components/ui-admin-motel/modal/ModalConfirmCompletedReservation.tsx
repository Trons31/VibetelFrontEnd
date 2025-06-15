'use client';
import React, { useEffect, useState } from 'react'
import { CiLogin } from 'react-icons/ci';
import { sleep } from '@/utils';
import clsx from 'clsx';
import { confirmCompletedReservationByMotel } from '@/actions';
import { FaCheckCircle } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

interface ModalProps {
    idReservation: string;
    room: string | null | undefined;
    roomNumber: string | null | undefined;

    isOpen: boolean;
    onClose: () => void;
}

export const ModalConfirmCompletedReservation = ({ isOpen, onClose, idReservation, roomNumber, room }: ModalProps) => {
    const [showLoading, setShowLoading] = useState(false);
    const [successConfirmTakeReservation, setSuccessConfirmTakeReservation] = useState(false)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);



    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!showLoading) {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }
    };

    const OnConfirmReservation = async () => {
        setShowLoading(true);
        await sleep(3);

        const resp = await confirmCompletedReservationByMotel(idReservation);

        if (!resp.ok) {
            toast.error("Ups! no se pudo confirmar la finalizacion del servicio")
            return;
        }

        setShowLoading(false);
        setSuccessConfirmTakeReservation(true)
    }

    return (
        <>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <div
                className="fixed fade-in inset-0 z-50 overflow-y-hidden p-5 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={handleBackdropClick}
            >
                <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/2 p-6 max-h-full overflow-y-auto">

                    {
                        successConfirmTakeReservation
                            ? (
                                <div className='fade-in' >
                                    <div className='flex justify-center'>
                                        <div className='p-2 bg-green-100 rounded-lg'>
                                            <FaCheckCircle size={32} className='text-green-600' />
                                        </div>
                                    </div>
                                    <p className="mt-4 text-center text-xl font-bold">Finalización confirmada</p>
                                    <p className="mt-2 text-center text-lg break-words max-w-full">
                                        Se ha confirmado la finalización del servicio y la correcta salida de la habitación <span className="font-medium text-indigo-700">{room} Nro° {roomNumber}</span>.
                                    </p>


                                    <div className='flex justify-end'>
                                        <button
                                            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                            onClick={() => {
                                                setSuccessConfirmTakeReservation(false),
                                                    onClose()
                                            }}
                                        >
                                            Cerrar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='fade-in' >
                                    <div className='flex justify-center'>
                                        <div className='p-2 bg-blue-100 rounded-lg'>
                                            <CiLogin size={32} className='text-blue-600' />
                                        </div>
                                    </div>

                                    <p className="mt-4 text-center text-xl font-bold">Confirmar salida</p>
                                    <p className="mt-2 text-center text-lg">Para finalizar el servicio en la habitacion <span className='className="mt-2 text-center text-md text-indigo-700 ' >{room} Nro° {roomNumber}</span> debes confirmar la salida solicitada por el usuario</p>
                                    <p className="font-medium mt-4 text-center text-red-600" >Verfica que todo este en orden</p>

                                    <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">

                                        <button
                                            type='submit'
                                            disabled={showLoading}
                                            onClick={() => {

                                                OnConfirmReservation()
                                            }}
                                            className={
                                                clsx(

                                                    {
                                                        "flex items-center gap-x-4 rounded-lg bg-blue-600 hover:bg-blue-700 px-7 py-2 font-medium text-white": !showLoading,
                                                        "flex items-center gap-x-4 rounded-lg bg-blue-600 px-7 py-2 font-medium text-white cursor-not-allowed": showLoading
                                                    }
                                                )
                                            }>
                                            {
                                                showLoading &&
                                                (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>)
                                            }

                                            {
                                                showLoading
                                                    ? (
                                                        <span>Cargando...</span>
                                                    ) : (
                                                        <span>Confirmar salida</span>
                                                    )
                                            }

                                        </button>

                                        <div className='relative'>
                                            {showLoading && (
                                                <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
                                                    <div className="flex items-center">

                                                    </div>
                                                </div>
                                            )}
                                            <button
                                                onClick={onClose}
                                                className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-3 font-medium"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        </>
    )
}
