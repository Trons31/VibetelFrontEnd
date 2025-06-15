"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { FilterUiMotel } from './FilterUiMotel'
import { InputSearchMotelMovil, SkeletonMotels, GridAllMotel, Pagination } from '@/components';
import { MotelAllApi,searchCity } from '@/interfaces';
import { VscSearchStop } from 'react-icons/vsc';

interface Props {
    location: searchCity | undefined;
    motels: MotelAllApi[];
}


export const CardMotel = ({ location, motels }: Props) => {


    const [motelsInLocation, setMotels] = useState<MotelAllApi[]>(motels);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCountResultsFilter, setTotalCountResultsFilter] = useState(0);
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        setIsLoading(false);
    }, [])


    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        setCurrentPage(1); // Resetear la página al realizar una nueva búsqueda
    };

    return (
        <>
            <div className='px-2 md:px-24 mt-7 mb-7'>
                <h1 className="font-bold text-2xl" >Moteles</h1>
                <p className='text-xs text-gray-800 font-light'>
                    Explore todos los moteles registrados en su área. Encuentre la privacidad y comodidad que busca en los moteles registrados en tu zona.
                </p>
            </div>

            <FilterUiMotel
                onSearch={(searchTerm) => handleSearch(searchTerm)}
                location={location?.city}
            />

            <div className='px-2' >
                <InputSearchMotelMovil
                    onSearchTerm={(searchTerm) => handleSearch(searchTerm)}
                    location={location?.city}
                />
            </div>
            {
                isLoading
                    ? (
                        <>
                            <div className="grid grid-cols md:grid-cols-3 gap-10  p-2 md:px-24">
                                <SkeletonMotels />
                                <SkeletonMotels />
                                <SkeletonMotels />
                            </div>
                        </>
                    ) : (
                        motels.length > 0
                            ? (
                                <>
                                    <GridAllMotel motels={motels} />
                                    <div className='mb-10 mt-14' >
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className='flex justify-center py-10 px-5 items-center '>
                                    <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200  rounded-lg shadow-md">
                                        <VscSearchStop size={50} />
                                        <h3 className="text-md md:text-xl font-semibold mt-4 text-black ">No se encontraron moteles</h3>
                                        <p className="text-gray-700 text-xs md:text-md mt-2">
                                            Lo sentimos, no hemos podido encontrar ningún motel que coincida con tu búsqueda.
                                        </p>
                                    </div>
                                </div>
                            )
                    )
            }
        </>
    )
}
