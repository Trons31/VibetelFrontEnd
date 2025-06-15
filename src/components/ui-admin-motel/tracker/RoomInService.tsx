'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoMdCalendar } from 'react-icons/io';
import { motion } from 'framer-motion';
import { formatTimeWithAmPm } from '../../../utils/formatDate';
import { formatTime } from '@/utils';
import { roomInServiceAdmin } from '@/actions';
import { useAdmintore } from '@/store';
import { DetailRoom } from './DetailRoom';
import { roomInSerciceAdmin } from '@/interfaces';
import { TimeSince } from '@/components';
import { RiLoginCircleFill } from 'react-icons/ri';


interface Props {
    motelId: string;
}

export const RoomInService = ({ motelId }: Props) => {

    const { newRoomInService, cleanNewRoomInService, updateNewRoomInService } = useAdmintore();

    const [isOpen, setIsOpen] = useState(false);
    const [rooms, setRooms] = useState<roomInSerciceAdmin[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingScroll, setLoadingScroll] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isOpenDetailRoom, setisOpenDetailRoom] = useState(false);
    const [serviceId, setServiceId] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);


    const fetchReservations = useCallback(async () => {
        const data = await roomInServiceAdmin({ motelId, page, limit: 10 });
        if (data.ok && data.totalCount !== undefined) {
            setRooms((prev) => {
                const existingReservations = new Set(prev.map((r) => r.id));
                const newReservations = data.reservations.filter((r) => !existingReservations.has(r.id));
                return [...prev, ...newReservations];
            });
            setHasMore(data.reservations.length === 10);
        }
        setLoadingScroll(false);
        setLoading(false)
    }, [motelId, page]);

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

  

    useEffect(() => {
        if (isOpen) {
            setRooms([]); // Reinicia la lista de habitaciones
            setPage(1); // Reinicia la paginación
            setLoading(true); // Muestra el loading
            fetchReservations();
        }
    }, [isOpen]);


    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const element = event.currentTarget;
        const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;

        if (isAtBottom && !loadingScroll && hasMore) {
            setLoadingScroll(true);
            setPage(prevPage => prevPage + 1);
        }
    };

    const opneSheet = () => {
        cleanNewRoomInService();
        setIsOpen(!isOpen);
    }


    const closeDetailRoom = () => {
        setisOpenDetailRoom(false);
    }

    const openDetailRoom = (reservationRoomId: string) => {
        setServiceId(reservationRoomId);
        setisOpenDetailRoom(true);
    }

    const menuVariants = {
        initial: { y: 300, opacity: 0 },
        open: { y: 0, height: 350, opacity: 1 },
        closed: { y: 0, height: 40, opacity: 1 }
    };

    return (
        <>

            <DetailRoom
                serviceId={serviceId}
                isOpen={isOpenDetailRoom}
                onClose={closeDetailRoom}
            />

            <motion.div
                className='fixed bottom-0 z-10 right-5 w-[350px] bg-white shadow-md rounded-t-lg border border-gray-200 overflow-hidden'
                initial="initial"
                animate={isOpen ? "open" : "closed"}
                variants={menuVariants}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <button
                    onClick={opneSheet}
                    className='w-full flex justify-between items-center rounded-t-lg px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-all duration-200'
                >
                    <p className='font-medium text-md text-white'>Habitaciones en servicio</p>
                    {isOpen ? (
                        <IoIosArrowDown className='text-white h-6 w-6' />
                    ) : (
                        <IoIosArrowUp className='text-white h-6 w-6' />
                    )}
                </button>

                {
                    !loading && !isOpen &&
                    (
                        newRoomInService && (
                            <div className='fixed bottom-5 right-1 flex items-center justify-center h-10 w-10'>
                                <div className='relative flex items-center justify-center'>
                                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                                    <span className='relative inline-flex rounded-full h-4 w-4 text-xs bg-red-500 text-white font-bold items-center justify-center'>
                                    </span>
                                </div>
                            </div>
                        )
                    )
                }


                {isOpen && (
                    <div ref={containerRef} className='h-[300px] custom-scrollbar overflow-y-scroll' onScroll={handleScroll}>
                        {
                            loading
                                ? (
                                    <>
                                        <div className='flex justify-center gap-5 py-16 items-center' >
                                            <svg className="h-5 w-5 animate-spin text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Cargando informacion...
                                        </div>
                                    </>
                                ) : (
                                    rooms.length > 0
                                        ? (
                                            <>
                                                <ul>
                                                    {rooms.map((room) => (
                                                        <li
                                                            onClick={() => openDetailRoom(room.id)}
                                                            key={room.id}
                                                            className='hover:bg-blue-100 cursor-pointer py-4 border-b border-solid border-b-gray-300'>
                                                            <div className='mb-2 w-full px-2 animate-fadeIn'>
                                                                <div className='flex justify-start' >
                                                                    {
                                                                        room.type === "noReservation"
                                                                            ? (
                                                                                <div className='flex justify-start items-center gap-2 bg-gray-300 rounded-lg p-1' >
                                                                                    <p className='text-xs' >servicio sin reserva</p>
                                                                                    <RiLoginCircleFill className='h-4 w-4 text-gray-700' />
                                                                                </div>
                                                                            ) : (
                                                                                <div className='flex justify-start items-center gap-2 bg-gray-300 rounded-lg p-1' >
                                                                                    <p className='text-xs' >servicio con reserva</p>
                                                                                    <IoMdCalendar className='h-4 w-4 text-gray-700' />
                                                                                </div>
                                                                            )
                                                                    }
                                                                </div>
                                                                <div className='flex justify-between items-center ' >
                                                                    <p className='text-md font-bold  capitalize' >
                                                                        {room.title}
                                                                    </p>
                                                                    <div className='flex gap-2 items-center' >
                                                                        <p className='text-xs font-bold' >Nro°</p>
                                                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-600 text-sm font-semibold text-white" >{room.roomNumber}</div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p className='text-sm' >
                                                                        Hora de entrada  : <strong>{formatTimeWithAmPm(room.dateTaken)}</strong>
                                                                    </p>
                                                                    <p className='text-sm' >
                                                                        {
                                                                            room.totalAddTime > 0
                                                                                ? "Nueva hora de salida"
                                                                                : "Hora de salida"
                                                                        }
                                                                        : <strong>{formatTimeWithAmPm(room.departureDate)}</strong> </p>
                                                                </div>
                                                                <div>
                                                                    {
                                                                        room.totalAddTime > 0
                                                                        && (
                                                                            <>
                                                                                <div className="mt-2 mb-2 border border-gray-400 border-dashed" />
                                                                                <div className='flex justify-between mt-1 items-center bg-gray-200 rounded p-2' >
                                                                                    <p className='text-black text-xs font-bold' >Servicio extendido {formatTime(room.totalAddTime)}</p>
                                                                                    <p className='text-xs text-blue-800 font-bold flex gap-2 items-center' ><TimeSince time={new Date(room.createdAtAddTime!)} /> </p>
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                {loadingScroll && loadingScroll && <p className="text-center flex justify-center text-xs mb-2 mt-2 gap-3 text-gray-400">
                                                    <svg className="h-5 w-5 animate-spin text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Cargando más habitaciones...
                                                </p>}
                                                {!hasMore && rooms.length > 0 && (
                                                    <p className="text-center mt-2 mb-2 text-xs text-gray-400">No hay más habitaciones en servicio</p>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <div className='p-2 mt-2' >
                                                    <div className='bg-gray-200 py-6 w-full p-2 flex justify-center  rounded-md' >
                                                        <p className='text-gray-700 text-xs font-semibold' >
                                                            Actualmente ninguna habitacion esta con un serivicio de reserva. Te notificaremos cuando una habitacion entre en servicio.
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                )
                        }
                    </div>
                )}
            </motion.div>
        </>
    );
};
