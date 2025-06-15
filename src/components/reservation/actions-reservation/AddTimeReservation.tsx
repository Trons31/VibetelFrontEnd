'use client';

import React, { useState, useEffect } from 'react';
import { addTimeReservation, getAddTimeReservationByTransactionId, getTransactionIdAddTimeReservation } from '@/actions';
import { SelectOption } from '@/components';
import { Reservation } from '@/interfaces/reservation.interface';
import { currencyFormat, formatTimeWithAmPm, sleep } from '@/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Script from 'next/script';
import toast, { Toaster } from 'react-hot-toast';
import { IoAlertCircleSharp, IoBagCheck, IoCloseOutline } from 'react-icons/io5';
import { MdOutlinePayment } from 'react-icons/md';

interface Props {
    isAviable: boolean;
    reservation: Reservation;
    isOpen: boolean;
    onClose: () => void;
}

type StatusTransaction = "ACCEPTED" | "REJECTED" | "PENDING" | "FAILED"

type transactionData = {
    idReservation?: string;
    transactionId: string;
    total: number;
}

export const AddTimeReservation = ({ reservation, isOpen, onClose, isAviable }: Props) => {

    const { data: session } = useSession();

    const [showLoading, setShowLoading] = useState(false);
    const [priceAddTime, setPriceAddTime] = useState(0);
    const [departureDateNew, setDepartureDateNew] = useState(new Date(reservation.departureDate));
    const [addTime, setAddTime] = useState(0);
    const [options, setOptions] = useState<{ label: string; value: number }[]>([]);

    const actuallyDepartureDate = new Date(reservation.departureDate);
    const defaultReservationAddTime = reservation.ServiceItem?.room.motel.MotelConfig?.defaultReservationAddTime || 30;

    const [transactionData, setTransactionData] = useState<transactionData | undefined>(undefined);
    const [statusTransaction, setStatusTransaction] = useState<StatusTransaction>("PENDING")
    const [transactionId, setTransactionId] = useState<string | null>(null);
    const [loadingExistTransactionId, setLoadingExistTransactionId] = useState(true);

    const updatePriceAndDate = (minutes: number) => {
        const priceAddTimePerInterval = reservation.ServiceItem?.room.priceAddTime!;
        const numIntervals = Math.ceil(minutes / defaultReservationAddTime);
        setPriceAddTime(priceAddTimePerInterval * numIntervals);

        const newDepartureDate = new Date(actuallyDepartureDate);
        newDepartureDate.setMinutes(newDepartureDate.getMinutes() + minutes);
        setDepartureDateNew(newDepartureDate);
    };

    const handleOptionAddTimeReservation = (option: { label: string; value: number }) => {
        setAddTime(option.value);
        updatePriceAndDate(option.value);
    };

    const onUpdateDepartureDate = async () => {
        setShowLoading(true);
        const response = await addTimeReservation(addTime, departureDateNew, reservation.ServiceItem?.id!, reservation.ServiceItem?.roomId!);
        setShowLoading(false);

        if (response.ok && response.data) {
            setTransactionData({
                transactionId: response.data?.transactionId,
                total: response.data?.total,
                idReservation: response.data.reservationId
            });
        } else {
            toast.error(`No puedes extender la reserva ${addTime} minutos. Intenta con menos tiempo.`, {
                duration: 10000,
            });
            return;
        }

        toast.success(`Reserva extendida ${addTime} minutos de forma correcta`, {
            duration: 10000
        });

        await sleep(1);

        window.location.reload();
    };

    useEffect(() => {
        const newOptions: { label: string; value: number }[] = [];
        const maxMinutes = 180; // 3 horas
        const interval = defaultReservationAddTime;

        for (let i = interval; i <= maxMinutes; i += interval) {
            const hours = Math.floor(i / 60);
            const minutes = i % 60;
            const label = `${hours > 0 ? `${hours} hora${hours > 1 ? 's' : ''}` : ''}${hours > 0 && minutes > 0 ? ' y ' : ''}${minutes > 0 ? `${minutes} minuto${minutes > 1 ? 's' : ''}` : ''}`;
            newOptions.push({ label, value: i });
        }

        setOptions(newOptions);
        setAddTime(interval); // Valor inicial del tiempo añadido
        updatePriceAndDate(interval);
    }, []);


    useEffect(() => {
        async function fetchTransactionId() {
            const cookieTransactionId = await getTransactionIdAddTimeReservation();
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
            getAddTimeReservationByTransactionId(transactionId)
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
        if (isOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }

        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, [isOpen]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!showLoading && e.target === e.currentTarget) {
            onClose();
        }
    };

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
            <Toaster position="top-right" reverseOrder={false} />
            <div className='flex md:hidden' >
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='fixed inset-0 z-30 flex items-end md:items-center bg-black bg-opacity-50 backdrop-blur-sm'
                            onClick={handleBackdropClick}
                        >
                            <div className="mx-auto flex w-full md:w-[400px] flex-col">
                                <button
                                    onClick={onClose}
                                    className='bg-purple-600 p-2 flex justify-between items-center rounded-t-lg hover:bg-purple-700 transition-all duration-200'
                                >
                                    <p className='text-white font-bold'>Extender el tiempo de reserva</p>
                                    <IoCloseOutline className='h-6 w-5 text-white' />
                                </button>
                                <div className='p-4 border-l bg-white border-l-gray-200 border-r border-r-gray-200 border-b border-b-gray-200 '>
                                    {
                                        isAviable
                                            ? (
                                                <>
                                                    <p className="text-md font-medium">Habitación: {reservation.ServiceItem?.title} </p>
                                                    <p className="mb-4 text-sm text-gray-500">Hora de salida actual: {formatTimeWithAmPm(actuallyDepartureDate)}</p>

                                                    <div className="mb-4">
                                                        <p className='font-bold text-xs text-gray-700 mb-1'>Extender tiempo</p>
                                                        <SelectOption
                                                            options={options}
                                                            onOptionSelect={handleOptionAddTimeReservation}
                                                            className='w-full'
                                                            classNameSelect='bg-gray-300'
                                                        />
                                                    </div>

                                                    <div>
                                                        <p className='text-sm text-gray-500'>Nueva hora de salida: {formatTimeWithAmPm(departureDateNew)}</p>
                                                    </div>

                                                    <div className='flex justify-between items-center'>
                                                        <p className='font-bold text-md'>
                                                            Total:
                                                        </p>
                                                        <p className='text-lg'>
                                                            {currencyFormat(priceAddTime)}
                                                        </p>
                                                    </div>

                                                    {
                                                        loadingExistTransactionId
                                                            ? (
                                                                <>
                                                                    <div className="flex flex-col sm:flex-row">
                                                                        <div
                                                                            className="w-full rounded-md border bg-purple-600 px-8 py-2 font-medium text-white"
                                                                        >
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
                                                                            <div className="flex flex-col sm:flex-row">
                                                                                <button
                                                                                    onClick={onUpdateDepartureDate}
                                                                                    className="w-full rounded-md border bg-purple-600 hover:bg-purple-600 px-8 py-2 font-medium text-white"
                                                                                >
                                                                                    {
                                                                                        showLoading
                                                                                            ? (
                                                                                                <div className="flex-grow flex justify-center items-center">
                                                                                                    <div className="px-5" >
                                                                                                        <svg className="h-5 w-5 animate-spin text-white " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                                                            <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                                                                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                                                        </svg>
                                                                                                    </div>
                                                                                                </div>
                                                                                            ) : (

                                                                                                "Confirmar"
                                                                                            )
                                                                                    }
                                                                                </button>
                                                                            </div>
                                                                        )
                                                                    }


                                                                    {
                                                                        transactionData && (
                                                                            statusTransaction === "ACCEPTED"
                                                                                ? (
                                                                                    <>
                                                                                        <div className='bg-green-600 p-2 flex gap-2 rounded-lg justify-center items-center text-white' >
                                                                                            <IoBagCheck className='text-white h-5 w-5' />
                                                                                            <p>Pago realizado</p>
                                                                                        </div>
                                                                                    </>
                                                                                ) : (
                                                                                    <div className='flex w-full py-4'>
                                                                                        <label htmlFor="pago" className='flex w-full fade-in cursor-pointer bg-purple-600 hover:bg-purple-600 p-2 gap-2 rounded-lg justify-center items-center text-white' >
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
                                                                                                data-epayco-response={session?.user.roles.includes("user") ? `https://vibetel.vercel.app/booking/${transactionData.idReservation}` : "https://vibetel.vercel.app/searchBooking"}
                                                                                                data-epayco-confirmation="https://vibetel.vercel.app/api/epayco/addTimeConfirmReservation"
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
                                            ) : (
                                                <>
                                                    <div className='flex justify-center'>
                                                        <div className='p-2 bg-blue-100 rounded-lg'>
                                                            <IoAlertCircleSharp size={32} className='text-blue-600' />
                                                        </div>
                                                    </div>

                                                    <p className="mt-2 text-center text-blue-600 text-sm md:text-lg">
                                                        Esta opción no está disponible
                                                    </p>
                                                    <p className="mt-1 text-center text-gray-600 text-xs md:text-sm">
                                                        Estará disponible únicamente durante el periodo de la reserva, es decir, cuando se haya iniciado y antes de finalizar.
                                                    </p>

                                                </>
                                            )
                                    }

                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className='hidden md:flex' >
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='fixed inset-0 z-30 flex items-center justify-end bg-black bg-opacity-50 backdrop-blur-sm'
                            onClick={handleBackdropClick}
                        >
                            <div className="bg-white w-4/12 h-screen">
                                <button
                                    onClick={onClose}
                                    className='bg-purple-600 w-full p-2 flex justify-between items-center hover:bg-purple-700 transition-all duration-200'
                                >
                                    <p className='text-white font-bold'>Extender el tiempo de reserva</p>
                                    <IoCloseOutline className='h-6 w-5 text-white' />
                                </button>

                                <div className='p-4 border-l border-l-gray-200 border-r border-r-gray-200 border-b border-b-gray-200 '>

                                    {
                                        isAviable
                                            ? (
                                                <>
                                                    <p className="text-md font-medium">Habitación: {reservation.ServiceItem?.title} </p>
                                                    <p className="mb-4 text-sm text-gray-500">Hora de salida actual: {formatTimeWithAmPm(actuallyDepartureDate)}</p>

                                                    <div className="mb-4">
                                                        <p className='font-bold text-xs text-gray-700 mb-1'>Extender tiempo</p>
                                                        <SelectOption
                                                            options={options}
                                                            onOptionSelect={handleOptionAddTimeReservation}
                                                            className='w-full'
                                                            classNameSelect='bg-gray-300'
                                                        />
                                                    </div>

                                                    <div>
                                                        <p className='text-sm text-gray-500'>Nueva hora de salida: {formatTimeWithAmPm(departureDateNew)}</p>
                                                    </div>

                                                    <div className='flex justify-between items-center'>
                                                        <p className='font-bold text-md'>
                                                            Total:
                                                        </p>
                                                        <p className='text-lg'>
                                                            {currencyFormat(priceAddTime)}
                                                        </p>
                                                    </div>

                                                    {
                                                        loadingExistTransactionId
                                                            ? (
                                                                <>
                                                                    <div className="flex flex-col sm:flex-row">
                                                                        <div
                                                                            className="w-full rounded-md border bg-purple-600  px-8 py-2 font-medium text-white"
                                                                        >
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
                                                                            <div className="flex flex-col sm:flex-row">
                                                                                <button
                                                                                    onClick={onUpdateDepartureDate}
                                                                                    className="w-full rounded-md border bg-purple-600 hover:bg-purple-600 px-8 py-2 font-medium text-white"
                                                                                >
                                                                                    {
                                                                                        showLoading
                                                                                            ? (
                                                                                                <div className="flex-grow flex justify-center items-center">
                                                                                                    <div className="px-5" >
                                                                                                        <svg className="h-5 w-5 animate-spin text-white " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                                                            <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                                                                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                                                        </svg>
                                                                                                    </div>
                                                                                                </div>
                                                                                            ) : (

                                                                                                "Confirmar"
                                                                                            )
                                                                                    }
                                                                                </button>
                                                                            </div>
                                                                        )
                                                                    }


                                                                    {
                                                                        transactionData && (
                                                                            statusTransaction === "ACCEPTED"
                                                                                ? (
                                                                                    <>
                                                                                        <div className='bg-green-600 p-2 flex gap-2 rounded-lg justify-center items-center text-white' >
                                                                                            <IoBagCheck className='text-white h-5 w-5' />
                                                                                            <p>Pago realizado</p>
                                                                                        </div>
                                                                                    </>
                                                                                ) : (
                                                                                    <div className='flex w-full mt-1'>
                                                                                        <label htmlFor="pago" className='flex w-full fade-in cursor-pointer bg-purple-600 hover:bg-purple-600 p-2 gap-2 rounded-lg justify-center items-center text-white' >
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
                                                                                                data-epayco-response={session?.user.roles.includes("user") ? `https://vibetel.vercel.app/booking/${transactionData.idReservation}` : "https://vibetel.vercel.app/searchBooking"}
                                                                                                data-epayco-confirmation="https://vibetel.vercel.app/api/epayco/addTimeConfirmReservation"
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
                                            ) : (
                                                <>
                                                    <div className='flex justify-center'>
                                                        <div className='p-2 bg-blue-100 rounded-lg'>
                                                            <IoAlertCircleSharp size={32} className='text-blue-600' />
                                                        </div>
                                                    </div>

                                                    <p className="mt-2 text-center text-blue-600 text-sm md:text-lg">
                                                        Esta opción no está disponible
                                                    </p>
                                                    <p className="mt-1 text-center text-gray-600 text-xs md:text-sm">
                                                        Estará disponible únicamente durante el periodo de la reserva, es decir, cuando se haya iniciado y antes de finalizar.
                                                    </p>

                                                </>
                                            )
                                    }


                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};
