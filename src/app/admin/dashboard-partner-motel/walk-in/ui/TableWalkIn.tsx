'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SheedWalkIn, SkeletonTableCheckIn } from '@/components';
import { roomAddService } from '@/interfaces';
import { currencyFormat, formatDate } from '@/utils';
import { motion } from 'framer-motion';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';

interface Props {
    motelId: string;
    roomsInAviable: number;
}

export const TableWalkIn = ({ motelId, roomsInAviable }: Props) => {

    const [isOpenSheedWalkIn, setIsOpenSheedWalkIn] = useState(false);

    const [rooms, setRooms] = useState<roomAddService[]>([]);
    const [roomSelected, setRoomSelected] = useState<roomAddService>();
    const [isLoading, setIsLoading] = useState(true);
    const [searchFilter, setSearchFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [loadingScroll, setLoadingScroll] = useState(false);
    const [loadingTotalBooking, setLoadingTotalBooking] = useState(true);

    const searchFilterRef = useRef(searchFilter);

    useEffect(() => {
        searchFilterRef.current = searchFilter;
    }, [searchFilter]);

    const fetchReservations = useCallback(async () => {
        setIsFetching(true);
        // const data = await getRoomsInAvailableByMotel({ motelId, searchFilter, page, limit: 10 });
        // if (data.ok && data.totalCount !== undefined) {
        //     setRooms((prev) => {
        //         const existingReservations = new Set(prev.map((r) => r.id));
        //         const newReservations = data.rooms.filter((r) => !existingReservations.has(r.id));
        //         return [...prev, ...newReservations];
        //     });
        //     setHasMore(data.rooms.length === 10);
        // }
        setIsFetching(false);
        setIsLoading(false);
    }, [motelId, searchFilter, page]);

    useEffect(() => {
        fetchReservations();
        setLoadingTotalBooking(false);
    }, [searchFilter]);

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
        setRooms([]);
        handleFilterChange(searchQuery);
    };

    const cleanInputSearch = async () => {
        setIsLoading(true);
        setSearchFilter('');
        setSearchQuery('');
        setPage(1);
        setRooms([]);
    };
    return (
        <>

            <SheedWalkIn
                isOpen={isOpenSheedWalkIn}
                room={roomSelected!}
                onClose={() => setIsOpenSheedWalkIn(false)}
            />

            <div className="bg-gray-50 py-5 mt-10 rounded-lg">
                <div className='mt-2  mb-6' >
                    <div className="flex items-center px-5 justify-between">
                        <h1 className=" text-2xl font-bold text-gray-900">Gestión de entrada</h1>
                        <p className="text-lg  font-medium">{formatDate(new Date())}</p>
                    </div>

                    <div className="ml-5">
                        <p className="text-gray-500 text-sm text-start">
                            Aquí podrás ver todas las habitaciones disponibles para servicios sin reservas. <strong>Para cargar más habitaciones, simplemente desplázate hacia abajo.</strong>
                        </p>
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
                                                roomsInAviable
                                            )
                                    }
                                </h3>
                                <span className="ml-3 text-base font-medium capitalize">Habitaciones disponibles</span>
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
                                            <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Habitacion</th>
                                            <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Precio</th>
                                            <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Promocion</th>
                                            <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Precio de promocion</th>
                                            <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Tiempo de uso</th>
                                        </tr>
                                    </thead>
                                    {/* Cuerpo de la tabla con scroll vertical */}
                                    <tbody className="bg-white lg:border-gray-300">
                                        {!isLoading && (
                                            rooms.length > 0 ? (
                                                rooms.map((room) => (
                                                    <motion.tr
                                                        key={room.id}
                                                        initial={{ opacity: 0, x: -100 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 100 }}
                                                        transition={{ duration: 0.3 }}
                                                        onClick={() => {
                                                            setIsOpenSheedWalkIn(true),
                                                                setRoomSelected(room)
                                                        }}
                                                        className='hover:bg-gray-200 cursor-pointer'
                                                    >
                                                        <td className="whitespace-no-wrap py-4 text-center text-sm text-gray-600 sm:px-3 ">
                                                            {room.title} - Nro° {room.roomNumber}
                                                        </td>
                                                        <td className="whitespace-no-wrap hidden text-center  py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                            {currencyFormat(room.price)}
                                                        </td>
                                                        <td className="whitespace-no-wrap hidden text-center  py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                            {room.promoActive ? (
                                                                <span className='mx-2 text-white bg-blue-600 p-2 text-xs rounded-full font-normal'>Activada</span>
                                                            ) : (
                                                                <span className='mx-2 p-2 bg-red-600 rounded-full text-white text-xs font-normal'>Desactivada</span>
                                                            )}
                                                        </td>
                                                        <td className=" text-sm text-center text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                                            {room.promoActive && room.promoPrice ? (
                                                                <div className="flex justify-center items-center gap-2">
                                                                    <span>
                                                                        {currencyFormat(room.promoPrice)}
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <p className="font-bold text-lg">-</p>
                                                            )}
                                                        </td>
                                                        <td className="whitespace-no-wrap text-center  hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                            {room.timeLimit} horas
                                                        </td>
                                                    </motion.tr>
                                                ))
                                            ) : (

                                                searchFilter === ''
                                                    ? (
                                                        <tr>
                                                            <td colSpan={5} className="py-4 text-center text-sm text-gray-600">
                                                                No hay habitaciones disponibles.
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={5} className="py-4 text-center text-sm text-gray-600">
                                                                No se encontraron habitaciones.
                                                            </td>
                                                        </tr>
                                                    )
                                            )
                                        )}

                                        {
                                            isLoading && (
                                                <tr>
                                                    <td colSpan={5}>
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
                                        Cargando más habitaciones...
                                    </div>
                                )}
                                {!hasMore && !isFetching && rooms.length > 0 && (
                                    <div className="py-4 text-center text-sm text-gray-600">
                                        No hay más habitaciones disponibles.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
