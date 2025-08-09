'use client';
import React, { useEffect, useState } from 'react';
import { ReservationApi } from '@/interfaces/reservation.interface';
import { formatDateWithHours, formatTime } from '@/utils';

interface Props {
    reservation: ReservationApi;
}

export const UserReservationTracker = ({ reservation }: Props) => {
    const [addTimes, setAddTimes] = useState<
        {
            id: string;
            addTimeReservation: number;
            newDepartureDate: Date | null;
            total: number;
            createdAt: Date;
            serviceItemId: string;
        }[]
    >([]);

    const getAddTimeReservation = async () => {
        // const { aditionalTime } = await getAddTimeReservationById(reservation.serviceItem?.id!);
        // setAddTimes(aditionalTime);
    };

    useEffect(() => {
        getAddTimeReservation();
    }, []);

    return (
        <ol className="relative border-s ml-3 border-gray-400 space-y-16 py-5">
            {reservation.ServiceItem?.serviceCompleted && (
                <li className="ms-4">
                    <div className="absolute w-3.5 h-3.5 bg-gray-900 rounded-full mt-1.5 -start-2 border border-white"></div>
                    <time className="mb-1 text-sm font-medium leading-none">
                        {formatDateWithHours(reservation.ServiceItem.dateComplete!)}
                    </time>
                    <h3 className="text-md md:text-lg font-semibold">Servicio Finalizado</h3>
                    <p className="text-xs md:text-base font-extralight">
                        En esta fecha se confirmó la finalización de tu servicio y salida del motel.
                    </p>
                </li>
            )}

            {reservation.ServiceItem?.serviceTaken && reservation.ServiceItem?.serviceCompleted === false && (
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400">Esperando actualización</time>
                </li>
            )}



            {addTimes.length > 0 &&
                addTimes.map((addTime, index) => (
                    <li className="ms-4" key={addTime.id}>
                        <div
                            className={`absolute w-3.5 h-3.5 rounded-full mt-1.5 -start-2 border border-white ${index === 0 && reservation.ServiceItem?.serviceCompleted == false ? 'bg-gray-900' : 'bg-gray-400'
                                }`}
                        ></div>
                        <time className="mb-1 text-sm font-medium leading-none">
                            {formatDateWithHours(addTime.createdAt)}
                        </time>
                        <h3 className="text-md md:text-lg font-semibold">Adición de tiempo</h3>
                        <p className="text-xs md:text-base font-extralight">
                            Se adicionaron {formatTime(addTime.addTimeReservation)} a la reserva. Nueva hora de salida: {addTime.newDepartureDate ? formatDateWithHours(addTime.newDepartureDate) : 'N/A'}.
                        </p>
                    </li>
                ))}

            {reservation.ServiceItem?.canceledReservation === false && reservation.ServiceItem?.serviceTaken && addTimes.length > 0 && reservation.ServiceItem.serviceCompleted && (
                <li className="ms-4">
                    <div className="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                    <time className="mb-1 text-sm font-medium leading-none">
                        {formatDateWithHours(reservation.ServiceItem.dateTaken!)}
                    </time>
                    <h3 className="text-md md:text-lg font-semibold">Servicio iniciado</h3>
                    <p className="text-xs md:text-base font-extralight">
                        En esta fecha se confirmó el inicio de tu servicio y la entrada al motel {reservation.ServiceItem?.room.motel.title} a la habitación {reservation.ServiceItem?.title} - Nro°{reservation.ServiceItem?.roomNumber}.
                    </p>
                </li>
            )}

            {reservation.ServiceItem?.canceledReservation === false && reservation.ServiceItem?.serviceTaken && addTimes.length === 0 && reservation.ServiceItem.serviceCompleted && (
                <li className="ms-4">
                    <div className="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                    <time className="mb-1 text-sm font-medium leading-none">
                        {formatDateWithHours(reservation.ServiceItem.dateTaken!)}
                    </time>
                    <h3 className="text-md md:text-lg font-semibold">Servicio iniciado</h3>
                    <p className="text-xs md:text-base font-extralight">
                        En esta fecha se confirmó el inicio de tu servicio y la entrada al motel {reservation.ServiceItem?.room.motel.title} a la habitación {reservation.ServiceItem?.title} - Nro°{reservation.ServiceItem?.roomNumber}.
                    </p>
                </li>
            )}

            {reservation.ServiceItem?.canceledReservation === false && reservation.ServiceItem?.serviceTaken && addTimes.length > 0 && reservation.ServiceItem.serviceCompleted === false && (
                <li className="ms-4">
                    <div className="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                    <time className="mb-1 text-sm font-medium leading-none">
                        {formatDateWithHours(reservation.ServiceItem.dateTaken!)}
                    </time> 
                    <h3 className="text-md md:text-lg font-semibold">Servicio iniciado</h3>
                    <p className="text-xs md:text-base font-extralight">
                        En esta fecha se confirmó el inicio de tu servicio y la entrada al motel {reservation.ServiceItem?.room.motel.title} a la habitación {reservation.ServiceItem?.title} - Nro°{reservation.ServiceItem?.roomNumber}.
                    </p>
                </li>
            )}

            {reservation.ServiceItem?.canceledReservation === false && reservation.ServiceItem?.serviceTaken && reservation.ServiceItem?.serviceCompleted === false && addTimes.length < 1 && (
                <li className="ms-4">
                    <div className="absolute w-3 h-3 bg-gray-900 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                    <time className="mb-1 text-sm font-medium leading-none">
                        {formatDateWithHours(reservation.ServiceItem.dateTaken!)}
                    </time>
                    <h3 className="text-md md:text-lg font-semibold">Servicio iniciado</h3>
                    <p className="text-xs md:text-base font-extralight">
                        En esta fecha se confirmó el inicio de tu servicio y la entrada al motel {reservation.ServiceItem?.room.motel.title} a la habitación {reservation.ServiceItem?.title} - Nro°{reservation.ServiceItem?.roomNumber}.
                    </p>
                </li>
            )}

            {reservation.ServiceItem?.canceledReservation && (
                <li className="ms-4">
                    <div className="absolute w-3.5 h-3.5 bg-gray-900 rounded-full mt-1.5 -start-2 border border-white"></div>
                    <time className="mb-1 text-sm font-medium leading-none">
                        {formatDateWithHours(reservation.ServiceItem.dateCanceledReservation!)}
                    </time>
                    <h3 className="text-md md:text-lg font-semibold">Reserva cancelada</h3>
                    <p className="text-xs md:text-base font-extralight">
                        En esta fecha realizaste la cancelación de tu reserva.
                    </p>
                </li>
            )}

            {reservation.ServiceItem?.canceledReservation === false && reservation.ServiceItem.serviceTaken === false && reservation.ServiceItem.status !== "no_iniciado" && (
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                    <time className="mb-1t  md:text-sm font-normal leading-none text-gray-400">Esperando actualización</time>
                </li>
            )}


            {
                reservation.ServiceItem?.serviceCompleted === false &&
                reservation.ServiceItem?.serviceTaken === false && reservation.ServiceItem.status !== "no_iniciado" && (
                    <li className="ms-4">
                        <div className="absolute w-3.5 h-3.5 bg-gray-900 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                        <time className="mb-1 text-sm font-medium  leading-none ">
                            {formatDateWithHours(reservation.createdAt)}
                        </time>
                        <h3 className="text-md md:text-lg font-semibold">Reserva realizada</h3>
                        <p className="text-xs md:text-base font-extralight">
                            En esta fecha hiciste una reserva en el Motel {reservation.ServiceItem?.room.motel.title} para la {reservation.ServiceItem?.title} - Nro°{reservation.ServiceItem?.roomNumber}.
                        </p>
                    </li>
                )}


            {
                reservation.ServiceItem?.status === "no_iniciado" && (
                    <li className="ms-4">
                        <div className="absolute w-3.5 h-3.5 bg-gray-900 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                        <time className="mb-1 text-sm font-medium leading-none">
                            {formatDateWithHours(reservation.ServiceItem?.updatedAt!)}
                        </time>
                        <h3 className="text-md md:text-lg font-semibold">Reserva cancelada por el sistema</h3>
                        <p className="text-xs md:text-base font-extralight">
                            La reserva fue cancelada automáticamente a las{" "}
                            {formatDateWithHours(reservation.ServiceItem?.updatedAt!)} porque no se presentó antes de las{" "}
                            {formatDateWithHours(reservation.ServiceItem?.arrivalDate!)}.
                        </p>
                    </li>

                )}


            {!reservation.ServiceItem?.serviceTaken && reservation.ServiceItem?.status === "no_iniciado" && (
                <li className="ms-4">
                    <div className="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                    <time className="mb-1 text-sm font-medium leading-none">
                        {formatDateWithHours(reservation.createdAt)}
                    </time>
                    <h3 className="text-md md:text-lg font-semibold">Reserva realizada</h3>
                    <p className="text-xs md:text-base font-extralight">
                        En esta fecha hiciste una reserva en el Motel {reservation.ServiceItem?.room.motel.title} para la {reservation.ServiceItem?.title} - Nro°{reservation.ServiceItem?.roomNumber}.
                    </p>
                </li>
            )}

            {reservation.ServiceItem?.serviceTaken && (
                <li className="ms-4">
                    <div className="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                    <time className="mb-1 text-sm font-medium leading-none">
                        {formatDateWithHours(reservation.createdAt)}
                    </time>
                    <h3 className="text-md md:text-lg font-semibold">Reserva realizada</h3>
                    <p className="text-xs md:text-base font-extralight">
                        En esta fecha hiciste una reserva en el Motel {reservation.ServiceItem?.room.motel.title} para la {reservation.ServiceItem?.title} - Nro°{reservation.ServiceItem?.roomNumber}.
                    </p>
                </li>
            )}
        </ol>
    );
};
