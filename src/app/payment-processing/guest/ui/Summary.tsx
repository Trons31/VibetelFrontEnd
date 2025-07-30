'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { registerLocale } from "react-datepicker";
import { es } from 'date-fns/locale/es';
registerLocale('es', es);

import { useBookingStore } from '@/store'
import { calculateFees, calculateTotalPrice, currencyFormat } from '@/utils';
import { BsBagCheck } from 'react-icons/bs';
import { LuShieldCheck } from 'react-icons/lu';
import { FaQuestionCircle } from 'react-icons/fa';
import { ModalPopup, SendCodeForm, SendCodeFormMovil } from '@/components';


export const Summary = () => {
    const [loading, setLoading] = useState(true);
    const [isModalOpenAccessCode, setIsModalAccessCode] = useState(false);
    const [modalInfoTaxVibeTel, setModalInfoTaxVibeTel] = useState(false);

    const roomInBooking = useBookingStore(state => state.Booking);
    const summary = useBookingStore(state => state.getInformationSummary());

    const { platformFee, epaycoFeeWithIVA, totalFees } = calculateFees(summary.promPrice ? summary.promPrice : summary.price);

    useEffect(() => {
        if (!roomInBooking?.id) return;
        setLoading(false);
    }, [roomInBooking?.id])

    if (!roomInBooking) return null;

    return (
        <>

            <div className="bg-white w-full md:rounded-md px-4 md:px-4 py-3">
                <div>
                    <p className="font-bold text-lg">Resumen</p>

                    {
                        loading && summary
                            ? (
                                <>
                                    <div className='flex justify-between'>
                                        <div className="w-24 h-4  bg-gray-400 rounded-full animate-pulse"></div>
                                        <div className="w-24 h-4  bg-gray-400 rounded-full animate-pulse"></div>
                                    </div>

                                    <div className='flex justify-between mt-2'>
                                        <div className="w-24 h-4  bg-gray-400 rounded-full animate-pulse"></div>
                                        <div className="w-24 h-4  bg-gray-400 rounded-full animate-pulse"></div>
                                    </div>

                                </>
                            ) : (
                                roomInBooking?.promoActive && roomInBooking?.promoActive !== undefined
                                    ? (
                                        <>
                                            <div className="mt-2 flex justify-between">
                                                <p className="font-medium text-gray-600">Precio</p>
                                                {loading && summary
                                                    ? <div className='flex justify-end'>
                                                        <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                                                    </div>
                                                    : <p className="font-medium text-gray-600">{currencyFormat(roomInBooking.price)}</p>}
                                            </div>
                                            <div className="mt-2 flex justify-between">
                                                <p className="font-medium text-gray-600">Promocion</p>
                                                {loading && summary
                                                    ? <div className='flex justify-end'>
                                                        <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                                                    </div>
                                                    : <p className="font-medium text-gray-600">{currencyFormat(roomInBooking.promoprice!)}</p>}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="mt-2 flex justify-between">
                                                <p className="font-medium text-gray-600">Precio</p>
                                                {loading && summary
                                                    ? <div className='flex justify-end'>
                                                        <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                                                    </div>
                                                    : <p className="font-medium text-gray-600">{currencyFormat(summary.price)}</p>}
                                            </div>
                                        </>
                                    )
                            )
                    }

                </div>

                <div className="mt-4 mb-2 border border-gray-400 border-dashed" />

                <div className="mt-2 flex justify-between">
                    <p className="font-medium text-lg text-gray-900">Total</p>
                    {loading && summary
                        ? <div className='flex justify-end'>
                            <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                        </div>
                        : <p className="font-medium text-lg text-gray-900">{currencyFormat(summary.total)}</p>}
                </div>

                <div className='mt-4 hidden md:block' >
                    <div className='flex gap-2' >
                        <p className='text-sm text-gray-800' >Codigo de acceso</p>
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
                    <p className='text-gray-600 text-xs mt-1' >El código de acceso, enviado por corre o o SMS, permite al usuario ver los detalles de su reserva anónima en la página <Link href="/searchBooking" className='underline text-gray-900 font-semibold' target="_blank" rel="noopener noreferrer">reserva anonima</Link>.</p>
                </div>

                <div className='hidden md:block' >
                    <SendCodeForm />
                </div>

                <div className="hidden md:flex justify-center mt-1 mb-3">
                    <p className="text-xs text-center">
                        Al hacer clic en Realizar reserva aceptas <a href="#" className="underline text-blue-600">términos y condiciones</a> y <a href="#" className="underline text-blue-600">política de privacidad</a>
                    </p>
                </div>
            </div>


            <div className='bg-white md:rounded-sm py-3 mt-6' >
                <div className='px-4' >
                    <div className='flex gap-3 items-center' >
                        <LuShieldCheck className='h-5 w-5' />
                        <p className='font-bold text-lg' >Pagos seguros</p>
                    </div>
                    <div className='mt-2' >
                        <p className="text-sm font-light text-gray-600" style={{ textAlign: 'justify' }}>
                            En VibeTel, contamos con un sistema de pagos seguro respaldado por <span className='text-blue-800' >epayco.com</span>, para que puedas reservar con tranquilidad. Además, tus datos personales están protegidos en todo momento.
                        </p>

                    </div>
                </div>
                <div className='ml-4 mt-2 bg-black p-2 rounded-lg w-fit' >
                    <Image
                        src="/app/epayco.png"
                        width={70}
                        height={70}
                        alt='epayco'
                    />
                </div>

                <div className='px-4 py-3' >
                    <hr />
                </div>

                <div className='px-4 mb-10' >
                    <div className='flex gap-3 items-center' >
                        <BsBagCheck className='h-5 w-5' />
                        <p className='font-bold text-lg' >Seguridad & Privacidad</p>
                    </div>
                    <div className='mt-2 ml-6' >
                        <ul className="list-disc block md:flex gap-7 text-gray-600  text-sm">
                            <li>Pagos seguros</li>
                            <li>Datos personales seguros</li>
                        </ul>
                    </div>
                </div>

            </div>

            <SendCodeFormMovil />

        </>
    )
}
