'use client';

import React, { useEffect, useState } from 'react'
import { SelectOption } from '@/components';
import { Service } from '@/interfaces';
import { currencyFormat, formatTimeWithAmPm, sleep } from '@/utils';
import toast, { Toaster } from 'react-hot-toast';
import { MdNotInterested } from 'react-icons/md';

interface Props {
    service: Service;
    isTimeExtensionAvailable: boolean;
}

export const AddTimeService = ({ service, isTimeExtensionAvailable }: Props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [priceAddTime, setPriceAddTime] = useState(0);
    const [addTime, setAddTime] = useState(0);
    const [options, setOptions] = useState<{ label: string; value: number }[]>([]);

    const actuallyDepartureDate = new Date(service?.departureDate!);
    const defaultReservationAddTime = service?.ServiceItem?.room.motel.MotelConfig?.defaultReservationAddTime || 30;
    const [departureDateNew, setDepartureDateNew] = useState(new Date(service?.departureDate!));

    const updatePriceAndDate = (minutes: number) => {

        if (!actuallyDepartureDate || !defaultReservationAddTime) return;

        const priceAddTimePerInterval = service?.ServiceItem?.room.priceAddTime!;
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
        setIsLoading(false);
    }, [service]);


    const onAddTimeService = async () => {
        setButtonLoading(true);
        // const response = await addTimeService(addTime, departureDateNew, service.ServiceItem?.id!, service.ServiceItem?.roomId!);
        // if (response.ok) {
        //     toast.success(`Reserva extendida ${addTime} minutos de forma correcta`, {
        //         duration: 10000
        //     });
        //     setButtonLoading(false);
        //     await sleep(1);
        //     window.location.reload();
        // } else {
        //     toast.error(`No puedes extender la reserva ${addTime} minutos. Intenta con menos tiempo.`, {
        //         duration: 10000,
        //     });
        //     setButtonLoading(false);
        //     return;
        // }
    }

    return (
        <>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            {
                isTimeExtensionAvailable
                    ? (
                        <>
                            <div className='p-4 border rounded-lg'>
                                <div className='flex justify-end' >
                                    <p className='font-bold text-sm' >Adicionar tiempo al servicio</p>
                                </div>

                                <p className="text-md font-medium">Habitación: {service?.ServiceItem?.title} </p>
                                <p className="mb-4 text-sm text-gray-500">Hora de salida actual: {formatTimeWithAmPm(actuallyDepartureDate)}</p>

                                <div className="mb-4">
                                    <p className='font-bold text-xs text-gray-700 mb-1'>Extender tiempo</p>
                                    {
                                        !isLoading && (
                                            <SelectOption
                                                options={options}
                                                onOptionSelect={handleOptionAddTimeReservation}
                                                className='w-full'
                                                classNameSelect='bg-gray-300'
                                            />
                                        )
                                    }
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

                                <div className="flex flex-col sm:flex-row">
                                    <button
                                        onClick={onAddTimeService}
                                        className="w-full rounded-md border bg-blue-600 hover:bg-blue-600 px-8 py-2 font-medium text-white"
                                    >
                                        {
                                            buttonLoading
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
                            </div>
                        </>

                    ) : (
                        <div className='bg-gray-200 p-4 rounded-lg flex gap-2'>
                            <MdNotInterested className='text-gray-700 h-5 w-5' />
                            <p className='text-gray-700 text-sm'>
                                No es posible añadir tiempo adicional a este servicio, ya que existen otras reservas realizadas.
                            </p>
                        </div>

                    )
            }
        </>
    )
}
