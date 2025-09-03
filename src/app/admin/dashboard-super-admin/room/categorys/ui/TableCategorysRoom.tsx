'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { PaginationTable, SkeletonTableRoom } from '@/components';
import { CategoryRoomApi } from '@/interfaces';
import { TbBedOff } from 'react-icons/tb';
import { ModalRegisterCategorys } from './ModalRegisterCategorys';

interface Props {
    categorys: CategoryRoomApi[];
    accessToken: string;
}

export const TableCategorysRoom = ({ categorys, accessToken }: Props) => {
    const [allCategorys, setAllCategorys] = useState<CategoryRoomApi[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [selectedCategory, setSelectedCategory] = useState<CategoryRoomApi>();
    const [modalMode, setModalMode] = useState<"create" | "update">("create");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Inicializamos las comodidades cuando llegan desde props
    useEffect(() => {
        if (categorys) {
            setAllCategorys(categorys);
            setIsLoading(false);
        }
    }, [categorys]);

    // Calcular las páginas totales
    const totalPages = useMemo(() => {
        return Math.ceil(allCategorys.length / itemsPerPage);
    }, [allCategorys, itemsPerPage]);

    // Calcular items para la página actual
    const paginatedCategorys = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return allCategorys.slice(start, end);
    }, [allCategorys, currentPage, itemsPerPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // reset a la primera página
    };

    const openCreateModal = () => {
        setSelectedCategory(undefined);
        setModalMode("create");
        setIsModalOpen(true);
    };

    const openUpdateModal = (category: CategoryRoomApi) => {
        setSelectedCategory(category);
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

            <ModalRegisterCategorys
                category={selectedCategory}
                accessToken={accessToken}
                mode={modalMode}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <div className="flex justify-end w-full px-2 md:px-8">
                <div className="flex bg-gray-200 rounded-full py-2 px-3 w-fit">
                    <p className="font-normal text-xs md:text-sm">
                        {allCategorys.length} Categorias registradas
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
                            paginatedCategorys.length > 0 &&
                            paginatedCategorys.map((category) => (
                                <tr
                                    key={category.id}
                                    onClick={() => openUpdateModal(category)}
                                    className="bg-white border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                                >
                                    <td className="text-left text-xs md:text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {category.name}
                                    </td>
                                    <td className="text-center text-xs md:text-base  text-gray-900 font-light px-6 py-4 whitespace-nowrap max-w-xs truncate"
                                        title={category.description}
                                    >
                                        {category.description}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {isLoading && <SkeletonTableRoom />}

                {!isLoading && paginatedCategorys.length === 0 && (
                    <div className="flex justify-center px-5 items-center py-10">
                        <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
                            <TbBedOff size={50} className="text-gray-500" />
                            <h3 className="text-md md:text-xl font-semibold mt-4 text-black">
                                Ninguna categoria encontrada
                            </h3>
                            <p className="text-xs md:text-lg text-gray-700 mt-2">
                                Lo sentimos, no hemos podido encontrar categorias registradas.
                            </p>
                        </div>
                    </div>
                )}

                {!isLoading && allCategorys.length > 0 && (
                    <PaginationTable
                        nameData='categorias'
                        currentPage={currentPage}
                        totalItems={allCategorys.length}
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
