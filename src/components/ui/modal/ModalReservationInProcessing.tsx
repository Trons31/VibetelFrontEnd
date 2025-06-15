'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { deleteTransactionIdReservation } from '@/actions';
import { Toaster } from 'react-hot-toast';
import { TiWarning } from 'react-icons/ti';
import { useSession } from 'next-auth/react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    newReservation: () => void;
}

export const ModalReservationInProcessing = ({ isOpen, onClose, newReservation }: ModalProps) => {

    const { data: session } = useSession();

    const isAuthenticated = !!session?.user;

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
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const OnNewReservation = async () => {
        deleteTransactionIdReservation();
        newReservation();
        onClose();
    }

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div
                className="fixed fade-in inset-0 z-50 overflow-y-hidden md:p-5 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={handleBackdropClick}
            >
                <div className="bg-white md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 p-2 md:p-6 max-h-full overflow-y-auto">
                    <div className="block md:flex justify-center p-2 rounded-lg gap-2 items-center">
                        <div className="p-2 flex justify-center">
                            <TiWarning size={25} className="text-yellow-500" />
                        </div>
                        <p className="text-center text-lg md:text-xl">
                            Reserva en proceso de pago
                        </p>
                    </div>

                    <div className="mt-2 text-center text-gray-700">
                        <p style={{ textAlign: 'justify' }}>
                            Existe una reserva en proceso de pago. Si realizas una nueva reserva, se perderá por completo la reserva anterior.
                        </p>
                    </div>

                    <div className='flex justify-end gap-4 mt-4' >

                        <button
                            onClick={OnNewReservation}
                            className='bg-gray-300 text-sm md:text-md text-gray-800 p-2 rounded-lg' >
                            Agregar nueva reserva
                        </button>

                        <Link href={isAuthenticated ? "/payment-processing/user" : "/payment-processing/guest"} className='bg-blue-600 text-sm md:text-md text-center text-white p-2 rounded-lg' >
                            Finalizar proceso de pago
                        </Link>

                    </div>
                </div>
            </div>
        </>
    );
};
