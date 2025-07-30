'use client';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { PaginationTable, RoomImageAdmin, SkeletonTableRoom } from '@/components';
import { CategoryRoomApi, GarageRoomApi, RoomApi } from '@/interfaces';
import { currencyFormat } from '@/utils';
import { FaCheckCircle } from 'react-icons/fa';
import { IoCaretDownOutline, IoCaretUp, IoTimerSharp } from 'react-icons/io5';
import { TbBedOff } from 'react-icons/tb';
import clsx from 'clsx';
import { FilterTableRoom } from './FilterTableRoom';
import axios from 'axios';

interface Props {
    accessToken: string;
    garageRoom: GarageRoomApi[];
    categoryRoom: CategoryRoomApi[];
}

export const TableRoom = ({ accessToken, garageRoom, categoryRoom }: Props) => {
    const [allRooms, setAllRooms] = useState<RoomApi[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCountResultsFilter, setTotalCountResultsFilter] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [category, setCategory] = useState("");
    const [garage, setGarage] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [query, setQuery] = useState('');
    const [orderPrice, setOrderPrice] = useState('');
    const [onSale, setOnSale] = useState('');
    const [inAvailable, setInAvailable] = useState('');
    const [orderMostReserved, setOrderMostReserved] = useState('');

    // Obtener todas las habitaciones
    const fetchRooms = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get<RoomApi[]>(
                `${process.env.NEXT_PUBLIC_API_ROUTE}room`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setAllRooms(response.data);
            setTotalCountResultsFilter(response.data.length);
            setTotalPages(Math.ceil(response.data.length / itemsPerPage));
        } catch (error) {
            console.error('Error fetching rooms:', error);
        } finally {
            setIsLoading(false);
        }
    }, [accessToken, itemsPerPage]);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    // Aplicar filtros y ordenamiento
    const filteredRooms = useMemo(() => {
        let result = [...allRooms];

        // Filtros (no ordenamientos)
        if (category) result = result.filter(room => room.category.id === category);
        if (garage) result = result.filter(room => room.garage.id === garage);
        if (searchTerm) {
            result = result.filter(room =>
                room.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Ordenamientos
        if (orderPrice === 'asc') result.sort((a, b) => a.price - b.price);
        if (orderPrice === 'desc') result.sort((a, b) => b.price - a.price);

        if (onSale === 'asc') result.sort((a, b) => Number(b.promoActive) - Number(a.promoActive));
        if (onSale === 'desc') result.sort((a, b) => Number(a.promoActive) - Number(b.promoActive));

        if (inAvailable === 'asc') result.sort((a, b) => Number(b.inAvailable) - Number(a.inAvailable));
        if (inAvailable === 'desc') result.sort((a, b) => Number(a.inAvailable) - Number(b.inAvailable));

        // if (orderMostReserved === 'asc') result.sort((a, b) => (a.reservationsCount || 0) - (b.reservationsCount || 0));
        // if (orderMostReserved === 'desc') result.sort((a, b) => (b.reservationsCount || 0) - (a.reservationsCount || 0));

        setTotalCountResultsFilter(result.length);
        setTotalPages(Math.ceil(result.length / itemsPerPage));

        return result;
    }, [allRooms, category, garage, searchTerm, orderPrice, onSale, inAvailable, orderMostReserved, itemsPerPage]);

    const paginatedRooms = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredRooms.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredRooms, currentPage, itemsPerPage]);

    // Handlers
    const handleSortByPromotion = (promotion: string) => {
        if (onSale === promotion) {
            setOnSale('');
        } else {
            setOrderPrice('');
            setInAvailable('');
            setOrderMostReserved('');
            setOnSale(promotion);
        }
        setCurrentPage(1);
    };

    const handleSortByPrice = (order: string) => {
        if (orderPrice === order) {
            setOrderPrice('');
        } else {
            setOnSale('');
            setInAvailable('');
            setOrderMostReserved('');
            setOrderPrice(order);
        }
        setCurrentPage(1);
    };

    const handleSortByStatus = (status: string) => {
        if (inAvailable === status) {
            setInAvailable('');
        } else {
            setOnSale('');
            setOrderPrice('');
            setOrderMostReserved('');
            setInAvailable(status);
        }
        setCurrentPage(1);
    };

    const handleSortByMostReserved = (order: string) => {
        if (orderMostReserved === order) {
            setOrderMostReserved('');
        } else {
            setOnSale('');
            setOrderPrice('');
            setInAvailable('');
            setOrderMostReserved(order);
        }
        setCurrentPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleSearch = () => {
        setSearchTerm(query);
        setCurrentPage(1);
    };

    const cleanInputSearch = () => {
        setQuery("");
        setSearchTerm("");
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const isFiltering = category || garage || orderPrice || inAvailable || onSale || orderMostReserved || searchTerm;

    return (
        <>
            <div className="flex justify-end w-full px-2 md:px-8" >
                <div className="flex bg-gray-200 rounded-full py-2 px-3 w-fit" >
                    <p className="font-normal text-xs md:text-sm" >{allRooms.length} Habitaciones registradas</p>
                </div>
            </div>

            <FilterTableRoom
                query={query}
                setQuery={setQuery}
                cleanInputSearch={cleanInputSearch}
                handleSearch={handleSearch}
                category={category}
                setCategory={setCategory}
                garage={garage}
                setGarage={setGarage}
                categoryRoom={categoryRoom}
                garageRoom={garageRoom}
            />

            <div className="mx-5 mt-2 overflow-x-auto">
                <table className="min-w-full shadow-sm">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-xs md:text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Imagen
                            </th>
                            <th scope="col" className="text-xs md:text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                Nombre
                            </th>
                            <th scope="col" className="text-xs md:text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                <div className='flex justify-center items-center gap-2'>
                                    Estado
                                    <div className='flex flex-col items-center'>
                                        <button onClick={() => handleSortByStatus('asc')}>
                                            <IoCaretUp size={12}
                                                className={clsx({
                                                    "text-red-600": inAvailable === 'asc'
                                                })}
                                            />
                                        </button>
                                        <button onClick={() => handleSortByStatus('desc')}>
                                            <IoCaretDownOutline size={12} className={clsx(
                                                '-mt-1', {
                                                "text-red-600": inAvailable === 'desc'
                                            })} />
                                        </button>
                                    </div>
                                </div>
                            </th>
                            <th scope="col" className="text-xs md:text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                <div className='flex justify-center items-center gap-2'>
                                    Precio
                                    <div className='flex flex-col items-center'>
                                        <button onClick={() => handleSortByPrice('asc')}>
                                            <IoCaretUp size={12}
                                                className={clsx({
                                                    "text-red-600": orderPrice === 'asc'
                                                })}
                                            />
                                        </button>
                                        <button onClick={() => handleSortByPrice('desc')}>
                                            <IoCaretDownOutline size={12} className={clsx(
                                                '-mt-1', {
                                                "text-red-600": orderPrice === 'desc'
                                            })} />
                                        </button>
                                    </div>
                                </div>
                            </th>
                            <th scope="col" className="text-xs md:text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                <div className='flex justify-center items-center gap-2'>
                                    Promoción
                                    <div className='flex flex-col items-center'>
                                        <button onClick={() => handleSortByPromotion('asc')}>
                                            <IoCaretUp size={12}
                                                className={clsx({
                                                    "text-red-600": onSale === 'asc'
                                                })}
                                            />
                                        </button>
                                        <button onClick={() => handleSortByPromotion('desc')}>
                                            <IoCaretDownOutline size={12} className={clsx(
                                                '-mt-1', {
                                                "text-red-600": onSale === 'desc'
                                            })} />
                                        </button>
                                    </div>
                                </div>
                            </th>
                            <th scope="col" className="text-xs md:text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                Precio de promoción
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-50">
                        {!isLoading && paginatedRooms.length > 0 && (
                            paginatedRooms.map(room => (
                                <tr key={room.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td className=" md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <Link href={`/admin/dashboard-partner-motel/room/${room.slug}`} target="_blank" rel="noopener noreferrer" className='flex justify-start'>
                                            <RoomImageAdmin
                                                src={room.images.length > 0
                                                    ? room.images[0].url
                                                    : ""}
                                                width={300}
                                                height={100}
                                                alt={room.title}
                                                className="w-24 h-24 object-cover rounded-lg"
                                            />
                                        </Link>
                                    </td>
                                    <td className="text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <Link href={`/admin/dashboard-partner-motel/room/${room.slug}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-xs md:text-sm">
                                            {room.title}
                                        </Link>
                                    </td>
                                    <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {room.inAvailable ? (
                                            <div className="flex justify-center items-center gap-2">
                                                <FaCheckCircle className='h-4 w-4 text-green-700' />
                                                <span className='mx-2 text-green-700'>Disponible</span>
                                            </div>
                                        ) : (
                                            <div className="flex justify-center items-center gap-2">
                                                <IoTimerSharp className='h-5 w-5 text-red-700' />
                                                <span className='mx-2 text-red-700'>No disponible</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="text-sm text-center text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                        {currencyFormat(room.price)}
                                    </td>
                                    <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {room.promoActive ? (
                                            <span className='mx-2 text-white bg-blue-600 p-2 text-xs rounded-full font-normal'>Activada</span>
                                        ) : (
                                            <span className='mx-2 p-2 bg-red-600 rounded-full text-white text-xs font-normal'>Desactivada</span>
                                        )}
                                    </td>
                                    <td className="text-sm text-center text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                        {room.promoActive ? (
                                            <div className="flex justify-center items-center gap-2">
                                                <span>
                                                    {currencyFormat(room.promoPrice!)}
                                                </span>
                                            </div>
                                        ) : (
                                            <p className="font-bold text-lg">-</p>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {isLoading && <SkeletonTableRoom />}

                {!isLoading && paginatedRooms.length === 0 && isFiltering && (
                    <div className='flex justify-center px-5 items-center py-10'>
                        <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
                            <TbBedOff size={50} className="text-gray-500" />
                            <h3 className="text-md md:text-xl font-semibold mt-4 text-black">
                                Habitación no encontrada
                            </h3>
                            <p className="text-xs md:text-lg text-gray-700 mt-2">
                                Lo sentimos, no hemos podido encontrar la habitación que estás buscando. Por favor, intenta con una búsqueda diferente o revisa más tarde.
                            </p>
                        </div>
                    </div>
                )}

                {!isLoading && allRooms.length > 0 && (
                    <PaginationTable
                        currentPage={currentPage}
                        totalItems={filteredRooms.length}
                        onItemsPerPageChange={handleItemsPerPageChange}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        itemsPerPage={itemsPerPage}
                    />
                )}

                {!isLoading && allRooms.length === 0 && !isFiltering && (
                    <div className='flex justify-center px-5 items-center py-10'>
                        <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
                            <TbBedOff size={50} className="text-gray-500" />
                            <h3 className="text-md md:text-xl font-semibold mt-4 text-black">
                                Aún no se han registrado habitaciones
                            </h3>
                            <p className="text-xs md:text-lg text-gray-700 mt-2">
                                Para activar tu motel, es necesario registrar al menos 10 habitaciones.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};