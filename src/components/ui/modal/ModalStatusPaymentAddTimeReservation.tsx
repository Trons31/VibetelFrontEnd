'use client';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { TransactionData } from '@/interfaces';
import { currencyFormat } from '@/utils';
import { useSession } from 'next-auth/react';
import { MdOutlineAccessTimeFilled, MdOutlineError } from 'react-icons/md';

interface Props {
    reference: string;
}

export const ModalStatusPaymentAddTimeReservation = ({ reference }: Props) => {

    const router = useRouter();
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(true);
    const isAuthenticated = !!session?.user;

    const handleCloseModal = () => {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('ref_payco');
        router.replace(newUrl.pathname + newUrl.search); // Actualiza la URL sin recargar la página
    };

    const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchTransactionData = async (reference: string) => {
            try {
                const response = await fetch(`https://secure.epayco.co/validation/v1/reference/${reference}`);
                const data: TransactionData = await response.json();

                if (data.success && data.data.x_response === 'Aceptada') {
                    setTransactionData(data);
                    setSuccess(true);
                } else if (data.success === false || !data.data.x_ref_payco) {
                    setError('La referencia de transacción no existe o no se pudo obtener la información.');
                } else {
                    setError('La transacción ha sido rechazada o no se pudo obtener información.');
                }
            } catch (error) {
                setError('Error al obtener los datos de la transacción.');
            } finally {
                setLoading(false);
            }
        };

        if (reference) {
            fetchTransactionData(reference);
        } else {
            setError('Referencia de transacción no encontrada.');
            setLoading(false);
        }
    }, [reference]);

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
            handleCloseModal();
            setIsOpen(false);
        }
    };

    return (
        <div
            className="fixed fade-in inset-0 z-50 overflow-y-hidden md:p-5 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div className="bg-white md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 p-2 md:p-6 max-h-full overflow-y-auto">

                {loading ? (
                    <div className='flex gap-2 justify-center items-center py-20'>
                        <div className="px-1" >
                            <svg className="h-5 w-5 animate-spin text-red-600 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <p className="text-sm md:text-lg">Cargando detalles de la transacción...</p>
                    </div>
                ) : error ? (
                    <div className="px-4">
                        <div className=" py-3 px-4">
                            <div className="flex justify-center">
                                <MdOutlineError className="text-red-500 h-14 w-14" />
                            </div>
                            <div className="flex justify-center mt-3">
                                <p className="text-xl font-bold text-red-500">Transacción fallida</p>
                            </div>
                            <div className="mt-5">
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                ) : transactionData && success ? (
                    <>

                        <div className="flex justify-center ">
                            <div>
                                <div className="flex justify-center">
                                    <MdOutlineAccessTimeFilled className="text-green-500 h-14 w-14" />
                                </div>
                                <div className="flex justify-center mt-3">
                                    <p className="text-md md:text-xl font-bold text-green-500">Transacción exitosa</p>
                                </div>
                                <div className="flex justify-center">
                                    <p className="font-bold md:font-medium text-sm md:text-2xl">Referencia ePayco #{transactionData?.data.x_ref_payco}</p>
                                </div>
                                <div className="flex justify-center">
                                    <p className="text-sm font-light">{transactionData?.data.x_fecha_transaccion}</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center flex w-full justify-center md:py-4">
                            <div>
                                <div className="grid grid-cols mt-5 md:grid-cols-2 mb-3 space-y-3 md:space-y-0">
                                    <div>
                                        <p className="font-bold text-lg">Medio de pago</p>
                                        <p className="font-medium text-md">{transactionData?.data.x_franchise || 'Desconocido'}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Monto pagado</p>
                                        <p className="font-medium text-md">{currencyFormat(transactionData?.data.x_amount!)}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols mt-5 md:grid-cols-2 mb-3 space-y-3 md:space-y-0">
                                    <div>
                                        <p className="font-bold text-lg">ID de factura</p>
                                        <p className="font-medium text-md">{transactionData?.data.x_id_invoice}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Estado de la transacción</p>
                                        <p className="font-medium text-md">{transactionData?.data.x_response_reason_text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 flex justify-end">
                            <button
                                onClick={() => { setIsOpen(false), handleCloseModal() }}
                                className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
                            >
                                Aceptar
                            </button>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}
