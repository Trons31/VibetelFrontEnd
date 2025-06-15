"use client";
import React, { useCallback, useEffect, useState } from "react";

import { getRooms } from "@/actions";

import {
  GridMotelFilter,
  ModalLocationUser,
  ModalLocationUserMovil,
  NoLocationUser,
  Pagination,
  SideBarMenuFilter,
  SideMenuFilter,
  SkeletonRooms,
  SortRooms,
} from "@/components";
import {
  AmenitiesRoom,
  AmenitiesRoomApi,
  BedRooms,
  CategoryRoomApi,
  GarageRoomApi,
  RoomAllApi,
  searchCity,
} from "@/interfaces";
import { useLocationStore, useUIStore } from "@/store";
import { IoOptionsSharp } from "react-icons/io5";
import { TbBedOff } from "react-icons/tb";

interface Props {
  rooms: RoomAllApi[];
  categoryRoom: CategoryRoomApi[];
  garageRoom: GarageRoomApi[];
  amenitiesRoom: AmenitiesRoomApi[];
  BestPromotion?: number | null;
}

export const FilterRooms = ({ categoryRoom, garageRoom, amenitiesRoom, BestPromotion, rooms }: Props) => {
  const openSideMenuFilter = useUIStore((state) => state.openSideMenuFilter);

  const { locationUser } = useLocationStore();

  const [detectedLocation, setDetectedLocation] = useState<
    searchCity | undefined
  >(undefined);
  const [isLoadingLocationUser, setIsLoadingLocationUser] = useState(true);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [modalLocationUser, setModalLocationUser] = useState(false);

  const [AllRooms, setAllRooms] = useState<RoomAllApi[]>(rooms);
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

  useEffect(() => {
    let filteredRooms = [...rooms];

    if (category) {
      filteredRooms = filteredRooms.filter(room => room.category?.id === category);
    }

    if (garage) {
      filteredRooms = filteredRooms.filter(room => room.garage?.id === garage);
    }

    if (amenities.length > 0) {
      filteredRooms = filteredRooms.filter(room =>
        amenities.every(a =>
          room.amenities?.some(rAmenity => rAmenity.amenities.id === a.id)
        )
      );
    }

    // if (inAvailable === "true") {
    //   filteredRooms = filteredRooms.filter(room => room.available === true);
    // } else if (inAvailable === "false") {
    //   filteredRooms = filteredRooms.filter(room => room.available === false);
    // }

    if (onSale === "true") {
      filteredRooms = filteredRooms.filter(room => room.promoActive);
    }

    if (orderPrice === "asc") {
      filteredRooms = filteredRooms.sort((a, b) => a.price - b.price);
    } else if (orderPrice === "desc") {
      filteredRooms = filteredRooms.sort((a, b) => b.price - a.price);
    }

    // if (orderMostReserved === "desc") {
    //   filteredRooms = filteredRooms.sort((a, b) => (b.totalReservations || 0) - (a.totalReservations || 0));
    // }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedRooms = filteredRooms.slice(startIndex, endIndex);

    setAllRooms(paginatedRooms);
    setTotalPages(Math.ceil(filteredRooms.length / itemsPerPage));
    setTotalCountResultsFilter(filteredRooms.length);
  }, [
    rooms,
    category,
    garage,
    amenities,
    inAvailable,
    onSale,
    orderPrice,
    orderMostReserved,
    currentPage,
  ]);

  useEffect(() => {
    if (locationUser) {
      setDetectedLocation(locationUser);
    }
    setIsLoadingLocationUser(false);
  }, [locationUser]);

  useEffect(() => {
    if (detectedLocation) {
      setIsLoading(false);
    }
  }, [detectedLocation]);

  const handleFilterCategory = (category: string) => {
    setCategory(category);
    setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros
  };

  const handleFilterGarage = (garage: string) => {
    setGarage(garage);
    setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros
  };

  const handleFilterAviable = (aviable: string) => {
    setInAvailable(aviable);
    setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros
  };

  const handleFilterSale = (sale: string) => {
    setOnSale(sale);
    setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros
  };

  const handleFilterAmenities = (amenitiesRoom: AmenitiesRoom[]) => {
    setAmenities(amenitiesRoom.map((item) => item));
    setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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
        onSelectedCategory={(category) => handleFilterCategory(category)}
        onselectedGarage={(garage) => handleFilterGarage(garage)}
        onSelectedAmenities={(amenities) => handleFilterAmenities(amenities)}
        onToogleSale={(sale) => handleFilterSale(sale)}
        onToogleinAvailable={(aviable) => handleFilterAviable(aviable)}
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
              <div className="flex  justify-between mt-6 mx-3 mb-5">
                <SortRooms
                  onOrderMostReserved={(order) => setOrderMostReserved(order)}
                  onSortByPrice={(order) => setOrderPrice(order)}
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
                  onOrderMostReserved={(order) => setOrderMostReserved(order)}
                  onSortByPrice={(order) => setOrderPrice(order)}
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
                    onSelectedCategory={(category) =>
                      handleFilterCategory(category)
                    }
                    onselectedGarage={(garage) => handleFilterGarage(garage)}
                    onSelectedAmenities={(amenities) =>
                      handleFilterAmenities(amenities)
                    }
                    onToogleSale={(sale) => handleFilterSale(sale)}
                    onToogleinAvailable={(aviable) =>
                      handleFilterAviable(aviable)
                    }
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
                    </div>
                  </>
                ) : AllRooms.length > 0 ? (
                  <>
                    <GridMotelFilter rooms={AllRooms} />
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
                      <p className="text-gray-700 text-xs md:text-md  mt-2">
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
