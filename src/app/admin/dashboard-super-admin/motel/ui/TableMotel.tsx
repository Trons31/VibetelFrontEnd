'use client';
import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { ModalStatusMotel, PaginationTable, SheedValidateDataMotel, SkeletonTableRoom, } from '@/components';
import { isApprovedStatus, MotelAllApi, MotelApi } from '@/interfaces'
import Link from 'next/link';
import { formatDateWithHours } from '@/utils';
import toast, { Toaster } from 'react-hot-toast';
import { FilterTableMotel } from './FilterTableMotel';
import { FaBuildingUser } from 'react-icons/fa6';
import clsx from 'clsx';
import axios from 'axios';

interface Props {
    accessToken: string;
}

export const TableMotel = ({ accessToken }: Props) => {

    const [modalStatusMotel, setModalStatusMotel] = useState(false);

    const [statusMotel, setStatusMotel] = useState<isApprovedStatus>("PENDING");
    const [motelId, setMotelId] = useState("");
    const [motelName, setMotelName] = useState("");

    const [allMotels, setAllMotels] = useState<MotelAllApi[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [sheedValidateDataMotel, setSheedValidateDataMotel] = useState(false);

    // Estados para los filtros
    const [searchTerm, setSearchTerm] = useState(''); // Para búsqueda por nombre
    const [isApproved, setIsApproved] = useState(''); // Para filtro por estado de aprobación
    const [query, setQuery] = useState('');

    const fetchMotels = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get<MotelAllApi[]>(
                `${process.env.NEXT_PUBLIC_API_ROUTE}motel/super-admin/all-complete`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setAllMotels(response.data);
        } catch (error: any) {
            setAllMotels([]);
            console.error("Error al cargar moteles:", error);
            toast.error("Error al cargar los moteles.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMotels();
    }, [fetchMotels]);

    // 2. Lógica de Filtrado en el Frontend
    const filteredMotels = useMemo(() => {
        let currentMotels = [...allMotels];

        // Filtro por término de búsqueda (nombre del motel)
        if (searchTerm) {
            currentMotels = currentMotels.filter(motel =>
                motel.razonSocial.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filtro por estado de aprobación
        if (isApproved && isApproved !== 'ALL') { // 'ALL' para mostrar todos los estados
            currentMotels = currentMotels.filter(motel =>
                motel.isApproved === isApproved
            );
        }

        return currentMotels;
    }, [allMotels, searchTerm, isApproved]);


    // 3. Lógica de Paginación en el Frontend
    const totalCountResultsFilter = filteredMotels.length;
    const totalPages = Math.ceil(totalCountResultsFilter / itemsPerPage);

    const paginatedMotels = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredMotels.slice(startIndex, endIndex);
    }, [filteredMotels, currentPage, itemsPerPage]);

    // Asegurarse de que la página actual no exceda el total de páginas después de filtrar
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        } else if (totalPages === 0 && currentPage !== 1) {
            setCurrentPage(1); // Si no hay resultados, volver a la página 1
        }
    }, [currentPage, totalPages]);


    // Métodos para manejar los filtros y paginación
    const handleFilterCategory = (searchTermValue: string) => {
        setSearchTerm(searchTermValue);
        setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros
    };

    const handleFilterGarage = (isApprovedValue: string) => {
        setIsApproved(isApprovedValue);
        setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const cleanInputSearch = () => {
        setQuery("");
        setSearchTerm(""); // Limpiar también el término de búsqueda activo
        setCurrentPage(1); // Reiniciar a la primera página
    }

    const handleSearch = () => {
        // Cuando se presiona buscar, el valor de 'query' se convierte en el 'searchTerm'
        handleFilterCategory(query);
    };

    const handleChangeStatusMotel = (status: isApprovedStatus, motelId: string, motel: string, mailMotel: string) => {
        setStatusMotel(status);
        setMotelName(motel);
        setMotelId(motelId);
        setModalStatusMotel(true);
    }

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Resetea la página actual al cambiar el número de elementos por página
    };

    const isFiltering = searchTerm || (isApproved && isApproved !== 'ALL'); // Ahora 'isFiltering' también considera el filtro de estado

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
                setState={handleFilterGarage} // Usar handleFilterGarage para actualizar isApproved
                setQuery={setQuery}
                cleanInputSearch={cleanInputSearch}
                handleSearch={handleSearch}
            />

            <ModalStatusMotel
                isOpen={modalStatusMotel}
                motelId={motelId}
                accessToken={accessToken}
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
                                paginatedMotels.length > 0 && ( // Usar paginatedMotels para renderizar
                                    paginatedMotels.map(motel => (
                                        <tr
                                            key={motel.id}
                                            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <Link href={`/admin/dashboard-partner-motel/room/${motel.id}`} target="_blank" rel="noopener noreferrer" className="hover:underline" >
                                                    {motel.razonSocial}
                                                </Link>
                                            </td>
                                            <td className=" text-sm text-white flex items-center gap-1 font-light px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleChangeStatusMotel(motel.isApproved, motel.id, motel.razonSocial, motel.contactEmail)}
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
                                                {motel.city.name}, {motel.city.department.name}
                                            </td>
                                            <td className=" text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                                {formatDateWithHours(new Date(motel.createdAt!))}
                                            </td>
                                            <td className=" text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
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

                {!isLoading && paginatedMotels.length === 0 && isFiltering && (
                    <div className='flex justify-center px-5 items-center py-10'>
                        <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
                            <FaBuildingUser size={50} className="text-gray-500 dark:text-gray-400" />
                            <h3 className="text-xl font-medium mt-4 text-gray-700 dark:text-gray-200">
                                Motel no encontrado
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">
                                Lo sentimos, no hemos podido encontrar el motel que estás buscando con los filtros aplicados. Por favor, intenta con una búsqueda diferente o revisa más tarde.
                            </p>
                        </div>
                    </div>
                )}

                {
                    !isLoading && allMotels.length === 0 && !isFiltering && (
                        <div className='flex justify-center px-5 items-center py-10'>
                            <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
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
                }


                {
                    isLoading && (
                        <SkeletonTableRoom />
                    )
                }

                {
                    !isLoading && paginatedMotels.length > 0 && ( // Mostrar paginación solo si hay moteles y no está cargando
                        <PaginationTable
                            currentPage={currentPage}
                            totalItems={totalCountResultsFilter} // totalItems ahora es el total de moteles filtrados
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