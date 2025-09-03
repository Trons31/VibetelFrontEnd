'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { PaginationTable, SkeletonTableRoom } from '@/components';
import { CountryApi, DepartmentApi } from '@/interfaces';
import { TbBedOff } from 'react-icons/tb';
import { ModalRegisterDepartment } from './ModalRegisterDepartment';

interface Props {
  countrys: CountryApi[];
  departments: DepartmentApi[];
  accessToken: string;
}

export const TableDepartments = ({ countrys, departments, accessToken }: Props) => {
  const [allDepartments, setAllDepartments] = useState<DepartmentApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentApi>();
  const [modalMode, setModalMode] = useState<'create' | 'update'>('create');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (departments) {
      setAllDepartments(departments);
      setIsLoading(false);
    }
  }, [departments]);

  const sortedDepartments = useMemo(() => {
    return [...allDepartments].sort((a, b) => {
      // Primero ordenar por nombre del país
      const countryA = a.country?.name || "";
      const countryB = b.country?.name || "";
      if (countryA < countryB) return -1;
      if (countryA > countryB) return 1;

      // Si son del mismo país, ordenar por nombre del departamento
      const deptA = a.name || "";
      const deptB = b.name || "";
      return deptA.localeCompare(deptB);
    });
  }, [allDepartments]);

  const totalPages = useMemo(() => Math.ceil(sortedDepartments.length / itemsPerPage), [sortedDepartments, itemsPerPage]);

  const paginatedDepartments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedDepartments.slice(start, end);
  }, [sortedDepartments, currentPage, itemsPerPage]);

  const openCreateModal = () => {
    setSelectedDepartment(undefined);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openUpdateModal = (department: DepartmentApi) => {
    setSelectedDepartment(department);
    setModalMode('update');
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-end px-2 md:mx-10 mt-10 mb-7">
        <button onClick={openCreateModal} className="btn-primary text-xs md:text-sm">
          Nuevo departamento
        </button>
      </div>

      <ModalRegisterDepartment
        department={selectedDepartment}
        countries={countrys}
        accessToken={accessToken}
        mode={modalMode}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="flex justify-end w-full px-2 md:px-8">
        <div className="flex bg-gray-200 rounded-full py-2 px-3 w-fit">
          <p className="font-normal text-xs md:text-sm">
            {allDepartments.length} departamentos registrados
          </p>
        </div>
      </div>

      <div className="mx-5 mt-2 overflow-x-auto">
        <table className="min-w-full shadow-sm">
          <thead className="bg-gray-300 border-b">
            <tr>
              <th className="text-xs md:text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Departamento
              </th>
              <th className="text-xs md:text-sm font-medium text-gray-900 px-6 py-4 text-left">
                País
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {!isLoading &&
              paginatedDepartments.length > 0 &&
              paginatedDepartments.map((dept) => (
                <tr
                  key={dept.geonameId}
                  onClick={() => openUpdateModal(dept)}
                  className="bg-white border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                >
                  <td className="text-left text-xs md:text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {dept.name}
                  </td>
                  <td className="text-left text-xs md:text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {dept.country?.name ?? '-'}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {isLoading && <SkeletonTableRoom />}

        {!isLoading && paginatedDepartments.length === 0 && (
          <div className="flex justify-center px-5 items-center py-10">
            <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
              <TbBedOff size={50} className="text-gray-500" />
              <h3 className="text-md md:text-xl font-semibold mt-4 text-black">
                Ningún departamento encontrado
              </h3>
              <p className="text-xs md:text-lg text-gray-700 mt-2">
                Lo sentimos, no hemos podido encontrar departamentos registrados.
              </p>
            </div>
          </div>
        )}

        {!isLoading && allDepartments.length > 0 && (
          <PaginationTable
            nameData='departamentos'
            currentPage={currentPage}
            totalItems={allDepartments.length}
            onItemsPerPageChange={(n) => { setItemsPerPage(n); setCurrentPage(1); }}
            totalPages={totalPages}
            onPageChange={(p) => setCurrentPage(p)}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </>
  );
};
