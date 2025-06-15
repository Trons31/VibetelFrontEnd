'use client';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaMapLocationDot } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import { TiWarning } from 'react-icons/ti';
import Link from 'next/link';
import clsx from 'clsx';
import { createRequestCoverage } from '@/actions';

interface ModalProps {
    department: string;
    city: string;
    cityId: string;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalRequestCoverage = ({ isOpen, onClose, department, city, cityId }: ModalProps) => {
    const [loadingRequest, setLoadingRequest] = useState(false);
    const { data: session } = useSession();

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
        if (!loadingRequest) {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }
    };

    const requestCoverage = async () => {
        setLoadingRequest(true);

        const request = await createRequestCoverage(cityId);
        if (!request.ok) {
            toast.success("Error al enviar la solicitud!");
            setLoadingRequest(false)
        } else {
            toast.success("Solicitud enviada!");
            setLoadingRequest(false)
            onClose();
        }
    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div
                className="fixed fade-in inset-0 z-50 overflow-y-hidden md:p-5 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={handleBackdropClick}
            >
                <div className="bg-white md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 p-2 md:p-6 max-h-full overflow-y-auto">
                    <div className="flex justify-center gap-2 items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <FaMapLocationDot size={23} className="text-blue-600" />
                        </div>
                        <p className="text-center text-blue-600 text-sm md:text-xl">
                            Solicitar cobertura en mi ubicación
                        </p>
                    </div>

                    <div className="mt-4 text-center text-gray-700">
                        <p style={{ textAlign: 'justify' }}>
                            Esta es la ubicacion donde deseas solicitar la cobertura de nuestra plataforma: <strong>{department}, {city}</strong>
                        </p>
                        <p className="mt-4" style={{ textAlign: 'justify' }}>
                            Esta solicitud nos ayuda a expandir nuestra cobertura y llegar hasta tu ubicación.
                        </p>
                    </div>

                    {session?.user.roles.includes("user") ? (
                        <div className='flex mt-6 justify-end' >
                            <button
                                disabled={loadingRequest}
                                onClick={requestCoverage}
                                className={
                                    clsx(

                                        {
                                            "flex items-center gap-x-4 rounded-lg bg-blue-600 hover:bg-blue-700 px-7 py-2 font-medium text-white": !loadingRequest,
                                            "flex items-center gap-x-4 rounded-lg bg-blue-600 px-7 py-2 font-medium text-white cursor-not-allowed": loadingRequest
                                        }
                                    )
                                }>
                                {
                                    loadingRequest &&
                                    (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>)
                                }

                                {
                                    loadingRequest
                                        ? (
                                            <span>Procesando...</span>
                                        ) : (
                                            <span>Enviar solicitud</span>
                                        )
                                }

                            </button>
                        </div>
                    ) : (
                        <div className="mt-6 flex justify-center gap-2 bg-red-600 p-2 rounded-md ">
                            <TiWarning className='text-white h-5 w-5' />
                            <p className='text-white text-xs md:text-sm' >Para utilizar esta opción, debes estar <Link href="/auth/login" className='underline' target="_blank" rel="noopener noreferrer" > registrado en vibetel.</Link></p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
