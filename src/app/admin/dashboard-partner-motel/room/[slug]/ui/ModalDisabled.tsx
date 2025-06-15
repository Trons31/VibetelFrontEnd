'use client';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import { MdVisibilityOff } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import { disabledRoom } from '@/actions';

interface ModalProps {
    isOpen: boolean;
    nameRoom?: string;
    idRoom: string;
    onClose: () => void;
}


export const ModalDisabled = ({ isOpen, onClose, nameRoom, idRoom }: ModalProps) => {

    const [showLoading, setshowLoading] = useState(false);

    const OnDisabledRoom = async () => {
        setshowLoading(true);
        const resp = await disabledRoom(idRoom);
        if (!resp?.ok) {
            setshowLoading(false);
            toast.error("No se pudo desabilitar la habitacion")
            return
        }
        setshowLoading(false);
        window.location.reload();
    }

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

    return (
        <>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <div
                className="fixed inset-0 z-50 overflow-y-hidden p-5 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={handleBackdropClick}
            >
                <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/2 p-6 max-h-full overflow-y-auto">


                    <div className='flex justify-center'>
                        <div className='p-2 bg-black rounded-lg'>
                            <MdVisibilityOff size={32} className='text-white' />
                        </div>
                    </div>

                    <p className="mt-4 text-center text-xl font-bold">Confirmar Desactivación</p>
                    <p className="mt-2 text-lg"
                        style={{ textAlign: 'justify' }}>
                        ¿Estás seguro de que deseas desactivar la habitación <span className="truncate font-medium capitalize">{nameRoom}</span>?
                        Esta acción hará que la habitación ya no sea visible para los usuarios en la app de Vibetel, ni podrán ver sus detalles o reservarla.
                    </p>

                    <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                        <button
                            disabled={showLoading}
                            onClick={() => {
                                OnDisabledRoom()
                            }}
                            className={
                                clsx(
                                    {
                                        "flex gap-3 items-center  rounded-md bg-black px-4 py-3 font-medium text-white cursor-not-allowed": showLoading,
                                        "flex gap-1 items-center rounded-md bg-black px-4 py-3 font-medium text-white": !showLoading
                                    }
                                )
                            }>
                            {
                                showLoading && (
                                    <svg className="h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )
                            }
                            {
                                showLoading
                                    ? "Cargando..."
                                    : "Desactivar"
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


                </div>

            </div>
        </>
    )
}

