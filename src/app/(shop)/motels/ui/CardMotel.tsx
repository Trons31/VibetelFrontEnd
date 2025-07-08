"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FilterUiMotel } from './FilterUiMotel'
import { InputSearchMotelMovil, SkeletonMotels, GridAllMotel, Pagination } from '@/components';
import { MotelApi, searchCity } from '@/interfaces';
import { VscSearchStop } from 'react-icons/vsc';
import { MdOutlineDoNotDisturbAlt } from 'react-icons/md';
import axios from 'axios';

interface Props {
    location: searchCity | undefined;
}

export const CardMotel = ({ location }: Props) => {

    const [motelsInLocation, setMotelsInLocation] = useState<MotelApi[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const fetchRooms = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get<{ motels: MotelApi[], total: number }>(`${process.env.NEXT_PUBLIC_API_ROUTE}motel`);
            setMotelsInLocation(response.data.motels);
        } catch (error: any) {
            setMotelsInLocation([]);
            console.error("Error al cargar habitaciones:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        setCurrentPage(1);
    };

    const filteredMotels = useMemo(() => {
        if (!searchTerm.trim()) return motelsInLocation;

        return motelsInLocation.filter((motel) =>
            motel.razonSocial.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [motelsInLocation, searchTerm]);

    const paginatedMotels = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredMotels.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredMotels, currentPage]);

    useEffect(() => {
        setTotalPages(Math.ceil(filteredMotels.length / itemsPerPage));
    }, [filteredMotels]);

    return (
        <>
            <div className='px-2 md:px-24 mt-7 mb-7'>
                <h1 className="font-bold text-2xl">Moteles</h1>
                <p className='text-xs text-gray-800 font-light'>
                    Explore todos los moteles registrados en su área. Encuentre la privacidad y comodidad que busca en los moteles registrados en tu zona.
                </p>
            </div>

            <FilterUiMotel
                onSearch={(searchTerm) => handleSearch(searchTerm)}
                location={location?.city}
            />

            <div className='px-2'>
                <InputSearchMotelMovil
                    onSearchTerm={(searchTerm) => handleSearch(searchTerm)}
                    location={location?.city}
                />
            </div>

            {
                isLoading
                    ? (
                        <div className="grid grid-cols md:grid-cols-3 xl:grid-cols-4 gap-0 md:gap-10 p-2 md:px-24">
                            <SkeletonMotels />
                            <SkeletonMotels />
                            <SkeletonMotels />
                            <SkeletonMotels />
                        </div>
                    ) : (
                        filteredMotels.length > 0
                            ? (
                                <>
                                    <GridAllMotel motels={paginatedMotels} />
                                    <div className='mb-10 mt-14'>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                </>
                            ) : (
                                searchTerm === ""
                                    ? (
                                        <div className='flex justify-center py-10 px-5 items-center'>
                                            <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
                                                <MdOutlineDoNotDisturbAlt size={50} />
                                                <h3 className="text-md md:text-xl font-semibold mt-4 text-black">No se encontraron moteles en esta ubicación</h3>
                                                <p className="text-gray-700 text-xs md:text-md mt-2">
                                                    Lo sentimos, no hemos encontrado moteles disponibles en la ubicación que ingresaste. Intenta con otra dirección o ciudad cercana.
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='flex justify-center py-10 px-5 items-center'>
                                            <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
                                                <VscSearchStop size={50} />
                                                <h3 className="text-md md:text-xl font-semibold mt-4 text-black">No se encontraron moteles</h3>
                                                <p className="text-gray-700 text-xs md:text-md mt-2">
                                                    Lo sentimos, no hemos podido encontrar ningún motel que coincida con tu búsqueda.
                                                </p>
                                            </div>
                                        </div>
                                    )
                            )
                    )
            }
        </>
    )
}
