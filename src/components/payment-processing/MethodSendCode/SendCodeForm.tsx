'use client';
import React, { useEffect, useState } from 'react'
import Script from 'next/script';
import { useBookingStore } from '@/store';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { BiSolidMessageSquareDetail } from 'react-icons/bi';
import { IoMdArrowRoundBack, IoMdMail } from 'react-icons/io';
import { IoBagCheck } from 'react-icons/io5';
import { MdOutlinePayment } from 'react-icons/md';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { PaymentStatus } from '@/interfaces/reservation.interface';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type MethodSend = "sms" | "mail" | "";


type FormInput = {
    phoneNumber: string
    mail: string;
}

type transactionData = {
    id: string;
    transactionId: string;
    total: number;
    mail?: string;
    phoneNumber?: string;
}

export const SendCodeForm = () => {

    const [loading, setLoading] = useState(true);
    const [selectedMethodSend, setSelectedMethodSend] = useState<MethodSend>("");
    const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();
    const [loadingExistTransactionId, setLoadingExistTransactionId] = useState(true);

    const [statusTransaction, setStatusTransaction] = useState<PaymentStatus>("pending")
    const [tokenTransaction, setTokenTransaction] = useState<string | null>(null);


    const { Booking, } = useBookingStore(state => ({
        Booking: state.Booking,
    }));

    const pathName = usePathname();
    const [redirectUrl, setRedirectUrl] = useState("/home");

    useEffect(() => {
        const storedRedirectUrl = localStorage.getItem("redirectUrl");
        if (storedRedirectUrl) {
            setRedirectUrl(storedRedirectUrl);
        }
    }, [pathName]);

    const router = useRouter();
    const { data: session, status } = useSession();
    const isAuthenticated = !!session?.user;


    const [transactionData, setTransactionData] = useState<transactionData | undefined>(undefined);

    console.log(transactionData);

    const decodeToken = (encodedToken: string): string => {
        try {
            return atob(encodedToken); // Decodifica de Base64
        } catch (e) {
            console.error("Error al decodificar el token:", e);
            return encodedToken; // Retorna sin decodificar si hay un error
        }
    };


    const OnPaidAndUpdateReservation = async (data: FormInput) => {

        setLoading(true);
        const reservation = {
            mail: data.mail ? data.mail : undefined,
            phoneNumber: data.phoneNumber ? data.phoneNumber : undefined
        }

        try {
            await axios.patch(
                `${process.env.NEXT_PUBLIC_API_ROUTE}service/reservation/${transactionData?.id}/contact`, reservation
            );

            setTransactionData(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    mail: data.mail || reservation.mail,
                    phoneNumber: data.phoneNumber || reservation.phoneNumber
                };
            });

            toast.success("Realiza el pago para completar la reserva");
            setLoading(false);
        } catch (error: any) {
            console.error("Error en la reserva:", error);
            toast.error("Error realiaron una reserva en este horario antes que tu.");
            setLoading(false);
        }

    }

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
                        setStatusTransaction(response.data.paymentStatus)
                    } else {
                        router.push(redirectUrl);
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
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

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
                                (!transactionData?.mail && !transactionData?.phoneNumber) && (
                                    <>
                                        <div className='fade-in mt-2 space-y-2' >
                                            {
                                                selectedMethodSend === "" && (
                                                    <>
                                                        <button
                                                            onClick={() => setSelectedMethodSend("sms")}
                                                            className='bg-white border w-full border-red-600 text-red-600 p-2 rounded-lg text-center
                              hover:bg-red-600 hover:text-white transition-all duration-300' >
                                                            SMS
                                                        </button>

                                                        <button
                                                            onClick={() => setSelectedMethodSend("mail")}
                                                            className='bg-white border w-full border-red-600 text-red-600 p-2 rounded-lg text-center
                              hover:bg-red-600 hover:text-white transition-all duration-300' >
                                                            Correo electronico
                                                        </button>
                                                    </>
                                                )
                                            }
                                        </div>

                                        <form onSubmit={handleSubmit(OnPaidAndUpdateReservation)}  >
                                            {
                                                selectedMethodSend === "mail" && (
                                                    <div >
                                                        <div className='flex fade-in justify-between items-center py-2 px-1'>
                                                            <button
                                                                onClick={() => setSelectedMethodSend("")}
                                                            >
                                                                <IoMdArrowRoundBack className='h-5 w-5 hover:text-gray-900 text-gray-600' />
                                                            </button>
                                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Correo electronico</label>
                                                        </div>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                                                <IoMdMail className='text-gray-600 h-5 w-5' />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className={
                                                                    clsx(
                                                                        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-4 focus:outline-none focus:border-blue-500 focus:border-2",
                                                                        {
                                                                            "focus:border-red-600": errors.mail
                                                                        }
                                                                    )
                                                                }
                                                                {...register('mail', { required: true, pattern: /^(?=.{1,254}$)(?:(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(?:"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*"))@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/ })}
                                                                placeholder='alguien@example.com'
                                                            />
                                                        </div>

                                                        {
                                                            errors.mail?.type === 'required' && (
                                                                <span className="text-red-500 text-sm" >* Ingrese un correo electronico</span>
                                                            )
                                                        }

                                                        {
                                                            errors.mail?.type === 'pattern' && (
                                                                <span className="text-red-500 text-sm" >* Ingrese un correo electronico valido</span>
                                                            )
                                                        }
                                                        <p className="mt-2 text-xs text-gray-500">Enviaremos el código de acceso para la reserva anónima a este correo electronico.</p>
                                                    </div>
                                                )
                                            }

                                            {
                                                selectedMethodSend === "sms" && (
                                                    <div >
                                                        <div className='flex fade-in justify-between items-center py-2 px-1'>
                                                            <button
                                                                onClick={() => setSelectedMethodSend("")}
                                                            >
                                                                <IoMdArrowRoundBack className='h-5 w-5 hover:text-gray-900 text-gray-600' />
                                                            </button>
                                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Numero de telefono</label>
                                                        </div>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                                                <BiSolidMessageSquareDetail className='text-gray-600 h-5 w-5' />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className={
                                                                    clsx(
                                                                        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-4 focus:outline-none focus:border-blue-500 focus:border-2",
                                                                        {
                                                                            "focus:border-red-600": errors.phoneNumber
                                                                        }
                                                                    )
                                                                }
                                                                {...register('phoneNumber', { required: true, pattern: /^(?:\+57)?[ -]?[1-9]\d{2}[ -]?\d{3}[ -]?\d{4}$/ })}
                                                                placeholder='xxx xxx xxxx'
                                                            />
                                                        </div>

                                                        {
                                                            errors.phoneNumber?.type === 'required' && (
                                                                <span className="text-red-500 text-xs" >* Ingrese un numero de telefono</span>
                                                            )
                                                        }


                                                        {
                                                            errors.phoneNumber?.type === 'pattern' && (
                                                                <span className="text-red-500 text-xs" >* El numero de telefono debe ser valido</span>
                                                            )
                                                        }
                                                        <p className="mt-2 text-xs text-gray-500">Enviaremos el código de acceso para la reserva anónima a este número de teléfono.</p>
                                                    </div>
                                                )
                                            }


                                            <button
                                                type='submit'
                                                disabled={selectedMethodSend === "" || loading}
                                                className="mt-2 mb-2 w-full rounded-lg bg-red-600 px-6 py-3 font-medium text-white">
                                                {
                                                    loading
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
                                                            selectedMethodSend === ""
                                                                ? "Selecione un metodo de envio"
                                                                : "Confirmar reserva"
                                                        )
                                                }
                                            </button>

                                        </form>
                                    </>
                                )
                            }



                            {
                                (transactionData?.mail || transactionData?.phoneNumber) && (
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
