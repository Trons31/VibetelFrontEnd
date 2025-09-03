'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { PaginationTable, SkeletonTableRoom } from '@/components';
import { GarageRoomApi } from '@/interfaces';
import { TbBedOff } from 'react-icons/tb';
import { ModalRegisterGarages } from './ModalRegisterGarages';

interface Props {
    garages: GarageRoomApi[];
    accessToken: string;
}

export const TableGaragesRoom = ({ garages, accessToken }: Props) => {
    const [allGarages, setAllGarages] = useState<GarageRoomApi[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [selectedGarages, setSelectedGarages] = useState<GarageRoomApi>();
    const [modalMode, setModalMode] = useState<"create" | "update">("create");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Inicializamos las comodidades cuando llegan desde props
    useEffect(() => {
        if (garages) {
            setAllGarages(garages);
            setIsLoading(false);
        }
    }, [garages]);

    // Calcular las páginas totales
    const totalPages = useMemo(() => {
        return Math.ceil(allGarages.length / itemsPerPage);
    }, [allGarages, itemsPerPage]);

    // Calcular items para la página actual
    const paginatedGarages = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return allGarages.slice(start, end);
    }, [allGarages, currentPage, itemsPerPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // reset a la primera página
    };


    const openCreateModal = () => {
        setSelectedGarages(undefined);
        setModalMode("create");
        setIsModalOpen(true);
    };

    const openUpdateModal = (garages: GarageRoomApi) => {
        setSelectedGarages(garages);
        setModalMode("update");
        setIsModalOpen(true);
    };

    return (
        <>

            <div className="flex justify-end px-2 md:mx-10 mt-10 mb-7">
                <button onClick={openCreateModal} className="btn-primary text-xs md:text-sm">
                    Nuevo garaje
                </button>
            </div>

            <ModalRegisterGarages
                garage={selectedGarages}
                accessToken={accessToken}
                mode={modalMode}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <div className="flex justify-end w-full px-2 md:px-8">
                <div className="flex bg-gray-200 rounded-full py-2 px-3 w-fit">
                    <p className="font-normal text-xs md:text-sm">
                        {allGarages.length} Comodidades registradas
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
                            paginatedGarages.length > 0 &&
                            paginatedGarages.map((garage) => (
                                <tr
                                    key={garage.id}
                                    onClick={() => openUpdateModal(garage)}
                                    className="bg-white border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                                >
                                    <td className="text-left text-xs md:text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {garage.title}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {isLoading && <SkeletonTableRoom />}

                {!isLoading && paginatedGarages.length === 0 && (
                    <div className="flex justify-center px-5 items-center py-10">
                        <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
                            <TbBedOff size={50} className="text-gray-500" />
                            <h3 className="text-md md:text-xl font-semibold mt-4 text-black">
                                Ningun garaje encontrada
                            </h3>
                            <p className="text-xs md:text-lg text-gray-700 mt-2">
                                Lo sentimos, no hemos podido encontrar garajes registrados.
                            </p>
                        </div>
                    </div>
                )}

                {!isLoading && allGarages.length > 0 && (
                    <PaginationTable
                        nameData='garajes'
                        currentPage={currentPage}
                        totalItems={allGarages.length}
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
