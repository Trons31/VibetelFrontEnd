'use client';

import { useState } from 'react';
import Link from "next/link";
import { RoomImage } from '@/components/bedrooms/room-image/RoomImage';
import { ReservationByUserApi } from '@/interfaces/reservation.interface';
import { currencyFormat } from '@/utils';
import { IoIosArrowForward } from "react-icons/io";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { MdStars } from 'react-icons/md';
import { ModalPopup, MoldaRating } from '@/components';
import { FaQuestionCircle } from 'react-icons/fa';

interface Props {
    reservation: ReservationByUserApi;
}

const formatDate = (date: Date) => {
    return format(date, "dd, MMMM yyyy", { locale: es });
};

export const ItemReservation = ({ reservation }: Props) => {

    const [modalRating, setModalRating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)


    let StateOfReserve;
    switch (reservation.serviceItem?.status) {
        case 'en_espera':
            StateOfReserve = "En espera del servicio"
            break;

        case 'iniciado':
            StateOfReserve = "Servicio iniciado"
            break;

        case 'en_servicio':
            StateOfReserve = "En servicio"
            break;

        case 'completado':
            StateOfReserve = "Servicio completado"
            break;

        case 'no_iniciado':
            StateOfReserve = "Servicio cancelado por el sistema"
            break;

        case 'cancelado':
            StateOfReserve = "Servicio cancelado por el usuario"
            break;

        default:
            break;
    }

    return (
        <>

            {/* <MoldaRating
                isOpen={modalRating}
                serviceId={reservation.id}

                ratingRoomId={reservation.ratings?.id}
                ratingServiceId={reservation.serviceRating?.id}

                roomId={reservation.roomId!}
                onClose={() => setModalRating(false)}
            /> */}

            <div className="bg-white rounded-none md:rounded-md shadow-lg border border-gray-200 p-4 mb-5" >

                {/*     <div className='flex justify-end w-full px-1 mb-2' >
                    {
                        reservation.ratings?.rating! > 0
                            ? (
                                <div className='flex gap-1 items-center' >
                                    <button
                                        onClick={() => setModalRating(true)}
                                        className="flex gap-1 items-center">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, index) => (
                                                <svg
                                                    key={index}
                                                    className={`w-4 h-4 ms-1 ${index < Math.round(Number(reservation.ratings?.rating)) ? 'text-blue-500' : 'text-gray-300'
                                                        }`}
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 22 20"
                                                >
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </button>
                                </div>
                            ) : (
                                reservation.status === "completado" && (
                                    <button
                                        onClick={() => setModalRating(true)}
                                        className='flex gap-1 items-center text-xs bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded-md text-white' >
                                        <MdStars className='h-4 w-4 text-white' />
                                        Calificar
                                    </button>
                                )
                            )
                    }
                </div> */}

                <div className="flex justify-between  items-center" >
                    <div>
                        <div className='flex gap-2 items-center' >
                            <p className='text-xs md:text-sm flex-wrap w-[100%] md:w-auto' > {StateOfReserve} </p>
                            {
                                reservation.serviceItem?.status === "no_iniciado" && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(true)}
                                        >
                                            <FaQuestionCircle />
                                        </button>

                                        <ModalPopup
                                            title="Información sobre la cancelación"
                                            isOpen={isModalOpen}
                                            onClose={() => setIsModalOpen(false)}
                                        >
                                            <div>
                                                <p className="mt-2">
                                                    Esta reserva fue cancelada automáticamente por el sistema porque
                                                    no te presentaste a tiempo para tu servicio en la fecha seleccionada al realizar
                                                    la reserva,
                                                    ni dentro del tiempo de espera adicional establecido por el motel
                                                    después del inicio del servicio.
                                                    Si aún deseas utilizar el servicio, te recomendamos realizar una nueva reserva.
                                                </p>
                                            </div>
                                        </ModalPopup>
                                    </>
                                )
                            }
                        </div>
                        <p className='text-xs block md:hidden' >
                            {formatDate(reservation.createdAt)}
                        </p>
                    </div>
                    <div className="flex items-center" >

                        <div className="hidden md:block border-r px-2  border-gray-300" >
                            <p className="text-xs" > Reserva realizada el: {formatDate(new Date(reservation.createdAt))} </p>
                            <p className="text-xs" >id: {reservation.id}</p>
                        </div>

                        <Link href={`/booking/${reservation.id}`} className="hidden md:flex text-sm  gap-3 items-center hover:text-red-500 transition-all duration-150 px-2" >
                            Detalle de la reserva
                            <IoIosArrowForward />
                        </Link>

                        <Link href={`/booking/${reservation.id}`} className="flex md:hidden text-xs  md:gap-3 items-center hover:text-red-500 transition-all duration-150  md:px-2" >
                            Ver detalles
                            <IoIosArrowForward />
                        </Link>

                    </div>
                </div>

                <div className="mt-2 border border-gray-400 border-dashed" />

                <div className='hidden p-4 md:flex justify-between items-center'>

                    <div className=' w-fit' >
                        <div className='flex gap-2 items-center justify-center' >
                            <Link href={`/room/${reservation.roomSlug}`} className="text-sm flex gap-3 items-center hover:text-red-500 transition-all duration-150 px-2" >
                                <p className='py-2 text-xs' >{reservation.motelRazonSocial}</p>
                                <IoIosArrowForward />
                                <p className='text-xs' > {reservation.serviceItem?.room} </p>
                            </Link>
                        </div>
                        <div className='flex gap-2'>
                            {reservation.roomImages?.map((image, index) => (
                                <RoomImage
                                    key={index}
                                    src={image}
                                    width={200}
                                    height={200}
                                    alt={`Room image ${index + 1}`}
                                    className='w-32 h-32 object-cover rounded-md'
                                />
                            ))}
                        </div>
                    </div>
                    <div className='grid grid-cols space-y-2 px-5' >
                        <p className='text-center' >Total : {currencyFormat(reservation.total)}</p>

                        <Link href={`/room/${reservation.roomSlug}`} className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-md hover:from-red-700 hover:to-orange-700 transition-all duration-200">
                            Volver a reservar
                        </Link>

                        <button className='px-4 py-2 border-gray-400 border rounded-md hover:border-red-600 hover:text-red-600 transition-all duration-200' >
                            Eliminar
                        </button>

                    </div>

                </div>

                <div className='block md:hidden w-full' >
                    <div className='flex  items-center justify-start mt-2' >
                        <Link href={`/booking/${reservation.id}`} className="text-sm flex gap-2 items-center hover:text-red-500 transition-all duration-150 px-2" >
                            <p className='py-2 text-xs' >{reservation.motelRazonSocial}</p>
                            <IoIosArrowForward />
                            <p className='text-xs' >{reservation.serviceItem?.room}</p>
                        </Link>
                    </div>
                    <div className='flex gap-2'>
                        {reservation.roomImages?.map((image, index) => (
                            <RoomImage
                                key={index}
                                src={image}
                                width={200}
                                height={200}
                                alt={`Room image ${index + 1}`}
                                className='w-32 h-32 object-cover rounded-md'
                            />
                        ))}
                    </div>

                    <div className='flex justify-end mt-3 mb-2' >
                        <p className='text-xs  ' >Total : {currencyFormat(reservation.total)}</p>
                    </div>
                    <div className='flex justify-end gap-2' >
                        <button className='px-4 py-2 text-xs border-gray-400 border rounded-md hover:border-red-600 hover:text-red-600 transition-all duration-200' >
                            Eliminar
                        </button>
                        <Link href={`/room/${reservation.roomSlug}`} className="bg-gradient-to-r text-xs from-red-500 to-orange-500 text-white px-4 py-2 rounded-md hover:from-red-600 hover:to-orange-600 transition-all duration-200">
                            Volver a reservar
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
