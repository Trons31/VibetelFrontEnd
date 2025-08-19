"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";

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
  CategoryRoomApi,
  GarageRoomApi,
  LocationCity,
  RoomAllApi,
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

  const [detectedLocation, setDetectedLocation] = useState<LocationCity | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true); // Nuevo estado para la carga de la ubicación

  const [originalRooms, setOriginalRooms] = useState<RoomAllApi[]>([]);
  const [displayedRooms, setDisplayedRooms] = useState<RoomAllApi[]>([]);

  const [isLoadingRooms, setIsLoadingRooms] = useState(true); // Estado para la carga de habitaciones (inicial y por filtro)
  const [totalPages, setTotalPages] = useState(1);
  const [totalCountResultsFilter, setTotalCountResultsFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [category, setCategory] = useState("");
  const [garage, setGarage] = useState("");
  const [amenities, setAmenities] = useState<AmenitiesRoom[]>([]);
  const [orderPrice, setOrderPrice] = useState("");
  const [onSale, setOnSale] = useState("");
  const [inAvailable, setInAvailable] = useState("");
  const [orderMostReserved, setOrderMostReserved] = useState("");

  const [modalLocationUser, setModalLocationUser] = useState(false); // Mantener este estado para el modal de ubicación

  // Efecto para procesar la ubicación del usuario desde el store
  useEffect(() => {
    if (locationUser !== undefined) {
      setDetectedLocation(locationUser);
      setIsLoadingLocation(false); // La ubicación ha sido procesada (detectada o no)
    }
  }, [locationUser]);

  // Callback para la llamada a la API de habitaciones
  const fetchRooms = useCallback(async () => {
    if (!detectedLocation) {
      // Si no hay ubicación detectada, no intentamos cargar habitaciones
      setIsLoadingRooms(false); // Asegurarse de que el estado de carga de habitaciones se desactive
      setOriginalRooms([]);
      return;
    }

    setIsLoadingRooms(true); // Activar carga de habitaciones
    try {
      const response = await axios.get<RoomAllApi[]>(
        `${process.env.NEXT_PUBLIC_API_ROUTE}room?cityId=${detectedLocation.id}`
      );
      setOriginalRooms(response.data);
    } catch (error: any) {
      setOriginalRooms([]);
      console.error("Error al cargar habitaciones:", error);
    } finally {
      setIsLoadingRooms(false); // Desactivar carga de habitaciones
    }
  }, [detectedLocation]); // Depende solo de `detectedLocation`

  // Efecto para ejecutar fetchRooms cuando detectedLocation esté disponible y no se esté cargando
  useEffect(() => {
    if (detectedLocation) {
      fetchRooms();
    }
  }, [detectedLocation, fetchRooms]); // Ejecutar cuando la ubicación esté lista o fetchRooms cambie

  // Lógica de filtrado y paginación memoizada
  const filteredAndPaginatedRooms = useMemo(() => {
    let currentFilteredRooms = [...originalRooms]; // Trabaja con una copia

    if (category) {
      currentFilteredRooms = currentFilteredRooms.filter((room) => room.category?.id === category);
    }

    if (garage) {
      currentFilteredRooms = currentFilteredRooms.filter((room) => room.garage?.id === garage);
    }

    if (amenities.length > 0) {
      currentFilteredRooms = currentFilteredRooms.filter((room) =>
        amenities.every((a) => room.amenities?.some((rAmenity) => rAmenity.amenities.id === a.id))
      );
    }

    if (onSale === "true") {
      currentFilteredRooms = currentFilteredRooms.filter((room) => room.promoActive);
    }

    let sortedRooms = [...currentFilteredRooms];
    if (orderPrice === "asc") {
      sortedRooms = sortedRooms.sort((a, b) => a.price - b.price);
    } else if (orderPrice === "desc") {
      sortedRooms = sortedRooms.sort((a, b) => b.price - a.price);
    }

    // Actualizar conteos después de filtrar y ordenar
    setTotalCountResultsFilter(sortedRooms.length);
    setTotalPages(Math.ceil(sortedRooms.length / itemsPerPage));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedRooms.slice(startIndex, endIndex);
  }, [originalRooms, category, garage, amenities, onSale, orderPrice, currentPage, itemsPerPage]);

  // Efecto para actualizar 'displayedRooms' cada vez que cambien los filtros o la paginación
  useEffect(() => {
    setDisplayedRooms(filteredAndPaginatedRooms);
  }, [filteredAndPaginatedRooms]);

  // Handlers para los filtros, usan useCallback para optimización
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

  // Función para obtener la mejor promoción
  const getBestPromotionRoom = (rooms: RoomAllApi[]) => {
    const promoRooms = rooms
      .filter((room) => room.promoActive && room.promotionPercentage! > 0)
      .map((room) => {
        const discount = (room.price * room.promotionPercentage!) / 100;
        const finalPrice = room.price - discount;
        return { ...room, discountedPrice: finalPrice };
      });

    if (promoRooms.length === 0) return null;

    // Ordenar por el precio con descuento más bajo
    return promoRooms.sort((a, b) => a.discountedPrice! - b.discountedPrice!)[0];
  };

  // Memoización de la mejor promoción
  const BestPromotion = useMemo(() => {
    return getBestPromotionRoom(originalRooms)?.discountedPrice || null;
  }, [originalRooms]); // Depende de las habitaciones originales

  // Efecto para scroll al principio de la página al cambiar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <ModalLocationUser isOpen={modalLocationUser} onClose={() => setModalLocationUser(false)} />
      <ModalLocationUserMovil isOpen={modalLocationUser} onClose={() => setModalLocationUser(false)} />

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

      {isLoadingLocation ? ( // Muestra spinner mientras se detecta la ubicación
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="flex-grow flex justify-center items-center">
            <div className="px-5">
              <svg
                className="h-5 w-5 animate-spin text-red-600 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      ) : !detectedLocation ? ( // Si la ubicación no fue detectada
        <NoLocationUser onLocation={() => setModalLocationUser(true)} />
      ) : (
        // Si la ubicación fue detectada, procedemos a mostrar el contenido principal
        <>
          <div className=" bg-white">
            <div className="Block md:hidden mt-28 justify-between items-center md:mt-0">
              <div className="px-3">
                <h1 className={`text-xl font-bold antialiased`}>Habitaciones</h1>
                <p className="text-xs text-gray-700">Encuentra tu habitacion perfecta</p>
              </div>
              <div className="flex justify-between mt-6 mx-3 mb-5">
                <SortRooms onOrderMostReserved={setOrderMostReserved} onSortByPrice={setOrderPrice} />
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
                <p className="text-2xl font-normal text-black"> Todas las habitaciones </p>
                <p className="text-sm text-black">Encuentra tu habitacion perfecta</p>
              </div>

              <div className="flex justify-start mt-2 md:mt-0 px-3 md:justify-end5 md:px-10 ">
                <SortRooms onOrderMostReserved={setOrderMostReserved} onSortByPrice={setOrderPrice} />
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
                {isLoadingRooms ? ( // Muestra esqueletos mientras se cargan las habitaciones
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
                  // Si no hay habitaciones después de la carga
                  <div className="flex justify-center px-5 items-center h-screen">
                    <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
                      <TbBedOff size={50} />
                      <h3 className="text-md md:text-xl font-semibold mt-4 text-black ">
                        No se encontraron habitaciones
                      </h3>
                      <p className="text-gray-700 text-xs md:text-md mt-2">
                        Lo sentimos, no hemos podido encontrar ninguna habitación que coincida con tu búsqueda.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};