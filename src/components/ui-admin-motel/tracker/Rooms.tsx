'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { motion } from 'framer-motion';
import { DetailRoomReservation } from './DetailRoomReservation';
import { getReservationByRoom } from '@/actions';
import { reservationsByRoom } from '@/interfaces/reservation.interface';
import { LiaBroomSolid } from 'react-icons/lia';
import { FaCheckCircle } from 'react-icons/fa';
import { MdBlockFlipped } from 'react-icons/md';
import { TfiReload } from 'react-icons/tfi';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';

interface Props {
    motelId: string;
}

export const Rooms = ({ motelId }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDetailRoom, setisOpenDetailRoom] = useState(false);

    const [roomId, setRoomId] = useState("");
    const [nameRoom, setnameRoom] = useState("")
    const [page, setPage] = useState(1);
    const [loadingScroll, setLoadingScroll] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [rooms, setRooms] = useState<reservationsByRoom[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);


    const fetchReservationsByRoom = useCallback(async () => {
        const data = await getReservationByRoom({ motelId, page, limit: 10 });
        if (data.ok && data.totalCount !== undefined) {
            setRooms((prev) => {
                const existingReservations = new Set(prev.map((r) => r.id));
                const newReservations = data.roomsWithReservations.filter((r) => !existingReservations.has(r.id));
                return [...prev, ...newReservations];
            });
            setHasMore(data.roomsWithReservations.length === 10);
        }
        setLoadingScroll(false);
        setLoading(false)
    }, [motelId, page]);

    useEffect(() => {
        fetchReservationsByRoom();
    }, [fetchReservationsByRoom]);

    useEffect(() => {
        if (isOpen) {
            setRooms([]); // Reinicia la lista de habitaciones
            setPage(1); // Reinicia la paginación
            setLoading(true); // Muestra el loading
            fetchReservationsByRoom();
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

    const openDetailRoom = (RoomId: string, nameRoom: string) => {
        setRoomId(RoomId);
        setnameRoom(nameRoom);
        setisOpenDetailRoom(true);
    }

    const menuVariants = {
        initial: { y: 300, opacity: 0 },
        open: { y: 0, height: 350, opacity: 1 },
        closed: { y: 0, height: 40, opacity: 1 }
    };

    return (
        <>
            <DetailRoomReservation
                isOpen={isOpenDetailRoom}
                onClose={() => setisOpenDetailRoom(false)}
                roomId={roomId}
                nameRoom={nameRoom}
                openSheedRoom={() => setIsOpen(true)}

            />
            <motion.div
                className='fixed bottom-0 z-10 right-[730px] w-[350px] bg-white shadow-md rounded-t-lg border border-gray-200 overflow-hidden'
                initial="initial"
                animate={isOpen ? "open" : "closed"}
                variants={menuVariants}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className='w-full flex justify-between items-center rounded-t-lg px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-all duration-200'
                >
                    <p className='font-medium text-md text-white'>Habitaciones</p>
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
                                                <ul >
                                                    {rooms.map((room) => (
                                                        <li
                                                            key={room.id}
                                                            onClick={() => openDetailRoom(room.id, room.title)}
                                                            className='hover:bg-purple-100 px-2 cursor-pointer py-4 border-b border-solid border-b-gray-300' >
                                                            <div className='flex justify-between items-center' >
                                                                <div className='w-full' >
                                                                    <div className='flex justify-between items-center' >
                                                                        <p className='text-md font-bold ' >{room.title} </p>
                                                                        <p className='text-md font-bold ' >Nro° {room.roomNumber} </p>

                                                                    </div>
                                                                    <div className='' >
                                                                        <p className='text-sm py-1 font-medium' >Reservas hoy: <strong>{room.totalReservation}</strong></p>
                                                                        <div>
                                                                            {
                                                                                room.status === "CLEANING" &&
                                                                                (
                                                                                    <div className='p-2 flex justify-center gap-3 bg-gray-200 text-center rounded-lg' >
                                                                                        <LiaBroomSolid className='text-gray-800' />
                                                                                        <p className='text-xs font-semibold text-gray-800 ' >En limpieza...</p>
                                                                                    </div>
                                                                                )
                                                                            }

                                                                            {
                                                                                room.status === "AVAILABLE" && (
                                                                                    <div className='p-2 flex justify-center gap-3 bg-blue-200 text-center rounded-lg' >
                                                                                        <FaCheckCircle className='text-blue-800' />
                                                                                        <p className='text-xs font-semibold text-blue-800 ' >Disponible...</p>
                                                                                    </div>
                                                                                )
                                                                            }

                                                                            {
                                                                                room.status === "IN_SERVICE" && (
                                                                                    <div className='p-2 flex justify-center gap-3 bg-green-200 text-center rounded-lg' >
                                                                                        <TfiReload className='text-green-800' />
                                                                                        <p className='text-xs font-semibold text-green-800 ' >En servicio...</p>
                                                                                    </div>
                                                                                )
                                                                            }

                                                                            {
                                                                                room.status === "SERVICE_COMPLETED" && (
                                                                                    <div className='p-2 flex justify-center gap-3 bg-purple-200 text-center rounded-lg' >
                                                                                        <IoCheckmarkDoneCircleSharp className='text-purple-800' />
                                                                                        <p className='text-xs font-semibold text-purple-800 ' >Servicio completado</p>
                                                                                    </div>
                                                                                )
                                                                            }

                                                                            {
                                                                                room.status === "DISABLED" && (
                                                                                    <div className='p-2 flex justify-center gap-3 bg-black text-center rounded-lg' >
                                                                                        <MdBlockFlipped className='text-white' />
                                                                                        <p className='text-xs font-semibold text-white ' >Desactivada...</p>
                                                                                    </div>
                                                                                )
                                                                            }


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* */}
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
                                                    <p className="text-center mt-2 mb-2 text-xs text-gray-400">No hay más habitaciones registradas</p>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <div className='p-2 mt-2' >
                                                    <div className='bg-gray-200 py-6 w-full p-2 flex justify-center  rounded-md' >
                                                        <p className='text-gray-700 text-xs font-semibold' >
                                                            Actualmente ninguna habitacion tiene reservas realizadas. Te notificaremos cuando una habitacion entre en servicio.
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                )
                        }

                    </div>
                )}
            </motion.div >
        </>
    );
};
