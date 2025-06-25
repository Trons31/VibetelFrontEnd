'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

import { SideMenu, GridReservation, Pagination, SkeletonReservation } from '@/components';
import { getReservationByUser } from '@/actions/reservation/get-reservation-by-user';
import { ReservationByUser } from '@/interfaces/reservation.interface';
import { FilterReservation } from './FilterReservation';
import { FaRegCalendarTimes } from 'react-icons/fa';
import { UserApi } from '@/interfaces/user.interface';

interface Props {
  user: UserApi
}

export const ReservationPage = ({ user }: Props) => {
  const [reservations, setReservations] = useState<ReservationByUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('');
  const itemsPerPage = 5;

  const fetchReservations = useCallback(async () => {
    setIsLoading(true);
    const data = await getReservationByUser({
      userId: user.id,
      page: currentPage,
      statusFilter,
      titleFilter: searchQuery,
      dateRange,
    });
    if (data.ok && data.totalCount !== undefined) {
      const { reservations, totalCount } = data;
      setReservations(reservations);
      const totalPagesCount = Math.ceil(totalCount / itemsPerPage);
      setTotalPages(totalPagesCount);
    }
    setIsLoading(false);
  }, [user.id, currentPage, statusFilter, searchQuery, dateRange]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);


  const handleFilterChange = (newStatusFilter: string, newSearchQuery: string, newDateRange: string) => {
    setStatusFilter(newStatusFilter);
    setSearchQuery(newSearchQuery);
    setDateRange(newDateRange);
    setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);


  return (
    <div className='w-full'>
      <div className='grid grid-cols-8 sm:grid-cols-10'>
        <SideMenu user={user} />
        <div className='col-span-8 bg-gray-100 w-full pt-32 md:pt-24 py-5 sm:px-8'>
          <FilterReservation onFilterChange={handleFilterChange} />
          {isLoading ? (
            <>
              <SkeletonReservation />
              <SkeletonReservation />
              <SkeletonReservation />
            </>

          ) : (
            <>
              {
                totalPages > 0
                  ? (
                    <>
                      <GridReservation reservation={reservations} />
                    </>
                  ) : (
                    <>

                      {
                        statusFilter !== "" || searchQuery !== "" || dateRange !== ""
                          ? (
                            <div className='flex justify-center px-5 items-center mt-16 mb-32'>
                              <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-white rounded-lg shadow-md">
                                <FaRegCalendarTimes size={50} className='text-gray-700' />
                                <h3 className="text-xl font-semibold mt-4 text-black">No se encontraron reservas</h3>
                                <p className="text-gray-700 mt-2">
                                  Lo sentimos, no hemos podido encontrar ninguna reserva que coincida con tu búsqueda.
                                </p>
                              </div>
                            </div>

                          ) : (
                            <div className='mb-36' >
                              <section className="bg-white rounded-md border mt-10 border-gray-200 flex px-2 items-center mb-10 ">
                                <div className="py-8 px-2 md:px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                                  <h1 className="text-xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl ">¡No tiene reservas actualmente!</h1>
                                  <p className="mt-3 mb-3 md:mb-1 md:mt-1 text-sm font-normal text-gray-500  md:text-md px-2 lg:px-24 ">Para hacer una reserva, visite la sección de habitaciones.</p>
                                  <div className="flex justify-center">
                                    <Link href="/room" className="inline-flex justify-center items-center  px-5 underline">
                                      Ver habitaciones
                                    </Link>
                                  </div>
                                </div>
                              </section>
                            </div>
                          )
                      }

                    </>
                  )

              }

            </>
          )}
          {
            totalPages > 0 && (
              <Pagination currentPage={currentPage} totalPages={totalPages}
                onPageChange={handlePageChange} />
            )
          }

        </div>
      </div>
    </div>
  );
};

