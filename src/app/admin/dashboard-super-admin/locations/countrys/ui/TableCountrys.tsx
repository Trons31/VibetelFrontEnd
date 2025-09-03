'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { PaginationTable, SkeletonTableRoom } from '@/components';
import { CountryApi, GarageRoomApi } from '@/interfaces';
import { TbBedOff } from 'react-icons/tb';
import { ModalRegisterCountry } from './ModalRegisterCountry';

interface Props {
    countrys: CountryApi[];
    accessToken: string;
}

export const TableClountrys = ({ countrys, accessToken }: Props) => {
    const [allCountrys, setAllCountrys] = useState<CountryApi[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [selectedCountry, setSelectedCountry] = useState<CountryApi>();
    const [modalMode, setModalMode] = useState<"create" | "update">("create");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Inicializamos las comodidades cuando llegan desde props
    useEffect(() => {
        if (countrys) {
            setAllCountrys(countrys);
            setIsLoading(false);
        }
    }, [countrys]);

    // Calcular las páginas totales
    const totalPages = useMemo(() => {
        return Math.ceil(allCountrys.length / itemsPerPage);
    }, [allCountrys, itemsPerPage]);

    // Calcular items para la página actual
    const paginatedCountrys = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return allCountrys.slice(start, end);
    }, [allCountrys, currentPage, itemsPerPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // reset a la primera página
    };


    const openCreateModal = () => {
        setSelectedCountry(undefined);
        setModalMode("create");
        setIsModalOpen(true);
    };

    const openUpdateModal = (country: CountryApi) => {
        setSelectedCountry(country);
        setModalMode("update");
        setIsModalOpen(true);
    };

    return (
        <>

            <div className="flex justify-end px-2 md:mx-10 mt-10 mb-7">
                <button onClick={openCreateModal} className="btn-primary text-xs md:text-sm">
                    Nuevo pais
                </button>
            </div>

            <ModalRegisterCountry
                country={selectedCountry}
                accessToken={accessToken}
                mode={modalMode}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <div className="flex justify-end w-full px-2 md:px-8">
                <div className="flex bg-gray-200 rounded-full py-2 px-3 w-fit">
                    <p className="font-normal text-xs md:text-sm">
                        {allCountrys.length} Comodidades registradas
                    </p>
                </div>
            </div>

            <div className="mx-5 mt-2 overflow-x-auto">
                <table className="min-w-full shadow-sm">
                    <thead className="bg-gray-300 border-b">
                        <tr>
                            <th className="text-xs md:text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Nombre
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-100">
                        {!isLoading &&
                            paginatedCountrys.length > 0 &&
                            paginatedCountrys.map((country) => (
                                <tr
                                    key={country.geonameId}
                                    onClick={() => openUpdateModal(country)}
                                    className="bg-white border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                                >
                                    <td className="text-left text-xs md:text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {country.name}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {isLoading && <SkeletonTableRoom />}

                {!isLoading && paginatedCountrys.length === 0 && (
                    <div className="flex justify-center px-5 items-center py-10">
                        <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
                            <TbBedOff size={50} className="text-gray-500" />
                            <h3 className="text-md md:text-xl font-semibold mt-4 text-black">
                                Ningun pais encontrado
                            </h3>
                            <p className="text-xs md:text-lg text-gray-700 mt-2">
                                Lo sentimos, no hemos podido encontrar paises registrados.
                            </p>
                        </div>
                    </div>
                )}

                {!isLoading && allCountrys.length > 0 && (
                    <PaginationTable
                        nameData='paises'
                        currentPage={currentPage}
                        totalItems={allCountrys.length}
                        onItemsPerPageChange={handleItemsPerPageChange}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        itemsPerPage={itemsPerPage}
                    />
                )}
            </div>
        </>
    );
};
