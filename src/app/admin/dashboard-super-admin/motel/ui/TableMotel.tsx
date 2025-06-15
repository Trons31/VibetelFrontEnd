'use client';
import React, { useCallback, useEffect, useState } from 'react'
import { ModalStatusMotel, PaginationTable, SheedValidateDataMotel, SkeletonTableRoom, } from '@/components';
import { isApprovedStatus, Motel } from '@/interfaces'
import Link from 'next/link';
import { getMotels } from '@/actions';
import { formatDateWithHours } from '@/utils';
import toast, { Toaster } from 'react-hot-toast';
import { FilterTableMotel } from './FilterTableMotel';
import { FaBuildingUser } from 'react-icons/fa6';
import clsx from 'clsx';



export const TableMotel = () => {

    const [modalStatusMotel, setModalStatusMotel] = useState(false);

    const [statusMotel, setStatusMotel] = useState<isApprovedStatus>("PENDING");
    const [motelId, setMotelId] = useState("");
    const [motelName, setMotelName] = useState("");
    const [motelMail, setMotelMail] = useState("");

    const [motels, setMotels] = useState<Motel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCountResultsFilter, setTotalCountResultsFilter] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [sheedValidateDataMotel, setSheedValidateDataMotel] = useState(false);

    const [city, setCity] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [query, setQuery] = useState('');
    const [isApproved, setIsApproved] = useState('');


    const fetchMotels = useCallback(async () => {
        setIsLoading(true);
        const data = await getMotels({
            page: currentPage,
            city,
            searchTerm,
            isApproved,
            itemsPerPage
        });
        if (data.ok && data.totalCount !== undefined) {
            const { motels, totalCount } = data;
            setMotels(motels);
            setTotalCountResultsFilter(totalCount);
            const totalPagesCount = Math.ceil(totalCount / itemsPerPage);
            setTotalPages(totalPagesCount);
        }
        setIsLoading(false);
    }, [city, searchTerm, isApproved, itemsPerPage]);


    useEffect(() => {
        fetchMotels();
    }, [fetchMotels]);


    const handleFilterCategory = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros
    };

    const handleFilterGarage = (isApproved: string) => {
        setIsApproved(isApproved);
        setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const cleanInputSearch = () => {
        setQuery("");
        setSearchTerm("");
    }

    const handleSearch = () => {
        if (query !== '') {
            setSearchTerm(query);
            setCurrentPage(1);
        }
    };

    const handleChangeStatusMotel = (status: isApprovedStatus, motelId: string, motel: string, mailMotel: string) => {
        setStatusMotel(status);
        setMotelMail(mailMotel);
        setMotelName(motel);
        setMotelId(motelId);
        setModalStatusMotel(true);
    }

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Resetea la página actual al cambiar el número de elementos por página
    };

    const isFiltering = searchTerm;

    return (
        <>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <SheedValidateDataMotel
                isOpen={sheedValidateDataMotel}
                onClose={() => setSheedValidateDataMotel(false)}
            />

            <FilterTableMotel
                query={query}
                state={isApproved}
                setState={setIsApproved}
                setQuery={setQuery}
                cleanInputSearch={cleanInputSearch}
                handleSearch={handleSearch}
            />

            <ModalStatusMotel
                isOpen={modalStatusMotel}
                mail={motelMail}
                motelId={motelId}
                motel={motelName}
                currentState={statusMotel}
                onClose={() => setModalStatusMotel(false)}
            />

            <div className="mb-10 mx-5 mt-2 overflow-x-auto">
                <table className="min-w-full shadow-sm ">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Nombre
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Estado
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Ubicacion
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Creacion
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Accion
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-50">
                        {
                            !isLoading && (
                                motels.length > 0 && (
                                    motels.map(motel => (
                                        <tr
                                            key={motel.id}
                                            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <Link href={`/admin/dashboard-partner-motel/room/`} target="_blank" rel="noopener noreferrer" className="hover:underline" >
                                                    {motel.title}
                                                </Link>
                                            </td>
                                            <td className=" text-sm  text-white flex items-center gap-1 font-light px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleChangeStatusMotel(motel.isApproved, motel.id, motel.title, motel.contactEmail)}
                                                    className={
                                                        clsx(
                                                            {
                                                                'bg-black p-2 rounded-lg hover:bg-gray-700': motel.isApproved === "DISABLED",
                                                                'bg-blue-600 p-2 rounded-lg hover:bg-blue-700': motel.isApproved === "PENDING",
                                                                'bg-green-600 p-2 rounded-lg hover:bg-green-700': motel.isApproved === "APPROVED",
                                                                'bg-yellow-600 p-2 rounded-lg hover:bg-yellow-700': motel.isApproved === "DATA_CORRECTION",
                                                            }
                                                        )
                                                    }
                                                >
                                                    {
                                                        motel.isApproved === "PENDING" && "En espera"
                                                    }
                                                    {
                                                        motel.isApproved === "APPROVED" && "Aprobado"
                                                    }
                                                    {
                                                        motel.isApproved === "DATA_CORRECTION" && "En corrección de información"
                                                    }
                                                    {
                                                        motel.isApproved === "DISABLED" && "Desactivado"
                                                    }
                                                </button>
                                            </td>
                                            <td className=" text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                                {motel.city}, {motel.department}, {motel.country}
                                            </td>
                                            <td className=" text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                                {formatDateWithHours(motel.createAt!)}
                                            </td>
                                            <td className=" text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => setSheedValidateDataMotel(true)}
                                                    className='underline' >
                                                    validar informacion
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )
                            )

                        }
                    </tbody>
                </table>



                {
                    isLoading && (
                        <SkeletonTableRoom />
                    )
                }

                {
                    !isLoading && (
                        motels.length === 0 && isFiltering && (
                            <div className='flex justify-center px-5 items-center py-10'>
                                <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md">
                                    <FaBuildingUser size={50} className="text-gray-500 dark:text-gray-400" />
                                    <h3 className="text-xl font-medium mt-4 text-gray-700 dark:text-gray-200">
                                        Motel no encontrado
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                                        Lo sentimos, no hemos podido encontrar el motel que estás buscando. Por favor, intenta con una búsqueda diferente o revisa más tarde.
                                    </p>
                                </div>
                            </div>

                        )
                    )
                }

                {
                    !isLoading && (
                        motels.length === 0 && !isFiltering && (
                            <div className='flex justify-center px-5 items-center py-10'>
                                <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md">
                                    <FaBuildingUser size={50} className="text-gray-500 dark:text-gray-400" />
                                    <h3 className="text-xl font-medium mt-4 text-gray-700 dark:text-gray-200">
                                        No hay moteles registrados
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                                        Actualmente no hay moteles registrados en nuestra plataforma.
                                    </p>
                                </div>
                            </div>
                        )
                    )
                }


                {
                    motels.length > 0 && (
                        <PaginationTable
                            currentPage={currentPage}
                            totalItems={motels.length}
                            onItemsPerPageChange={(value) => handleItemsPerPageChange(value)}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            itemsPerPage={itemsPerPage}
                        />
                    )
                }

            </div>
        </>
    )
}
