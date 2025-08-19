'use client';

import React, { useEffect, useState } from 'react';
import { TransactionData } from '@/interfaces';
import { currencyFormat } from '@/utils';
import { IoBagCheck } from 'react-icons/io5';
import { MdOutlineError } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { CountdownTimerSeconds, SkeletonStatusCheckOut } from '@/components';
import { useSession } from 'next-auth/react';
import { useBookingStore } from '@/store';

interface Props {
    reference: string;
}

export const UiPage = ({ reference }: Props) => {
    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    const roomInBooking = useBookingStore((state) => state.Booking);

    const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    // Fetch de datos de transacción
    useEffect(() => {
        const fetchTransactionData = async () => {
            try {
                const response = await fetch(`https://secure.epayco.co/validation/v1/reference/${reference}`);
                const data: TransactionData = await response.json();

                if (data.success && data.data.x_response === 'Aceptada') {
                    setTransactionData(data);
                } else if (data.success === false || !data.data.x_ref_payco) {
                    setError('La referencia de transacción no existe o no se pudo obtener la información.');
                } else {
                    setError('La transacción ha sido rechazada o no se pudo obtener información.');
                }
            } catch {
                setError('Error al obtener los datos de la transacción.');
            } finally {
                setLoading(false);
            }
        };

        if (reference) {
            fetchTransactionData();
        } else {
            setError('Referencia de transacción no encontrada.');
            setLoading(false);
        }
    }, [reference]);

    // Acción al terminar el contador
    const handleRedirect = () => {
        if (error) {
            if (roomInBooking) {
                router.push(isAuthenticated ? '/payment-processing/user' : '/payment-processing/guest');
            } else {
                router.push('/empty');
            }
        } else if (transactionData?.data.x_response === 'Aceptada') {
            router.push(
                isAuthenticated && session.user.roles.includes('user')
                    ? '/booking'
                    : '/searchBooking'
            );
        }
    };

    if (loading) return <SkeletonStatusCheckOut />;

    return (
        <div className="text-center flex w-full justify-center md:p-4">
            {error ? (
                <div className="mt-36">
                    <div className="bg-red-500 rounded-full h-5"></div>
                    <div className="px-4">
                        <div className="bg-white border border-gray-300 -mt-3 py-3 px-4">
                            <div className="flex justify-center">
                                <MdOutlineError className="text-red-500 h-14 w-14" />
                            </div>
                            <p className="mt-3 text-xl font-bold text-red-500">Transacción fallida</p>
                            <p className="mt-5">{error}</p>
                            <p>Serás redirigido al checkout en breve</p>
                            <CountdownTimerSeconds seconds={15} onComplete={handleRedirect} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-20 md:mt-36 px-4 pb-10">
                    <div className="bg-green-500 rounded-full h-5"></div>
                    <div className="px-4">
                        <div className="bg-white border border-gray-300 -mt-3 py-3 px-4">
                            <div className="flex justify-center">
                                <IoBagCheck className="text-green-500 h-14 w-14" />
                            </div>
                            <p className="mt-3 text-md md:text-xl font-bold text-green-500">Transacción exitosa</p>
                            <p className="font-bold text-sm md:text-2xl">
                                Referencia ePayco #{transactionData?.data.x_ref_payco}
                            </p>
                            <p className="text-sm font-light">{transactionData?.data.x_fecha_transaccion}</p>

                            <div className="grid md:grid-cols-2 gap-3 mt-5">
                                <div>
                                    <p className="font-bold text-lg">Medio de pago</p>
                                    <p>{transactionData?.data.x_franchise || 'Desconocido'}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">Monto pagado</p>
                                    <p>{currencyFormat(transactionData?.data.x_amount!)}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">ID de factura</p>
                                    <p>{transactionData?.data.x_id_invoice}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">Estado de la transacción</p>
                                    <p>{transactionData?.data.x_response_reason_text}</p>
                                </div>
                            </div>

                            <p className="mt-5 text-xs md:text-md">
                                Serás redirigido al detalle de la reserva en
                            </p>
                            <CountdownTimerSeconds seconds={15} onComplete={handleRedirect} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
