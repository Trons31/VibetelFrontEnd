'use client';
import { useCallback, useEffect, useState } from 'react';
import { getFavoriteRoomByUser } from '@/actions';
import { SideMenu, Pagination, GridFavoritesRoom, SkeletonFavoritesRoom } from '@/components';
import { FilterFavoriteRoom } from './FilterFavoriteRoom';
import { FavoriteRoom } from '@/interfaces/favoriteRoom.interface';
import { CategoryRoom, GarageRoom } from '@/interfaces';
import { TbBedOff } from 'react-icons/tb';
import Link from 'next/link';
import { UserInterface } from '@/interfaces/user.interface';

interface Props {
  user: UserInterface;
  garage: GarageRoom[];
  category: CategoryRoom[];
}

export const FavoritePage = ({ user, category, garage }: Props) => {
  const [favorites, setFavorites] = useState<FavoriteRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [garageFilter, setGarageFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const itemsPerPage = 5;

  const fetchFavoritesRoom = useCallback(async () => {
    setIsLoading(true);
    const data = await getFavoriteRoomByUser({
      userId: user.id,
      page: currentPage,
      titleFilter: searchQuery,
      filterType: filter,
      garageFilter: garageFilter,
      categoryFilter
    });
    if (data.ok && data.totalCount !== undefined) {
      const { favorites, totalCount } = data;
      setFavorites(favorites);
      const totalPagesCount = Math.ceil(totalCount / itemsPerPage);
      setTotalPages(totalPagesCount);
    }
    setIsLoading(false);
  }, [currentPage, filter, searchQuery, garageFilter, categoryFilter, dateRange]);


  useEffect(() => {
    fetchFavoritesRoom();
  }, [fetchFavoritesRoom]);


  const handleFilterChange = (newFilter: string, newSearchQuery: string, newGarageFilter: string, newCategoryFilter: string, newDateRange: string) => {
    setFilter(newFilter);
    setSearchQuery(newSearchQuery);
    setGarageFilter(newGarageFilter);
    setCategoryFilter(newCategoryFilter);
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
          <FilterFavoriteRoom
            category={category}
            garage={garage}
            onFilterChange={handleFilterChange}
          />
          {isLoading ? (
            <>
              <div className='grid grid-cols md:grid-cols-4 gap-5 px-2 py-10' >
                <SkeletonFavoritesRoom />
                <SkeletonFavoritesRoom />
                <SkeletonFavoritesRoom />
                <SkeletonFavoritesRoom />
              </div>
            </>

          ) : (
            <>
              {
                totalPages > 0
                  ? (
                    <>
                      <GridFavoritesRoom favoriteRoom={favorites} />
                      {totalPages > 0 && (
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                      )}
                    </>
                  ) : (
                    <>
                      {
                        searchQuery !== "" || dateRange !== "" || garageFilter !== "" || categoryFilter !== "" || filter !== ""
                          ? (
                            <div className='flex justify-center px-5 items-center mt-16 mb-32'>
                              <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-white  rounded-lg shadow-md">
                                <TbBedOff size={50} className='text-gray-700' />
                                <h3 className="text-xl font-semibold mt-4 text-black ">No se encontraron habitaciones</h3>
                                <p className="text-gray-700 mt-2">
                                  Lo sentimos, no hemos podido encontrar ninguna habitación que coincida con tu búsqueda.
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className='mb-36' >
                              <section className="bg-white rounded-md border mt-10 border-gray-200 flex px-2 items-center mb-10 ">
                                <div className="py-8 px-2 md:px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                                  <h1 className="text-xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl ">¡No tienes habitaciones favoritas aún!</h1>
                                  <p className="mt-3 mb-3 md:mb-1 md:mt-1 text-sm font-normal text-gray-500 md:text-md px-2 lg:px-24" style={{ textAlign: 'justify' }} >Explora y añade habitaciones a tus favoritos para acceder a ellas fácilmente en el futuro.</p>
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
        </div>
      </div>
    </div>
  );
};

