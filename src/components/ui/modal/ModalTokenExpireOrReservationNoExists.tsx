"use client"
import { useBookingStore } from '@/store';
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RiErrorWarningFill } from 'react-icons/ri'

export const ModalTokenExpireOrReservationNoExists = () => {
    const { removeBooking } = useBookingStore();


    const pathName = usePathname();
    const [redirectUrl, setRedirectUrl] = useState("/home");

    useEffect(() => {
        const storedRedirectUrl = localStorage.getItem("redirectUrl");
        if (storedRedirectUrl) {
            setRedirectUrl(storedRedirectUrl);
        }
    }, [pathName]);

    const handleClearRedirect = () => {
        removeBooking();
        localStorage.removeItem("redirectUrl");
        redirect(redirectUrl);
    };

    return (
        <div className="fixed fade-in inset-0 z-50 overflow-y-hidden md:p-5 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 p-2 md:p-6 max-h-full overflow-y-auto">
                <div className='flex justify-center'>
                    <div className='p-2 bg-red-100 rounded-lg'>
                        <RiErrorWarningFill size={32} className='text-red-600' />
                    </div>
                </div>

                <p className="mt-4 text-center text-md md:text-xl font-bold text-red-600">
                    El proceso de reserva ha expirado
                </p>
                <p className="mt-2 text-center text-sm md:text-lg text-gray-700">
                    El tiempo disponible para completar tu reserva ha finalizado o la reserva no es válida.
                    Por favor, vuelve a iniciar el proceso para asegurar tu habitación.
                </p>

                <div className='mt-5 flex justify-center'>
                    <Link
                        onClick={handleClearRedirect}
                        href={redirectUrl}
                        className='px-6 py-2 bg-red-600 text-xs md:text-sm text-white rounded-lg hover:bg-red-700 transition-all duration-300'
                    >
                        Iniciar nuevamente
                    </Link>
                </div>
            </div>
        </div>
    );
}
