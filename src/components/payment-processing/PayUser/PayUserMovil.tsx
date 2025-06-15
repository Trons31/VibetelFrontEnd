'use client';
import { getReservationByTransactionId, getTransactionIdReservation, placeReservation } from '@/actions';
import { useBookingStore } from '@/store';
import { calculateTotalPrice, currencyFormat } from '@/utils';
import Script from 'next/script';
import React, { useEffect, useState } from 'react'
import { IoBagCheck } from 'react-icons/io5';
import { MdOutlinePayment } from 'react-icons/md';


type StatusTransaction = "ACCEPTED" | "REJECTED" | "PENDING" | "FAILED"

type transactionData = {
    transactionId: string;
    total: number;
}


export const PayUserMovil = () => {

    const [loading, setLoading] = useState(true);
    const [loadingPlaceReservation, setLoadingPlaceReservation] = useState(false);
    const [loadingExistTransactionId, setLoadingExistTransactionId] = useState(true);

    const roomInBooking = useBookingStore(state => state.Booking);
    const summary = useBookingStore(state => state.getInformationSummary());


    const [statusTransaction, setStatusTransaction] = useState<StatusTransaction>("PENDING")
    const [transactionId, setTransactionId] = useState<string | null>(null);


    const { Booking } = useBookingStore(state => ({
        Booking: state.Booking,
    }));


    const [transactionData, setTransactionData] = useState<transactionData | undefined>(undefined);


    const OnPaidAndPlaceReservation = async () => {
        setLoadingPlaceReservation(true);
        const reservation = {
            roomId: Booking!.id,
            arrivalDate: Booking!.arrivalDate,
            departureDate: Booking!.departureDate,
        }
        const response = await placeReservation(reservation);
        if (response.ok) {
            setTransactionData({
                transactionId: response.transactionId,
                total: response.total
            });
            setLoadingPlaceReservation(false);
        } else {
            console.error("Error en la reserva:", response.message);
            setLoadingPlaceReservation(false);
        }

    }

    useEffect(() => {
        if (!Booking) return;
        setLoading(false);
    }, [Booking?.id])


    useEffect(() => {
        async function fetchTransactionId() {
            const cookieTransactionId = await getTransactionIdReservation();
            setTransactionId(cookieTransactionId);
            if (!cookieTransactionId) {
                setLoadingExistTransactionId(false)
            }
        }

        fetchTransactionId();
    }, []);


    useEffect(() => {
        if (transactionId) {
            // Llama a la función para obtener los datos de la transacción
            getReservationByTransactionId(transactionId)
                .then((res) => {
                    if (res.reservation.transactionId) {
                        setTransactionData({
                            transactionId: res.reservation.transactionId,
                            total: res.reservation.total
                        });
                        setStatusTransaction(res.reservation.status!)
                    } else {
                        console.error("No se encontró la transacción.");
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener la transacción:", error);
                })
                .finally(() => setLoadingExistTransactionId(false));
        }
    }, [transactionId]);

    useEffect(() => {
        let btnpay = document.getElementsByClassName('epayco-button-render');
        setTimeout(() => {
            if (btnpay[0]) {
                btnpay[0].setAttribute('id', 'pago');
            }
        }, 1000);
    }, [transactionData]);

    return (
        <div className='fixed fade-in bottom-0 z-30 w-full bg-white md:hidden px-2 shadow-2xl shadow-black rounded-t-2xl border border-t-gray-300' >
            <div className="py-2 mt-3 mb-1 flex justify-between">
                <p className="font-medium text-sm ">Total</p>
                {loading && summary
                    ? <div className='flex justify-end'>
                        <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                    </div>
                    : <p className="font-medium text-md ">{currencyFormat(calculateTotalPrice(summary.total))}</p>}
            </div>


            {
                loadingExistTransactionId
                    ? (
                        <>
                            <div className='py-4' >
                                <div className="py-3 w-full rounded-lg bg-red-600 px-6 font-medium text-white">
                                    <div className="flex-grow flex justify-center items-center">
                                        <div className="px-5" >
                                            <svg className="h-5 w-5 animate-spin text-white " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {
                                !transactionData && (
                                    <>

                                        <div>
                                            <button
                                                onClick={OnPaidAndPlaceReservation}
                                                className="mt-2 mb-2 w-full rounded-lg bg-red-600 px-6 py-3 font-medium text-white">

                                                {
                                                    loadingPlaceReservation
                                                        ? (
                                                            <>
                                                                <div className="flex-grow flex justify-center items-center">
                                                                    <div className="px-5" >
                                                                        <svg className="h-5 w-5 animate-spin text-white " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                            <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            "Confirmar reserva"
                                                        )
                                                }
                                            </button>
                                        </div>

                                    </>
                                )
                            }

                            {
                                transactionData && (
                                    statusTransaction === "ACCEPTED"
                                        ? (
                                            <>
                                                <div className='bg-purple-600 fade-in flex w-full p-2 gap-2 rounded-lg justify-center items-center text-white' >
                                                    <IoBagCheck className='text-white h-5 w-5' />
                                                    <p>Pago realizado</p>
                                                </div>
                                            </>
                                        ) : (
                                            <div className='flex w-full py-4'>
                                                <label htmlFor="pago" className='flex fade-in w-full cursor-pointer hover:bg-red-700 bg-red-600 p-2 gap-2 rounded-lg justify-center items-center text-white' >
                                                    <MdOutlinePayment className='text-white h-5 w-5' />
                                                    <p>Pagar</p>
                                                </label>

                                                <form>
                                                    <Script
                                                        src={process.env.NEXT_PUBLIC_EPAYCO_CHECKOUT_URL}
                                                        data-epayco-key={process.env.NEXT_PUBLIC_EPAYCO_KEY}
                                                        data-epayco-private-key={process.env.NEXT_PUBLIC_EPAYCO_PRIVATE_KEY}
                                                        className='epayco-button'
                                                        data-epayco-invoice={transactionData.transactionId}
                                                        data-epayco-amount={transactionData.total}
                                                        data-epayco-tax='0.00'
                                                        data-epayco-tax-ico='0.00'
                                                        data-epayco-tax-base={transactionData.total}
                                                        data-epayco-name='Test'
                                                        data-epayco-description="Description"
                                                        data-epayco-currency='cop'
                                                        data-epayco-country='CO'
                                                        data-epayco-test='true'
                                                        data-epayco-external='false'
                                                        data-epayco-response={process.env.NEXT_PUBLIC_PAYCO_RESPONSE_URL}
                                                        data-epayco-confirmation={process.env.NEXT_PUBLIC_PAYCO_CONFIRMATION_URL}
                                                        data-epayco-button='https://multimedia.epayco.co/dashboard/btns/btn3.png'
                                                        data-epayco-methodconfirmation="post"
                                                    />
                                                </form>
                                            </div>
                                        )
                                )
                            }

                        </>
                    )
            }

            <div className="flex justify-center mt-1 mb-1">
                <p className="text-xs text-center">
                    Al hacer clic en Realizar reserva aceptas <a href="#" className="underline text-blue-600">términos y condiciones</a> y <a href="#" className="underline text-blue-600">política de privacidad</a>
                </p>
            </div>
        </div>
    )
}
