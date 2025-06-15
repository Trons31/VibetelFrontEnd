'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { reservationCheckIn } from '@/actions';
import { reservationCheckInAdmin } from '@/interfaces/reservation.interface';
import { formatDate, formatDateWithHours, sleep } from '@/utils';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import { SkeletonTableCheckIn } from '@/components';
import Pusher from 'pusher-js';
import { motion } from 'framer-motion';

interface Props {
    motelId: string;
    totalReservation: number
}



export const TableCheckIn = ({ motelId, totalReservation }: Props) => {
    const [reservations, setReservations] = useState<reservationCheckInAdmin[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchFilter, setSearchFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [loadingScroll, setLoadingScroll] = useState(false);
    const [totalBooking, setTotalBooking] = useState(totalReservation);
    const [loadingTotalBooking, setLoadingTotalBooking] = useState(true);

    const searchFilterRef = useRef(searchFilter);

    useEffect(() => {
        searchFilterRef.current = searchFilter;
    }, [searchFilter]);

    const fetchReservations = useCallback(async () => {
        setIsFetching(true);
        const data = await reservationCheckIn({ motelId, searchFilter, page, limit: 10 });
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
    }, [motelId, searchFilter, page]);

    useEffect(() => {
        fetchReservations();
        setLoadingTotalBooking(false);
    }, [searchFilter]);

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        });

        const channel = pusher.subscribe('reservations');
        channel.bind('new-reservation', (newReservation: reservationCheckInAdmin) => {
            const currentSearchFilter = searchFilterRef.current;
            if (currentSearchFilter === '') {
                setReservations((prevReservations) => [newReservation, ...prevReservations]);
            }
            setTotalBooking((prevTotal) => prevTotal + 1);
        });

        channel.bind('cancel-reservation', (canceledReservation: reservationCheckInAdmin) => {
            setReservations((prevReservations) =>
                prevReservations.filter((reservation) => reservation.id !== canceledReservation.id)
            );
            setTotalBooking((prevTotal) => prevTotal - 1);
        });

        channel.bind('confirm-reservation', (confirmedReservation: reservationCheckInAdmin) => {
            setReservations((prevReservations) =>
                prevReservations.filter((reservation) => reservation.id !== confirmedReservation.id)
            );
            setTotalBooking((prevTotal) => prevTotal - 1);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const element = event.currentTarget;
        const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;

        if (isAtBottom && !isFetching && hasMore) {
            setLoadingScroll(true);
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleFilterChange = (newSearchFilter: string) => {
        setSearchFilter(newSearchFilter);
    };

    const handleSearch = async () => {
        setIsLoading(true);
        setPage(1);
        setReservations([]);
        handleFilterChange(searchQuery);
    };

    const cleanInputSearch = async () => {
        setIsLoading(true);
        setSearchFilter('');
        setSearchQuery('');
        setPage(1);
        setReservations([]);
    };

    return (
        <>
            <div className="bg-gray-50 py-5 mt-10 rounded-lg">
                <div className='mt-2  mb-6' >
                    <div className="flex items-center px-5 justify-between">
                        <h1 className=" text-2xl font-bold text-gray-900">Gestión de entrada</h1>
                        <p className="text-lg  font-medium">{formatDate(new Date())}</p>
                    </div>

                    <div className="ml-5">
                        <p className="text-gray-500 text-sm text-start" >Aquí podrás ver todas las reservas realizadas hoy en tiempo real. <strong>Para cargar más reservas, simplemente desplázate hacia abajo.</strong></p>
                    </div>
                </div>

                <div className='flex mt-4 justify-between items-center '>
                    <div className="px-2 leading-6">
                        <div className="relative mx-auto flex w-full max-w-4xl items-center justify-between rounded-md border shadow-sm">
                            <IoSearchOutline className="absolute left-2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                name="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-14 w-full rounded-md py-4 pr-12 pl-12 outline-none focus:ring-2"
                                placeholder="Habitacion, codigo de acceso, numero de habitacion:"
                            />
                            <div className='flex gap-2 items-center px-2'>
                                {searchFilter && (
                                    <IoCloseOutline
                                        size={30}
                                        className="text-red-600 cursor-pointer"
                                        onClick={cleanInputSearch}
                                    />
                                )}
                                <button
                                    type="button"
                                    onClick={handleSearch}
                                    className="inline-flex h-8 items-center justify-center rounded-lg bg-blue-600 px-4 font-medium text-white hover:bg-gray-700"
                                >
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </div>




                    <div className="relative mr-4 overflow-hidden rounded-xl shadow border-t-4 border-yellow-400 bg-white">
                        <div className="py-2 px-6">
                            <div className="flex items-center">
                                <h3 className="relative ml-2 inline-block text-md font-bold leading-none">
                                    {
                                        loadingTotalBooking
                                            ? (
                                                <div className='bg-gray-400 animate-pulse px-3 py-3 rounded-md' >

                                                </div>

                                            ) : (
                                                totalBooking
                                            )
                                    }
                                </h3>
                                <span className="ml-3 text-base font-medium capitalize">Reservas en espera</span>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="mx-auto px-2 mt-5 mb-5">
                    <div className="mt-6 rounded-xl bg-white shadow">
                        <div className="overflow-x-auto">
                            <div className="max-h-[500px] custom-scrollbar-table overflow-y-auto" onScroll={handleScroll}>
                                <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                                    {/* Cabecera de la tabla */}
                                    <thead className="bg-gray-100 border-b sticky top-0 z-10">
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
                                                    >
                                                        <td className="whitespace-no-wrap py-4 text-center text-sm text-gray-600 sm:px-3 ">
                                                            {reservation.accessCode}
                                                        </td>
                                                        <td className="whitespace-no-wrap hidden text-center  py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                            {reservation.title} - Nro° {reservation.roomNumber}
                                                        </td>
                                                        <td className="whitespace-no-wrap text-center  hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                            {formatDateWithHours(new Date(reservation.arrivalDate!))}
                                                        </td>
                                                        <td className="whitespace-no-wrap text-center  hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                                                            <span className={`rounded-md px-2 py-1 text-xs font-medium ${reservation.status === 'en_espera' ? 'bg-yellow-200 text-yellow-600' : ''}`}>
                                                                En espera
                                                            </span>
                                                        </td>
                                                    </motion.tr>
                                                ))
                                            ) : (

                                                searchFilter === ''
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
                                    <div className="py-4 text-center flex justify-center gap-2 text-sm text-gray-600">
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
            </div>
        </>
    );
};
