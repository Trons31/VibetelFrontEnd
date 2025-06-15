'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { getReservationsByMotel } from '@/actions';
import { reservationCheckInAdmin, ReservationData } from '@/interfaces/reservation.interface';
import { formatDateWithHours } from '@/utils';
import { motion } from 'framer-motion';
import Pusher from 'pusher-js';
import { SheedDetailService, SkeletonTableCheckIn } from '@/components';
import { FilterTableReservation } from './FilterTableReservation';

interface Props {
    motelId: string;
    totalReservation: ReservationData;
}



export const TableReservation = ({ motelId, totalReservation }: Props) => {
    const [reservations, setReservations] = useState<reservationCheckInAdmin[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [statusFilter, setStatusFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [loadingScroll, setLoadingScroll] = useState(false);

    const [roomId, setRoomId] = useState("");
    const [nameRoom, setNameRoom] = useState("");

    const [totalBooking, setTotalBooking] = useState(totalReservation.totalReservations);
    const [bookingNoInciadas, setBookingNoInciadas] = useState(totalReservation.reservationsNoIniciadas);
    const [bookingEnEspera, setBookingEnEspera] = useState(totalReservation.reservationsEnEspera);
    const [bookingInciadas, setBookingInciadas] = useState(totalReservation.reservationsIniciadas);
    const [bookingCompleted, setBookingCompleted] = useState(totalReservation.reservationsCompletadas);
    const [bookingCancel, setBookingCancel] = useState(totalReservation.reservationsCanceladas);
    const [loadingTotalBooking, setLoadingTotalBooking] = useState(true);

    const [isOpenSheedDetailReservation, setIsOpenSheedDetailReservation] = useState(false);


    const searchFilterRef = useRef(searchQuery);
    const statusFilterrRef = useRef(statusFilter);


    useEffect(() => {
        searchFilterRef.current = searchQuery;
        statusFilterrRef.current = statusFilter;
    }, [searchQuery, statusFilter]);

    const fetchReservations = useCallback(async () => {
        setIsFetching(true);
        const data = await getReservationsByMotel({ motelId, searchQuery, statusFilter, date, page, limit: 10 });
        if (data.ok && data.totalCount !== undefined) {
            setReservations((prev) => {
                const existingReservations = new Set(prev.map((r) => r.id));
                const newReservations = data.reservations.filter((r) => !existingReservations.has(r.id));
                return [...prev, ...newReservations];
            });
            setHasMore(data.reservations.length === 10);
        }
        setIsFetching(false);
        setIsLoading(false);
    }, [motelId, searchQuery, statusFilter, page, date]);


    useEffect(() => {
        fetchReservations();
        setLoadingTotalBooking(false);
    }, [fetchReservations, searchQuery, statusFilter, date]);

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        });

        const channel = pusher.subscribe('reservations');
        channel.bind('new-reservation', (newReservation: reservationCheckInAdmin) => {
            const currentSearchFilter = searchFilterRef.current;
            const currentStatusFilter = statusFilterrRef.current;
            if (currentSearchFilter === '' && currentStatusFilter === '') {
                setReservations((prevReservations) => [newReservation, ...prevReservations]);
            }
            setBookingEnEspera((prevTotal) => prevTotal + 1);
            setTotalBooking((prevTotal) => prevTotal + 1)
        });

        channel.bind('cancel-reservation', (reservationId: string) => {
            setReservations((prevReservations) =>
                prevReservations.map((r) =>
                    r.id === reservationId ? { ...r, status: "cancelado" } : r
                )
            );
            setBookingCancel((prevTotal) => prevTotal + 1);
            setBookingEnEspera((prevTotal) => prevTotal - 1);

        });

        channel.bind('confirm-reservation', (reservationId: string) => {
            setReservations((prevReservations) =>
                prevReservations.map((r) =>
                    r.id === reservationId ? { ...r, status: "iniciado" } : r
                )
            );
            setBookingInciadas((prevTotal) => prevTotal + 1);
            setBookingEnEspera((prevTotal) => prevTotal - 1);

        });

        channel.bind('completed-reservation-by-motel', (reservationId: string) => {
            setReservations((prevReservations) =>
                prevReservations.map((r) =>
                    r.id === reservationId ? { ...r, status: "completado" } : r
                )
            );
            setBookingInciadas((prevTotal) => prevTotal - 1);
            setBookingCompleted((prevTotal) => prevTotal + 1);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);



    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const element = event.currentTarget;
        const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;

        if (isAtBottom && !isFetching && hasMore) {
            setLoadingScroll(true);
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleFilterChange = (newStatusFilter: string, newSearchQuery: string, newDate: Date | null) => {
        setIsLoading(true);
        setStatusFilter(newStatusFilter);
        setSearchQuery(newSearchQuery);
        setDate(newDate);
        setPage(1); // Reiniciar a la primera página al cambiar los filtros
        setReservations([]);
    };


    const OpenDetailReservation = (roomId: string, nameRoom: string) => {
        setRoomId(roomId);
        setNameRoom(nameRoom);
        setIsOpenSheedDetailReservation(!isOpenSheedDetailReservation)
    }

    return (
        <>

            <SheedDetailService
                serviceId={roomId}
                nameRoom={nameRoom}
                isOpen={isOpenSheedDetailReservation}
                onClose={() => setIsOpenSheedDetailReservation(false)}
            />

            <div className="bg-gray-50 pb-5 rounded-xl">

                <div className="mx-auto rounded-md pt-5 mb-10">
                    <div className="grid grid-cols-8 items-center px-5 ">
                        <div className='col-span-6' >
                            <h1 className=" text-2xl font-bold text-gray-900">Gestión de todas las reservas</h1>
                            <p className="text-xs  text-gray-500" >Aquí podrás ver todas las reservas realizadas en tiempo real. <strong>Para cargar más reservas, simplemente desplázate hacia abajo.</strong></p>
                        </div>

                        <div className='col-span-2 flex justify-end ' >
                            <div className="overflow-hidden rounded-xl shadow border-t-4 border-gray-400 bg-white">
                                <div className="py-2 px-2">
                                    <div className="block">
                                        <div className='flex w-full justify-center' >
                                            <h3 className="ml-2 inline-block text-lg font-bold leading-none">
                                                {
                                                    loadingTotalBooking
                                                        ? (
                                                            <div className='bg-gray-400 animate-pulse px-3 py-3 rounded-md' >
                                                            </div>

                                                        ) : (
                                                            <>
                                                                {totalBooking}
                                                            </>
                                                        )
                                                }
                                            </h3>
                                        </div>
                                        <span className="ml-3 text-sm font-medium capitalize">Reservas en total</span>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                <div className='flex justify-between gap-1 px-2' >
                    <div className="mr-4 overflow-hidden rounded-xl shadow border-t-4 border-gray-400 bg-white">
                        <div className="py-2 px-3">
                            <div className="block">
                                <div className='flex w-full justify-center' >
                                    <h3 className="ml-2 inline-block text-lg font-bold leading-none">
                                        {
                                            loadingTotalBooking
                                                ? (
                                                    <div className='bg-gray-400 animate-pulse px-3 py-3 rounded-md' >
                                                    </div>

                                                ) : (
                                                    <>
                                                        {bookingNoInciadas}
                                                    </>
                                                )
                                        }
                                    </h3>
                                </div>
                                <span className="text-sm font-medium capitalize">Reservas No inciadas</span>
                            </div>

                        </div>
                    </div>

                    <div className="mr-4 overflow-hidden rounded-xl shadow border-t-4 border-red-400 bg-white">
                        <div className="py-2 px-3">
                            <div className="block">
                                <div className='flex w-full justify-center' >
                                    <h3 className="ml-2 inline-block text-lg font-bold leading-none">
                                        {
                                            loadingTotalBooking
                                                ? (
                                                    <div className='bg-gray-400 animate-pulse px-3 py-3 rounded-md' >
                                                    </div>

                                                ) : (
                                                    <>
                                                        {bookingCancel}
                                                    </>
                                                )
                                        }
                                    </h3>
                                </div>
                                <span className="ml-3 text-sm font-medium capitalize">Reservas Canceladas</span>
                            </div>

                        </div>
                    </div>

                    <div className="mr-4 overflow-hidden rounded-xl shadow border-t-4 border-blue-400 bg-white">
                        <div className="py-2 px-3">
                            <div className="block">
                                <div className='flex justify-center' >
                                    <h3 className="ml-2 inline-block text-lg font-bold leading-none">
                                        {
                                            loadingTotalBooking
                                                ? (
                                                    <div className='bg-gray-400 animate-pulse px-3 py-3 rounded-md' >
                                                    </div>

                                                ) : (
                                                    <>
                                                        {bookingInciadas}
                                                    </>
                                                )
                                        }
                                    </h3>
                                </div>
                                <span className="ml-3 text-sm font-medium capitalize">Reservas Iniciadas</span>
                            </div>

                        </div>
                    </div>

                    <div className="mr-4 overflow-hidden rounded-xl shadow border-t-4 border-yellow-400 bg-white">
                        <div className="py-2 px-3">
                            <div className="block">
                                <div className='flex justify-center w-full' >
                                    <h3 className="ml-2 inline-block text-lg font-bold leading-none">
                                        {
                                            loadingTotalBooking
                                                ? (
                                                    <div className='bg-gray-400 animate-pulse px-3 py-3 rounded-md' >
                                                    </div>

                                                ) : (
                                                    <>
                                                        {bookingEnEspera}
                                                    </>
                                                )
                                        }
                                    </h3>
                                </div>
                                <span className="ml-3 text-sm font-medium capitalize">Reservas En espera</span>
                            </div>

                        </div>
                    </div>

                    <div className="mr-4 overflow-hidden rounded-xl shadow border-t-4 border-green-400 bg-white">
                        <div className="py-2 px-3">
                            <div className="block">
                                <div className='flex justify-center w-full' >
                                    <h3 className="ml-2 inline-block text-lg font-bold leading-none">
                                        {
                                            loadingTotalBooking
                                                ? (
                                                    <div className='bg-gray-400 animate-pulse px-3 py-3 rounded-md' >
                                                    </div>

                                                ) : (
                                                    <>
                                                        {bookingCompleted}
                                                    </>
                                                )
                                        }
                                    </h3>
                                </div>
                                <span className="ml-3 text-sm font-medium capitalize">Reservas Completadas</span>
                            </div>

                        </div>
                    </div>

                </div>

                <div className='px-2 mt-4' >
                    <FilterTableReservation
                        onFilterChange={handleFilterChange}
                    />
                </div>

                <div className="mx-auto px-2 mt-5 mb-5">
                    <div className="mt-6 rounded-xl bg-white shadow">
                        <div className="overflow-x-auto">
                            <div className="max-h-[500px] custom-scrollbar-table overflow-y-auto" onScroll={handleScroll}>
                                <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                                    {/* Cabecera de la tabla */}
                                    <thead className="bg-gray-100 border-b sticky top-0 ">
                                        <tr>
                                            <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Código de acceso</th>
                                            <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Habitación</th>
                                            <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Hora de entrada</th>
                                            <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Estado</th>
                                        </tr>
                                    </thead>
                                    {/* Cuerpo de la tabla con scroll vertical */}
                                    <tbody className="bg-white lg:border-gray-300">
                                        {!isLoading && (
                                            reservations.length > 0 ? (
                                                reservations.map((reservation) => (
                                                    <motion.tr
                                                        key={reservation.id}
                                                        initial={{ opacity: 0, x: -100 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 100 }}
                                                        transition={{ duration: 0.3 }}
                                                        onClick={() => OpenDetailReservation(reservation.id!, reservation.title!)}
                                                        className='hover:bg-gray-100 cursor-pointer'
                                                    >
                                                        <td className="whitespace-no-wrap py-4 text-center text-sm text-gray-600 sm:px-3 ">
                                                            {
                                                                reservation.accessCode === null
                                                                    ? (
                                                                        <span className="rounded-md px-2 py-1 text-xs font-medium bg-purple-200 text-purple-600" >
                                                                            No disponible
                                                                        </span>
                                                                    ) : (
                                                                        reservation.accessCode
                                                                    )


                                                            }

                                                        </td>
                                                        <td className="whitespace-no-wrap hidden text-center  py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                            {reservation.title} - Nro° {reservation.roomNumber}
                                                        </td>
                                                        <td className="whitespace-no-wrap text-center  hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                            {formatDateWithHours(new Date(reservation.arrivalDate!))}
                                                        </td>
                                                        <td className="whitespace-no-wrap text-center  hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">

                                                            {
                                                                reservation.status === 'en_espera' && (
                                                                    <span className="rounded-md px-2 py-1 text-xs font-medium bg-yellow-500 text-white" >
                                                                        En espera
                                                                    </span>
                                                                )
                                                            }

                                                            {
                                                                reservation.status === 'completado' && (
                                                                    <span className="rounded-md px-2 py-1 text-xs font-medium bg-green-600 text-white" >
                                                                        Completado
                                                                    </span>
                                                                )
                                                            }

                                                            {
                                                                reservation.status === 'iniciado' && (
                                                                    <span className="rounded-md px-2 py-1 text-xs font-medium bg-blue-600 text-white" >
                                                                        Iniciado
                                                                    </span>
                                                                )
                                                            }

                                                            {
                                                                reservation.status === 'cancelado' && (
                                                                    <span className="rounded-md px-2 py-1 text-xs font-medium bg-red-600 text-white" >
                                                                        Cancelado
                                                                    </span>
                                                                )
                                                            }


                                                            {
                                                                reservation.status === 'no_iniciado' && (
                                                                    <span className="rounded-md px-2 py-1 text-xs font-medium bg-gray-600 text-white" >
                                                                        No inciado
                                                                    </span>
                                                                )
                                                            }


                                                        </td>
                                                    </motion.tr>
                                                ))
                                            ) : (

                                                searchQuery === '' || statusFilter === ''
                                                    ? (
                                                        <tr>
                                                            <td colSpan={4} className="py-4 text-center text-sm text-gray-600">
                                                                No se han realizado reservas.
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={4} className="py-4 text-center text-sm text-gray-600">
                                                                No se encontraron reservas.
                                                            </td>
                                                        </tr>
                                                    )
                                            )
                                        )}

                                        {
                                            isLoading && (
                                                <tr>
                                                    <td colSpan={4}>
                                                        <SkeletonTableCheckIn />
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                {hasMore && loadingScroll && (
                                    <div className="py-4 flex text-center justify-center gap-4 text-sm text-gray-600">
                                        <svg className="h-5 w-5 animate-spin text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Cargando más reservas...
                                    </div>
                                )}
                                {!hasMore && !isFetching && reservations.length > 0 && (
                                    <div className="py-4 text-center text-sm text-gray-600">
                                        No hay más reservas.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};
