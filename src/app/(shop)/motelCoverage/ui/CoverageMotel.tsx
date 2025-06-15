'use client';
import { coverageMotel } from '@/actions';
import { InputSearchCoverageMotelMovil, Pagination, SkeletonCoverageMotel } from '@/components';
import { UlCoverageMotel } from '@/components/coverage-motel/UlCoverageMotel';
import { CoverageDepartment } from '@/interfaces';
import React, { useCallback, useEffect, useState } from 'react'
import { FilterCoverageMotel } from './FilterCoverageMotel';

export const CoverageMotel = () => {

    const [departments, setDepartments] = useState<CoverageDepartment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCountResultsFilter, setTotalCountResultsFilter] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    const [searchTerm, setSearchTerm] = useState('');


    const fetchRooms = useCallback(async () => {
        setIsLoading(true);
        const data = await coverageMotel({
            page: currentPage,
            searchTerm
        });
        if (data.ok) {
            const { departments, totalCount } = data;
            setDepartments(departments);
            setTotalCountResultsFilter(totalCount);
            const totalPagesCount = Math.ceil(totalCount / itemsPerPage);
            setTotalPages(totalPagesCount);
        }
        setIsLoading(false);
    }, [currentPage, searchTerm]);


    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);


    const handleSearchTerm = (query: string) => {
        setSearchTerm(query);
        setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros
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
                    onSearchTerm={(query) => handleSearchTerm(query)}
                />
                <FilterCoverageMotel
                    onSearchTerm={(query) => handleSearchTerm(query)}
                />
                {
                    isLoading
                        ? (
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
                                <UlCoverageMotel
                                    departments={departments}
                                />
                                <div className='mb-10' >
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </>
                        )
                }

            </div>

        </>
    )
}
