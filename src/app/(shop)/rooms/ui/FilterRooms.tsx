"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  GridMotelFilter, ModalLocationUser, ModalLocationUserMovil, NoLocationUser,
  Pagination,
  SideBarMenuFilter,
  SideMenuFilter,
  SkeletonRooms,
  SortRooms,
} from "@/components";
import {
  AmenitiesRoom, AmenitiesRoomApi, CategoryRoomApi, GarageRoomApi,
  RoomAllApi,
  searchCity,
} from "@/interfaces";
import { useLocationStore, useUIStore } from "@/store";
import { IoOptionsSharp } from "react-icons/io5";
import { TbBedOff } from "react-icons/tb";
import axios from "axios";

interface Props {
  categoryRoom: CategoryRoomApi[];
  garageRoom: GarageRoomApi[];
  amenitiesRoom: AmenitiesRoomApi[];
}

export const FilterRooms = ({ categoryRoom, garageRoom, amenitiesRoom }: Props) => {
  const openSideMenuFilter = useUIStore((state) => state.openSideMenuFilter);
  const { locationUser } = useLocationStore();

  const [detectedLocation, setDetectedLocation] = useState<searchCity | undefined>(undefined);
  const [isLoadingLocationUser, setIsLoadingLocationUser] = useState(true);
  const [modalLocationUser, setModalLocationUser] = useState(false);

  const [originalRooms, setOriginalRooms] = useState<RoomAllApi[]>([]);
  const [displayedRooms, setDisplayedRooms] = useState<RoomAllApi[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCountResultsFilter, setTotalCountResultsFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;


  const [category, setCategory] = useState("");
  const [garage, setGarage] = useState("");
  const [amenities, setAmenities] = useState<AmenitiesRoom[]>([]);
  const [orderPrice, setOrderPrice] = useState("");
  const [onSale, setOnSale] = useState("");
  const [inAvailable, setInAvailable] = useState("");
  const [orderMostReserved, setOrderMostReserved] = useState("");

 
  const fetchRooms = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<RoomAllApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room`);
      setOriginalRooms(response.data);
    } catch (error: any) {
      setOriginalRooms([]);
      console.error("Error al cargar habitaciones:", error); 
    } finally {
      setIsLoading(false);
    }
  }, []); 


  useEffect(() => {
    if (locationUser) {
      setDetectedLocation(locationUser);
    }
    setIsLoadingLocationUser(false);
  }, [locationUser]);

 
  useEffect(() => {
    if (detectedLocation) {
      fetchRooms();
    }
  }, [detectedLocation, fetchRooms]); 

  
  const filteredAndPaginatedRooms = useMemo(() => {
    let currentFilteredRooms = [...originalRooms]; // Trabaja con la copia original

    if (category) {
      currentFilteredRooms = currentFilteredRooms.filter(room => room.category?.id === category);
    }

    if (garage) {
      currentFilteredRooms = currentFilteredRooms.filter(room => room.garage?.id === garage);
    }

    if (amenities.length > 0) {
      currentFilteredRooms = currentFilteredRooms.filter(room =>
        amenities.every(a =>
          room.amenities?.some(rAmenity => rAmenity.amenities.id === a.id)
        )
      );
    }

    // Filtros comentados en tu código original, se mantienen así
    // if (inAvailable === "true") {
    //   currentFilteredRooms = currentFilteredRooms.filter(room => room.available === true);
    // } else if (inAvailable === "false") {
    //   currentFilteredRooms = currentFilteredRooms.filter(room => room.available === false);
    // }

    if (onSale === "true") {
      currentFilteredRooms = currentFilteredRooms.filter(room => room.promoActive);
    }

    // Clonar para ordenar sin mutar el array original en cada paso de filtrado
    let sortedRooms = [...currentFilteredRooms];
    if (orderPrice === "asc") {
      sortedRooms = sortedRooms.sort((a, b) => a.price - b.price);
    } else if (orderPrice === "desc") {
      sortedRooms = sortedRooms.sort((a, b) => b.price - a.price);
    }

    // if (orderMostReserved === "desc") {
    //   sortedRooms = sortedRooms.sort((a, b) => (b.totalReservations || 0) - (a.totalReservations || 0));
    // }

    setTotalCountResultsFilter(sortedRooms.length);
    setTotalPages(Math.ceil(sortedRooms.length / itemsPerPage));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedRooms.slice(startIndex, endIndex);
  }, [
    originalRooms, // Depende de las habitaciones originales cargadas
    category,
    garage,
    amenities,
    inAvailable,
    onSale,
    orderPrice,
    orderMostReserved,
    currentPage,
    itemsPerPage // Asegúrate de incluir esto si itemsPerPage puede cambiar
  ]);

  // Efecto para actualizar 'displayedRooms' cada vez que cambien los filtros o la paginación
  useEffect(() => {
    setDisplayedRooms(filteredAndPaginatedRooms);
  }, [filteredAndPaginatedRooms]);


  // Handlers para los filtros, que reinician la página actual a 1
  const handleFilterCategory = useCallback((cat: string) => {
    setCategory(cat);
    setCurrentPage(1);
  }, []);

  const handleFilterGarage = useCallback((g: string) => {
    setGarage(g);
    setCurrentPage(1);
  }, []);

  const handleFilterAviable = useCallback((avail: string) => {
    setInAvailable(avail);
    setCurrentPage(1);
  }, []);

  const handleFilterSale = useCallback((sale: string) => {
    setOnSale(sale);
    setCurrentPage(1);
  }, []);

  const handleFilterAmenities = useCallback((amenitiesRoom: AmenitiesRoom[]) => {
    setAmenities(amenitiesRoom.map((item) => item));
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  // getBestPromotionRoom no necesita ser memoizada a menos que la lista de rooms sea enorme y se llame muy a menudo
  const getBestPromotionRoom = (rooms: RoomAllApi[]) => {
    const roomWithBestPromotion = rooms
      .filter((room) => room.promoActive && room.promotionPercentage! > 0)
      .sort((a, b) => b.promotionPercentage! - a.promotionPercentage!)[0];

    if (!roomWithBestPromotion) return null;

    const discount = (roomWithBestPromotion.price * roomWithBestPromotion.promotionPercentage!) / 100;
    const finalPrice = roomWithBestPromotion.price - discount;

    return {
      ...roomWithBestPromotion,
      discountedPrice: finalPrice,
    };
  };

  // useMemo para BestPromotion, ahora usa originalRooms
  const BestPromotion = useMemo(() => {
    const best = getBestPromotionRoom(originalRooms);
    return best?.discountedPrice || null;
  }, [originalRooms]); // Depende de las habitaciones originales

  // Efecto para scroll al principio de la página al cambiar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <ModalLocationUser
        isOpen={modalLocationUser}
        onClose={() => setModalLocationUser(false)}
      />

      <ModalLocationUserMovil
        isOpen={modalLocationUser}
        onClose={() => setModalLocationUser(false)}
      />

      <SideBarMenuFilter
        categoryRoom={categoryRoom}
        garageRoom={garageRoom}
        amenitiesRoom={amenitiesRoom}
        BestPromotion={BestPromotion}
        onSelectedCategory={handleFilterCategory}
        onselectedGarage={handleFilterGarage}
        onSelectedAmenities={handleFilterAmenities}
        onToogleSale={handleFilterSale}
        onToogleinAvailable={handleFilterAviable}
      />

      {isLoadingLocationUser ? (
        <>
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex-grow flex justify-center items-center">
              <div className="px-5">
                <svg
                  className="h-5 w-5 animate-spin text-red-600 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </>
      ) : detectedLocation ? (
        <>
          <div className=" bg-white">
            <div className="Block md:hidden mt-28 justify-between items-center md:mt-0">
              <div className="px-3">
                <h1 className={`text-xl font-bold antialiased`}>
                  Habitaciones
                </h1>
                <p className="text-xs text-gray-700">
                  Encuentra tu habitacion perfecta
                </p>
              </div>
              <div className="flex justify-between mt-6 mx-3 mb-5">
                <SortRooms
                  onOrderMostReserved={setOrderMostReserved}
                  onSortByPrice={setOrderPrice}
                />
                <button
                  className="flex justify-center text-sm gap-2 my-2 px-2 items-center"
                  onClick={openSideMenuFilter}
                >
                  <p className="text-gray-700">Filtrar</p>
                  <IoOptionsSharp size={20} className="text-gray-700" />
                </button>
              </div>
            </div>

            <div className="hidden md:flex justify-between items-end bg-gray-100 border-b border-gray-200 shad shadow-sm mt-12 px-4 py-10">
              <div className="px-10">
                <p className="text-2xl font-normal text-black">
                  {" "}
                  Todas las habitaciones{" "}
                </p>
                <p className="text-sm text-black">
                  Encuentra tu habitacion perfecta
                </p>
              </div>

              <div className="flex justify-start mt-2 md:mt-0 px-3 md:justify-end5 md:px-10 ">
                <SortRooms
                  onOrderMostReserved={setOrderMostReserved}
                  onSortByPrice={setOrderPrice}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-12 md:p-10 relative">
              <div className="hidden md:block col-span-2">
                <div className="sticky top-24">
                  <SideMenuFilter
                    categoryRoom={categoryRoom}
                    garageRoom={garageRoom}
                    amenitiesRoom={amenitiesRoom}
                    BestPromotion={BestPromotion}
                    onSelectedCategory={handleFilterCategory}
                    onselectedGarage={handleFilterGarage}
                    onSelectedAmenities={handleFilterAmenities}
                    onToogleSale={handleFilterSale}
                    onToogleinAvailable={handleFilterAviable}
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-10 rounded-md mt-0 md:mt-3">
                {isLoading ? (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-5 mb-10 p-2 md:px-5">
                      <SkeletonRooms />
                      <SkeletonRooms />
                      <SkeletonRooms />
                      <SkeletonRooms />
                      <SkeletonRooms />
                      <SkeletonRooms />
                      <SkeletonRooms />
                      <SkeletonRooms />
                      <SkeletonRooms />
                    </div>
                  </>
                ) : displayedRooms.length > 0 ? (
                  <>
                    <GridMotelFilter rooms={displayedRooms} />
                    <div className="mb-10">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center px-5 items-center h-screen">
                    <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
                      <TbBedOff size={50} />
                      <h3 className="text-md md:text-xl font-semibold mt-4 text-black ">
                        No se encontraron habitaciones
                      </h3>
                      <p className="text-gray-700 text-xs md:text-md mt-2">
                        Lo sentimos, no hemos podido encontrar ninguna
                        habitación que coincida con tu búsqueda.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <NoLocationUser onLocation={() => setModalLocationUser(true)} />
        </>
      )}
    </>
  );
};