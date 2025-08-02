'use client';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';
import clsx from 'clsx';
import { IoAlertCircleSharp } from 'react-icons/io5';
import { useSession } from 'next-auth/react';


interface ModalProps {
    idReservation: string;
    isAviable: boolean;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalCompletedBooking = ({ isOpen, onClose, idReservation, isAviable }: ModalProps) => {
    const [showLoading, setshowLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

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

    const OnConfirmServiceCompletionRequest = async () => {
        setshowLoading(true);
        // const resp = await confirmCompletedReservationByUser(idReservation);

        // if (!resp.ok) {
        //     toast.error("No se pudo finalizar la reserva");
        //     setshowLoading(false);
        //     return;
        // }

        toast.success("Servicio finalizado exitosamente")
        if(session?.user.roles.includes("user")){
            window.location.replace(`/booking/${idReservation}`)
        }else{
            window.location.replace(`/searchBooking`);
        }
      
    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div
                className="fixed fade-in inset-0 z-50 overflow-y-hidden py-5 md:p-5 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={handleBackdropClick}
            >
                <div className="bg-white md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 p-2 md:p-6 max-h-full overflow-y-auto">

                    {
                        isAviable
                            ? (
                                <>
                                    <div className='flex justify-center' >
                                        <div className='p-2 bg-green-100 rounded-lg' >
                                            <FaSignOutAlt size={32} className='text-green-600' />
                                        </div>
                                    </div>

                                    <p className="mt-4 text-center text-md md:text-xl font-bold">¿Deseas confirmar tu salida?</p>
                                    <p className="mt-2 text-center text-sm md:text-lg">
                                        Una vez confirmada la finalización del servicio, se notificará al motel para que proceda a gestionar tu salida y se finalice correctamente el servicio
                                    </p>

                                    <div className="mt-8 flex justify-center gap-2 md:gap-0  sm:flex-row sm:space-x-3 sm:space-y-0">

                                        <button
                                            onClick={OnConfirmServiceCompletionRequest}
                                            type='submit'
                                            disabled={showLoading}
                                            className={
                                                clsx(

                                                    {
                                                        "flex items-center gap-x-4 mb-2 w-fit  justify-center rounded-lg bg-red-600 px-3 py-2 hover:bg-red-700 text-lg font-bold text-white": !showLoading,
                                                        "flex items-center gap-x-4 mb-2 w-fit  justify-center rounded-lg bg-red-600 px-3 py-2 text-lg font-bold text-white cursor-not-allowed": showLoading
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
                                                        <span>Confirmar</span>
                                                    )
                                            }

                                        </button>


                                        <div className='relative' >
                                            {
                                                showLoading &&
                                                (
                                                    <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
                                                        <div className="flex items-center">

                                                        </div>
                                                    </div>
                                                )
                                            }
                                            <button
                                                onClick={onClose}
                                                className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-3 font-medium">Cancelar</button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='flex justify-center'>
                                        <div className='p-2 bg-blue-100 rounded-lg'>
                                            <IoAlertCircleSharp size={32} className='text-blue-600' />
                                        </div>
                                    </div>

                                    <p className="mt-2 text-center text-blue-600 text-sm md:text-lg">
                                        Esta opción no está disponible
                                    </p>
                                    <p className="mt-1 text-center text-gray-600 text-xs md:text-sm">
                                        La opción estará disponible únicamente mientras la reserva esté activa, es decir, después de que haya comenzado.
                                    </p>

                                    <div className="mt-8 flex justify-end gap-2 md:gap-0 sm:flex-row sm:space-x-3 sm:space-y-0">
                                        <button
                                            onClick={onClose}
                                            className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-3 font-medium">
                                            Salir
                                        </button>
                                    </div>

                                </>
                            )
                    }
                </div>
            </div>
        </>
    )
}
