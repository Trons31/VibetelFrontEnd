'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { motion } from 'framer-motion';
import { formatTimeWithAmPm, sleep } from '@/utils';
import { serviceCompleted } from '@/interfaces';
import { getReservationConfirmCompleted } from '@/actions';
import { CountdownTimer, ModalConfirmCompletedReservation, TimeSince } from '@/components';

interface Props {
    motelId: string;
}

export const ReservationCompletionConfirmation = ({ motelId }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const [rooms, setRooms] = useState<serviceCompleted[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingScroll, setLoadingScroll] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [serviceCompleted, setserviceCompleted] = useState<serviceCompleted | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);


    const fetchReservations = useCallback(async () => {
        await sleep(1);
        const data = await getReservationConfirmCompleted({ motelId, page, limit: 10 });
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

    // useEffect(() => {
    //     const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    //         cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    //     });

    //     const channel = pusher.subscribe('reservations');
    //     channel.bind('complete-reservation-by-user', (newConfirmCompletedReservation: serviceCompleted) => {
    //         setIsOpen(true);
    //         setRooms(prev => [newConfirmCompletedReservation, ...prev]);

    //     });

    //     channel.bind('completed-reservation-by-motel', (reservationId: string) => {
    //         setRooms((prevReservations) =>
    //             prevReservations.filter((reservation) => reservation.id !== reservationId)
    //         );
    //     });

    //     return () => {
    //         channel.unbind_all();
    //         channel.unsubscribe();
    //     };
    // }, [motelId]);


    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const element = event.currentTarget;
        const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;

        if (isAtBottom && !loadingScroll && hasMore) {
            setLoadingScroll(true);
            setPage(prevPage => prevPage + 1);
        }
    };


    const openModalConfirm = (service: serviceCompleted) => {
        setIsOpenModal(true);
        setserviceCompleted(service);
    }

    const menuVariants = {
        initial: { y: 300, opacity: 0 },
        open: { y: 0, height: 350, opacity: 1 },
        closed: { y: 0, height: 40, opacity: 1 }
    };


    return (

        <>

            <ModalConfirmCompletedReservation
                isOpen={isOpenModal}
                idReservation={serviceCompleted?.id!}
                room={serviceCompleted?.title}
                roomNumber={serviceCompleted?.roomNumber}
                onClose={() => setIsOpenModal(false)}
            />


            <motion.div
                className='fixed bottom-0 z-10 right-[375px] w-[350px] bg-white shadow-md rounded-t-lg border border-gray-200 overflow-hidden'
                initial="initial"
                animate={isOpen ? "open" : "closed"}
                variants={menuVariants}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className='w-full flex justify-between items-center rounded-t-lg px-4 py-2 bg-green-600 hover:bg-green-700 transition-all duration-200'
                >
                    <p className='font-medium text-md text-white'>Confirmar salida </p>
                    {isOpen ? (
                        <IoIosArrowDown className='text-white h-6 w-6' />
                    ) : (
                        <IoIosArrowUp className='text-white h-6 w-6' />
                    )}
                </button>

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

                                                    {
                                                        rooms.map(room => (
                                                            <li
                                                                key={room.id}
                                                                onClick={() => openModalConfirm(room)}
                                                                className='hover:bg-green-100 cursor-pointer py-4 border-b border-solid border-b-gray-300'
                                                            >

                                                                <div className='mb-2 w-full px-2 animate-fadeIn'>
                                                                    <div className='flex justify-end mb-3' >
                                                                        <p className='text-xs flex gap-2' ><strong className='text-blue-600' > <TimeSince time={new Date(room.createdAt!)} /></strong></p>
                                                                    </div>
                                                                    <div className='flex justify-between items-center' >
                                                                        <p className='text-md font-bold' >
                                                                            {room.title}
                                                                        </p>

                                                                        <div className='flex gap-2 items-center' >
                                                                            <p className='text-sm font-bold' >Nro°</p>
                                                                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white" >{room.roomNumber}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='items-center' >
                                                                        <div>
                                                                            <p className='text-sm' >
                                                                                Hora de salida: <strong>{formatTimeWithAmPm(room.departureDate)}</strong>
                                                                            </p>
                                                                            <div className=' flex gap-2 items-center' >
                                                                                <p className='text-sm' >
                                                                                    La reserva termina en:
                                                                                </p>
                                                                                <strong className='text-sm' ><CountdownTimer time={new Date(room.departureDate)} className="text-sm" /></strong>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))
                                                    }

                                                </ul>
                                                {loadingScroll && loadingScroll && <p className="text-center flex justify-center text-xs mb-2 mt-2 gap-3 text-gray-400">
                                                    <svg className="h-5 w-5 animate-spin text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Cargando más solicitudes...
                                                </p>}
                                                {!hasMore && rooms.length > 0 && (
                                                    <p className="text-center mt-2 mb-2 text-xs text-gray-400">No hay más solicitudes de salida</p>
                                                )}

                                            </>
                                        ) : (
                                            <div className='p-2 mt-2' >
                                                <div className='bg-gray-200 py-6 w-full p-2 flex justify-center rounded-md' >
                                                    <p className='text-gray-700 text-xs text-center font-semibold' >
                                                        No hay solicitudes de finalización o salida pendientes
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                )
                        }

                    </div>
                )}
            </motion.div>
        </>

    );
};


