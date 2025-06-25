'use client';
import React, { useEffect } from 'react'
import { useUIStore } from '@/store';
import toast, { Toaster } from 'react-hot-toast';
import { FaCheckCircle } from 'react-icons/fa';

export const ToastSuccessLocationUser = () => {

    const isToastSuccessLocationUserOpen = useUIStore(state => state.isToastSuccessLocationUserOpen);
    const closeToastSuccessLocationUserOpen = useUIStore(state => state.closeToastSuccessLocationUserOpen);


    useEffect(() => {
        if (isToastSuccessLocationUserOpen) {
            toast(
                (t) => (
                    <div>
                        <h3 className="text-green-600 text-sm md:text-lg font-semibold">Ubicacion guardada</h3>
                        <p className="text-xs md:text-sm text-gray-800">Disfruta de nuestros servicios</p>
                    </div>
                ),
                {
                    duration: 4000,
                    position: window.innerWidth <= 768 ? 'top-center' : 'top-right',
                    style: {
                        padding: '16px',
                        color: '#f44336',
                    },
                    icon: <FaCheckCircle
                        className='text-green-600 h-6 w-6'
                    />,
                    ariaProps: {
                        role: 'alert',
                        'aria-live': 'assertive',
                    },

                }
            );
        }
        closeToastSuccessLocationUserOpen();
    }, [isToastSuccessLocationUserOpen, closeToastSuccessLocationUserOpen])

    return (
        <div className='z-50'>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    )
}
