'use client';
import React, { useEffect, useState } from 'react'
import Script from 'next/script';
import { useBookingStore } from '@/store';
import { IoBagCheck } from 'react-icons/io5';
import { MdOutlinePayment } from 'react-icons/md';
import { redirect, usePathname } from 'next/navigation';
import axios from 'axios';
import { PaymentStatus } from '@/interfaces/reservation.interface';


type transactionData = {
    id: string;
    transactionId: string;
    total: number;
    mail?: string;
    phoneNumber?: string;
}

export const PayUser = () => {

    const [loading, setLoading] = useState(true);
    const [loadingExistTransactionId, setLoadingExistTransactionId] = useState(true);


    const [statusTransaction, setStatusTransaction] = useState<PaymentStatus>("accepted")
    const [tokenTransaction, setTokenTransaction] = useState<string | null>(null);


    const { Booking } = useBookingStore(state => ({
        Booking: state.Booking,
    }));


    const [transactionData, setTransactionData] = useState<transactionData | undefined>(undefined);

    const pathName = usePathname();
    const [redirectUrl, setRedirectUrl] = useState("/home");

    useEffect(() => {
        const storedRedirectUrl = localStorage.getItem("redirectUrl");
        if (storedRedirectUrl) {
            setRedirectUrl(storedRedirectUrl);
        }
    }, [pathName]);

    const decodeToken = (encodedToken: string): string => {
        try {
            return atob(encodedToken); // Decodifica de Base64
        } catch (e) {
            console.error("Error al decodificar el token:", e);
            return encodedToken; // Retorna sin decodificar si hay un error
        }
    };

    useEffect(() => {
        if (!Booking) return;
        setLoading(false);
    }, [Booking?.id])


    useEffect(() => {
        async function fetchTokenTransaction() {
            setLoadingExistTransactionId(true);
            if (typeof window !== 'undefined') {
                const storedEncodedToken = localStorage.getItem("persist-token-reservation");
                if (storedEncodedToken) {
                    const decodedToken = decodeToken(storedEncodedToken);
                    setTokenTransaction(decodedToken);
                }
            }
            setLoadingExistTransactionId(false);
        }
        fetchTokenTransaction();
    }, []);


    useEffect(() => {

        async function fetchTransaction() {
            if (tokenTransaction) {
                try {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_ROUTE}service/by-reservation-token/${tokenTransaction}`
                    );

                    if (response.data.isConfirmed === true) {
                        setTransactionData({
                            id: response.data.id,
                            transactionId: response.data.transactionId,
                            total: response.data.total,
                            mail: response.data.mail,
                            phoneNumber: response.data.phoneNumber,
                        });
                        if (response.data.paymentStatus === "accepted") {
                            redirect("/empty");
                        } else {
                            setStatusTransaction(response.data.paymentStatus)
                        }
                    } else {
                        redirect(redirectUrl);
                    }

                } catch (error: any) {
                    localStorage.removeItem("persist-token-reservation");
                } finally {
                    setLoadingExistTransactionId(false)
                }
            }


        }

        fetchTransaction();
    }, [tokenTransaction]);



    useEffect(() => {
        let btnpay = document.getElementsByClassName('epayco-button-render');
        setTimeout(() => {
            if (btnpay[0]) {
                btnpay[0].setAttribute('id', 'pago');
            }
        }, 1000);
    }, [transactionData]);

    return (
        <>

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
                                transactionData && (
                                    statusTransaction === "accepted"
                                        ? (
                                            <div className='flex w-full py-4' >
                                                <div className='bg-purple-600 p-2 flex w-full gap-2 rounded-lg justify-center items-center text-white' >
                                                    <IoBagCheck className='text-white h-5 w-5' />
                                                    <p>Pago realizado</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='flex w-full py-4'>
                                                <label htmlFor="pago" className='flex w-full fade-in cursor-pointer hover:bg-red-700 bg-red-600 p-2 gap-2 rounded-lg justify-center items-center text-white' >
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
                                                        data-epayco-description="Reserva de habitacion"
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

        </>
    )
}
