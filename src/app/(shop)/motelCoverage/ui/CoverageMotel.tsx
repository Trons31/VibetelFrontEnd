'use client';
import { InputSearchCoverageMotelMovil, Pagination, SkeletonCoverageMotel } from '@/components';
import { UlCoverageMotel } from '@/components/coverage-motel/UlCoverageMotel';
import { CoverageDepartmentApi } from '@/interfaces'; // Asegúrate de que esta interfaz esté definida correctamente en '@/interfaces'
import React, { useCallback, useEffect, useState, useMemo } from 'react'; // Importamos useMemo
import { FilterCoverageMotel } from './FilterCoverageMotel';
import axios from 'axios';
import { MdOutlineWrongLocation } from 'react-icons/md';

export const CoverageMotel = () => {

    const [allDepartments, setAllDepartments] = useState<CoverageDepartmentApi[]>([]);

    const [displayedDepartments, setDisplayedDepartments] = useState<CoverageDepartmentApi[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCountResultsFilter, setTotalCountResultsFilter] = useState(0); // Ahora será el total de elementos FILTRADOS
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [searchTerm, setSearchTerm] = useState('');

    const fetchDepartments = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get<CoverageDepartmentApi[]>(
                `${process.env.NEXT_PUBLIC_API_ROUTE}locations/motel-coverage`
            );
            setAllDepartments(response.data);
        } catch (error: any) {
            setAllDepartments([]);
            console.error("Error al cargar la cobertura de moteles:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]);

    // Lógica para filtrar y paginar los departamentos
    const filteredAndPaginatedDepartments = useMemo(() => {
        let filtered = allDepartments;

        // 1. Filtrado por término de búsqueda (case-insensitive)
        if (searchTerm) {
            filtered = allDepartments.filter(department =>
                department.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                department.cityDetails.some(city =>
                    city.cityName.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        // 2. Ordenamiento: primero los departamentos con cobertura (moteles aprobados)
        filtered.sort((a, b) => {
            if (a.totalApprovedMotelsInDepartment > 0 && b.totalApprovedMotelsInDepartment === 0) return -1;
            if (a.totalApprovedMotelsInDepartment === 0 && b.totalApprovedMotelsInDepartment > 0) return 1;
            return a.departmentName.localeCompare(b.departmentName); // Orden alfabético si ambos tienen o no cobertura
        });

        // Actualizar el conteo total de resultados filtrados
        setTotalCountResultsFilter(filtered.length);

        // 3. Paginación
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginated = filtered.slice(startIndex, endIndex);

        // Actualizar el número total de páginas
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));

        return paginated;
    }, [allDepartments, searchTerm, currentPage, itemsPerPage]); // Dependencias del useMemo

    // Efecto para actualizar los departamentos mostrados cuando cambian los filtrados/paginados
    useEffect(() => {
        setDisplayedDepartments(filteredAndPaginatedDepartments);
    }, [filteredAndPaginatedDepartments]);


    const handleSearchTerm = (query: string) => {
        setSearchTerm(query);
        setCurrentPage(1); // Reiniciar a la primera página al cambiar el término de búsqueda
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);


    return (
        <>
            <div className="px-2 md:px-10 mt-14" >
                
                <InputSearchCoverageMotelMovil
                    onSearchTerm={handleSearchTerm}
                    departments={allDepartments}
                />
                <FilterCoverageMotel
                    onSearchTerm={handleSearchTerm}
                    departments={allDepartments}
                />

                {isLoading ? (
                    <>
                        <div className="grid grid-cols md:grid-cols-2 p-2 md:p-10 gap-4 md:gap-10">
                            <SkeletonCoverageMotel />
                            <SkeletonCoverageMotel />
                            <SkeletonCoverageMotel />
                            <SkeletonCoverageMotel />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Renderiza los departamentos paginados y filtrados */}
                        {displayedDepartments.length > 0 ? (
                            <UlCoverageMotel
                                departments={displayedDepartments}
                            />
                        ) : (
                            <div className="flex justify-center px-5 py-10 items-center">
                                <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
                                    <MdOutlineWrongLocation size={50} />
                                    <h3 className="text-md md:text-xl font-semibold mt-4 text-black ">
                                        No encontro la ubicacion
                                    </h3>
                                    <p className="text-gray-700 text-xs md:text-md mt-2">
                                        Lo sentimos, no hemos podido encontrar ninguna ubicacion que coincida con tu búsqueda.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Muestra la paginación solo si hay más de una página */}
                        {totalPages > 1 && (
                            <div className='mb-10'>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

