'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { serviceAdmin } from '@/interfaces/reservation.interface';
import { formatDate, formatDateWithHours } from '@/utils';
import { motion } from 'framer-motion';
import { SheedDetailService, SkeletonTableCheckIn } from '@/components';
import { FilterTableServices } from './FilterTableServices';
import { ServiceData } from '@/interfaces';

interface Props {
    motelId: string;
    serviceDataToday: ServiceData;
}



export const TableWalkInToday = ({ motelId, serviceDataToday }: Props) => {
    const [services, setServices] = useState<serviceAdmin[]>([]);
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
        // const data = await getServiceByMotelToday({ motelId, searchQuery, statusFilter, date, page, limit: 10 });
        // if (data.ok && data.totalCount !== undefined) {
        //     setServices((prev) => {
        //         const existingReservations = new Set(prev.map((r) => r.id));
        //         const newReservations = data.services.filter((r) => !existingReservations.has(r.id));
        //         return [...prev, ...newReservations];
        //     });
        //     setHasMore(data.services.length === 10);
        // }
        setIsFetching(false);
        setIsLoading(false);
    }, [motelId, searchQuery, statusFilter, date, page]);


    useEffect(() => {
        fetchReservations();
        setLoadingTotalBooking(false);
    }, [fetchReservations, searchQuery, statusFilter, date]);

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
        setServices([]);
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
                        <div className='col-span-6'>
                            <h1 className="text-2xl font-bold text-gray-900">Gestión de servicios {formatDate(new Date())}</h1>
                            <p className="text-xs text-gray-500">
                                Aquí podrás ver todos los servicios el dia de hoy en tiempo real. <strong>Para cargar más servicios, simplemente desplázate hacia abajo.</strong>
                            </p>
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
                                                                {serviceDataToday.totalServices}
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

                <div className='flex justify-start gap-1 px-2' >
                    <div className="mr-4 overflow-hidden rounded-xl shadow border-t-4 border-blue-400 bg-white">
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
                                                        {serviceDataToday.startedServices}
                                                    </>
                                                )
                                        }
                                    </h3>
                                </div>
                                <span className="text-sm font-medium capitalize">Reservas iniciadas</span>
                            </div>

                        </div>
                    </div>

                    <div className="mr-4 overflow-hidden rounded-xl shadow border-t-4 border-green-400 bg-white">
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
                                                        {serviceDataToday.completedServices}
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
                    <FilterTableServices
                        onFilterChange={handleFilterChange}
                        isToday={true}
                    />
                </div>

                <div className="mx-auto px-2 mt-5 mb-5">
                    <div className="mt-6 rounded-xl bg-white shadow">
                        <div className="overflow-x-auto">
                            <div className="max-h-[500px] custom-scrollbar-table overflow-y-auto" onScroll={handleScroll}>
                                <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                                    {/* Cabecera de la tabla */}
                                    <thead className="bg-gray-100 border-b sticky top-0 z-10">
                                        <tr>
                                            <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Habitación</th>
                                            <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Hora de entrada</th>
                                            <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Hora de salida</th>
                                            <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Estado</th>
                                        </tr>
                                    </thead>
                                    {/* Cuerpo de la tabla con scroll vertical */}
                                    <tbody className="bg-white lg:border-gray-300">
                                        {!isLoading && (
                                            services.length > 0 ? (
                                                services.map((service) => (
                                                    <motion.tr
                                                        key={service.id}
                                                        initial={{ opacity: 0, x: -100 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 100 }}
                                                        transition={{ duration: 0.3 }}
                                                        onClick={() => OpenDetailReservation(service.id!, service.title!)}
                                                        className='hover:bg-gray-100 cursor-pointer'
                                                    >
                                                        <td className="whitespace-no-wrap hidden text-center  py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                            {service.title} - Nro° {service.roomNumber}
                                                        </td>
                                                        <td className="whitespace-no-wrap text-center  hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                            {formatDateWithHours(new Date(service.arrivalDate!))}
                                                        </td>
                                                        <td className="whitespace-no-wrap text-center  hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                            {formatDateWithHours(new Date(service.departureDate!))}
                                                        </td>
                                                        <td className="whitespace-no-wrap text-center  hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">

                                                            {
                                                                service.status === 'en_espera' && (
                                                                    <span className="rounded-md px-2 py-1 text-xs font-medium bg-yellow-500 text-white" >
                                                                        En espera
                                                                    </span>
                                                                )
                                                            }

                                                            {
                                                                service.status === 'completado' && (
                                                                    <span className="rounded-md px-2 py-1 text-xs font-medium bg-green-600 text-white" >
                                                                        Completado
                                                                    </span>
                                                                )
                                                            }

                                                            {
                                                                service.status === 'iniciado' && (
                                                                    <span className="rounded-md px-2 py-1 text-xs font-medium bg-blue-600 text-white" >
                                                                        Iniciado
                                                                    </span>
                                                                )
                                                            }

                                                            {
                                                                service.status === 'cancelado' && (
                                                                    <span className="rounded-md px-2 py-1 text-xs font-medium bg-red-600 text-white" >
                                                                        Cancelado
                                                                    </span>
                                                                )
                                                            }


                                                            {
                                                                service.status === 'no_iniciado' && (
                                                                    <span className="rounded-md px-2 py-1 text-xs font-medium bg-gray-600 text-white" >
                                                                        No inciado
                                                                    </span>
                                                                )
                                                            }


                                                        </td>
                                                    </motion.tr>
                                                ))
                                            ) : (

                                                <tr>
                                                    <td colSpan={4} className="py-4 text-center text-sm text-gray-600">
                                                        No se encontraron reservas.
                                                    </td>
                                                </tr>
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
                                {!hasMore && !isFetching && services.length > 0 && (
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
