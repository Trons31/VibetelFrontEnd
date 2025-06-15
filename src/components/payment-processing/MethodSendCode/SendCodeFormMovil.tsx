'use client';

import { getReservationByTransactionId, getTransactionIdReservation, placeReservation } from '@/actions';
import { ModalPopup } from '@/components';
import { useBookingStore } from '@/store';
import { calculateTotalPrice, currencyFormat } from '@/utils';
import axios from 'axios';
import clsx from 'clsx';
import Link from 'next/link';
import Script from 'next/script';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { BiSolidMessageSquareDetail } from 'react-icons/bi';
import { FaQuestionCircle } from 'react-icons/fa';
import { IoMdArrowRoundBack, IoMdMail } from 'react-icons/io';
import { IoBagCheck } from 'react-icons/io5';
import { MdOutlinePayment } from 'react-icons/md';

type viewControl = "methods" | "sms" | "mail" | "";

type StatusTransaction = "ACCEPTED" | "REJECTED" | "PENDING" | "FAILED"

type FormInput = {
    phoneNumber: string
    mail: string;
}

type transactionData = {
    transactionId: string;
    total: number;
}

export const SendCodeFormMovil = () => {
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();
    const [isModalOpenAccessCode, setIsModalAccessCode] = useState(false);
    const [loadingExistTransactionId, setLoadingExistTransactionId] = useState(true);
    const [statusTransaction, setStatusTransaction] = useState<StatusTransaction>("PENDING")
    const [isLoadingPay, setIsLoadingPay] = useState(false);

    const [showMethodsSendCode, setShowMethodsSendCode] = useState<viewControl>("");
    const roomInBooking = useBookingStore(state => state.Booking);
    const summary = useBookingStore(state => state.getInformationSummary());

    const [transactionId, setTransactionId] = useState<string | null>(null);
    const [transactionData, setTransactionData] = useState<transactionData | undefined>(undefined);

    const OnPaidAndPlaceReservation = async (data: FormInput) => {
        setIsLoadingPay(true);
        const reservation = {
            roomId: roomInBooking!.id,
            arrivalDate: roomInBooking!.arrivalDate,
            departureDate: roomInBooking!.departureDate,
            mail: data.mail ? data.mail : undefined,
            phoneNumber: data.phoneNumber ? data.phoneNumber : undefined
        }
        const response = await placeReservation(reservation);
        if (response.ok) {
            setTransactionData({
                transactionId: response.transactionId,
                total: response.total
            });
        } else {
            console.error("Error en la reserva:", response.message);
        }

    }


    useEffect(() => {
        if (!summary) return;
        setLoading(false);
    }, [roomInBooking?.id, summary.total])


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

        <>

            {
                showMethodsSendCode !== "" && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20"
                    />
                )
            }

            <div className='fixed fade-in bottom-0 z-30 w-full bg-white md:hidden px-2 shadow-2xl shadow-black rounded-t-2xl border border-t-gray-300' >
                <div className="mt-2 py-2 mb-1 flex justify-between">
                    <p className="font-medium text-sm ">Total</p>
                    {loading && summary
                        ? <div className='flex justify-end'>
                            <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                        </div>
                        : <p className="font-medium text-md ">{currencyFormat(summary.total)}</p>}
                </div>

                <div className='flex gap-1' >
                    <p className='py-1 text-gray-600 text-xs' >
                        {
                            showMethodsSendCode === ""
                                ? "Metodo de envio "
                                : (
                                    showMethodsSendCode === "methods"
                                        ? "Metodos de envio SMS o correo electronico"
                                        : `Metodo de envio seleccionado ${showMethodsSendCode}`
                                )
                        }
                    </p>
                    <button
                        type="button"
                        onClick={() => setIsModalAccessCode(true)}
                    >
                        <FaQuestionCircle />
                    </button>
                    <ModalPopup
                        title="¿Qué es el código de acceso a la reserva anónima?"
                        isOpen={isModalOpenAccessCode}
                        onClose={() => setIsModalAccessCode(false)}
                    >
                        <div>
                            <p className="font-bold">Información Importante sobre el Código de Acceso</p>
                            <p className="mt-2 font-light">
                                El código de acceso a la reserva anónima es un código único que se enviará al usuario a través del método de envío que seleccione, ya sea por SMS o correo electrónico.
                                Este código le permitirá acceder fácilmente a los detalles de su reserva anónima.
                            </p>
                            <p className="mt-2 font-light">
                                Una vez recibido el código, el usuario podrá ingresar a la página de <Link href="/searchBooking" className="font-semibold underline" target="_blank" rel="noopener noreferrer">reserva anónima</Link> y revisar todos los detalles de su reserva, garantizando su privacidad y facilitando el proceso de acceso.
                            </p>
                        </div>
                    </ModalPopup>
                </div>

                {
                    loadingExistTransactionId
                        ? (
                            <>
                                <div className='py-4' >
                                    <div className="py-3 w-full rounded-full bg-red-600 px-6 font-medium text-white">
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
                                            {
                                                showMethodsSendCode === "methods" && (
                                                    <div className='mt-2 fade-in space-y-2 mb-2'>

                                                        <button
                                                            onClick={() => setShowMethodsSendCode("")}
                                                        >
                                                            <IoMdArrowRoundBack className='h-5 w-5 hover:text-gray-900 text-gray-600' />
                                                        </button>

                                                        <button
                                                            onClick={() => setShowMethodsSendCode("sms")}
                                                            className='bg-white border w-full border-red-600 text-red-600 p-2 rounded-lg text-center
                                      hover:bg-red-600 hover:text-white transition-all duration-300' >
                                                            SMS
                                                        </button>

                                                        <button
                                                            onClick={() => setShowMethodsSendCode("mail")}
                                                            className='bg-white border w-full border-red-600 text-red-600 p-2 rounded-lg text-center
                                      hover:bg-red-600 hover:text-white transition-all duration-300' >
                                                            Correo electronico
                                                        </button>
                                                    </div>
                                                )
                                            }


                                            <form onSubmit={handleSubmit(OnPaidAndPlaceReservation)}  >
                                                {
                                                    showMethodsSendCode === "mail" && (
                                                        <div className='fade-in' >
                                                            <div className='flex justify-between items-center py-2 px-1'>
                                                                <button
                                                                    onClick={() => setShowMethodsSendCode("methods")}
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
                                                    showMethodsSendCode === "sms" && (
                                                        <div className='fade-in' >
                                                            <div className='flex justify-between items-center py-2 px-1'>
                                                                <button
                                                                    onClick={() => setShowMethodsSendCode("methods")}
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

                                                {
                                                    showMethodsSendCode !== "" && showMethodsSendCode !== "methods" && (
                                                        <button
                                                            type='submit'
                                                            className="mt-2 mb-2 w-full rounded-lg bg-red-600 px-6 py-3 font-medium text-white">

                                                            {
                                                                isLoadingPay
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
                                                    )
                                                }

                                            </form>

                                            {
                                                showMethodsSendCode === "" && (

                                                    <button
                                                        onClick={() => setShowMethodsSendCode("methods")}
                                                        disabled={loading}
                                                        className="mt-2 fade-in mb-2 w-full rounded-lg bg-red-600 px-6 py-3 font-medium text-white">
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

                                                                    "Selecione un metodo de envio"
                                                                )
                                                        }
                                                    </button>
                                                )
                                            }
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
        </>
    )
}
