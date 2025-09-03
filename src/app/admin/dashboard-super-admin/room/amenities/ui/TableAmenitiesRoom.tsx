'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { PaginationTable, SkeletonTableRoom } from '@/components';
import { AmenitiesRoomApi, GarageRoomApi } from '@/interfaces';
import { TbBedOff } from 'react-icons/tb';
import { ModalRegisterAmenities } from './ModalRegisterAmenities';

interface Props {
    amenities: AmenitiesRoomApi[];
    accessToken: string;
}

export const TableAmenitiesRoom = ({ amenities, accessToken }: Props) => {
    const [allAmenities, setAllAmenities] = useState<AmenitiesRoomApi[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [selectedAmenities, setSelectedAmenities] = useState<AmenitiesRoomApi>();
    const [modalMode, setModalMode] = useState<"create" | "update">("create");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Inicializamos las comodidades cuando llegan desde props
    useEffect(() => {
        if (amenities) {
            setAllAmenities(amenities);
            setIsLoading(false);
        }
    }, [amenities]);

    // Calcular las páginas totales
    const totalPages = useMemo(() => {
        return Math.ceil(allAmenities.length / itemsPerPage);
    }, [allAmenities, itemsPerPage]);

    // Calcular items para la página actual
    const paginatedAmenities = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return allAmenities.slice(start, end);
    }, [allAmenities, currentPage, itemsPerPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // reset a la primera página
    };


    const openCreateModal = () => {
        setSelectedAmenities(undefined);
        setModalMode("create");
        setIsModalOpen(true);
    };

    const openUpdateModal = (amenitie: AmenitiesRoomApi) => {
        setSelectedAmenities(amenitie);
        setModalMode("update");
        setIsModalOpen(true);
    };

    return (
        <>

            <div className="flex justify-end px-2 md:mx-10 mt-10 mb-7">
                <button onClick={openCreateModal} className="btn-primary text-xs md:text-sm">
                    Nueva comodidad
                </button>
            </div>

            <ModalRegisterAmenities
                amenitie={selectedAmenities}
                accessToken={accessToken}
                mode={modalMode}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <div className="flex justify-end w-full px-2 md:px-8">
                <div className="flex bg-gray-200 rounded-full py-2 px-3 w-fit">
                    <p className="font-normal text-xs md:text-sm">
                        {allAmenities.length} comodidades registradas
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
                            <th className="text-xs md:text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                Descripción
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-100">
                        {!isLoading &&
                            paginatedAmenities.length > 0 &&
                            paginatedAmenities.map((amenity) => (
                                <tr
                                    key={amenity.id}
                                    onClick={() => openUpdateModal(amenity)}
                                    className="bg-white border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                                >
                                    <td className="text-left text-xs md:text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {amenity.name}
                                    </td>
                                    <td className="text-center text-xs md:text-base  text-gray-900 font-light px-6 py-4 whitespace-nowrap max-w-xs truncate"
                                        title={amenity.description}
                                    >
                                        {amenity.description}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {isLoading && <SkeletonTableRoom />}

                {!isLoading && paginatedAmenities.length === 0 && (
                    <div className="flex justify-center px-5 items-center py-10">
                        <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
                            <TbBedOff size={50} className="text-gray-500" />
                            <h3 className="text-md md:text-xl font-semibold mt-4 text-black">
                                Ninguna comodidad encontrada
                            </h3>
                            <p className="text-xs md:text-lg text-gray-700 mt-2">
                                Lo sentimos, no hemos podido encontrar comodidades registradas.
                            </p>
                        </div>
                    </div>
                )}

                {!isLoading && allAmenities.length > 0 && (
                    <PaginationTable
                        nameData='comodidades'
                        currentPage={currentPage}
                        totalItems={allAmenities.length}
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
