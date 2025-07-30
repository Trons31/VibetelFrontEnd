"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  GridRoomSearch, NoFoundSearch, Pagination, SideBarMenuFilter, SideMenuFilter, SkeletonRooms, SortRooms,
  SuggestedAndTopRoom
} from "@/components";
import { AmenitiesRoom, AmenitiesRoomApi, CategoryRoomApi, GarageRoomApi, LocationCity, RoomAllApi } from "@/interfaces";
import { useLocationStore, useSearchStore, useSuggestedRoomStore, useUIStore } from "@/store";
import { IoOptionsSharp } from "react-icons/io5";
import { TbBedOff } from "react-icons/tb";
import axios from "axios";

interface Props {
  categoryRoom: CategoryRoomApi[];
  garageRoom: GarageRoomApi[];
  amenitiesRoom: AmenitiesRoomApi[];
  query: string;
}

export const FilterSearch = ({ garageRoom, amenitiesRoom, categoryRoom, query, }: Props) => {
  const openSideMenuFilter = useUIStore((state) => state.openSideMenuFilter);

  const { locationUser } = useLocationStore();
  const { addSearch } = useSearchStore();

  const [originalRooms, setOriginalRooms] = useState<RoomAllApi[]>([]);
  const [displayedRooms, setDisplayedRooms] = useState<RoomAllApi[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Indica si los datos se están cargando (filtros, paginación, etc.)
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true); // Indica si los datos iniciales se están cargando
  const [awaitResult, setAwaitResult] = useState(false); // Indica si se está esperando el resultado de la búsqueda inicial

  const [detectedLocation, setDetectedLocation] = useState<LocationCity | undefined>(undefined);

  const { suggestedRooms } = useSuggestedRoomStore();

  const [totalPages, setTotalPages] = useState(1);
  const [totalCountResultsFilter, setTotalCountResultsFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Mantener como constante si no hay necesidad de cambiarlo.

  const [category, setCategory] = useState("");
  const [garage, setGarage] = useState("");
  const [amenities, setAmenities] = useState<AmenitiesRoom[]>([]);

  const [orderPrice, setOrderPrice] = useState("");
  const [onSale, setOnSale] = useState("");
  const [inAvailable, setInAvailable] = useState("");
  const [orderMostReserved, setOrderMostReserved] = useState("");

  const decodedSearchTerm = useMemo(() => {
    return decodeURIComponent(query || "").trim().toLowerCase();
  }, [query]);

  // Se recalcula cuando cambian los estados de los filtros
  const isFiltering = useMemo(() => {
    return category || garage || amenities.length > 0 || inAvailable || onSale || orderPrice || orderMostReserved;
  }, [category, garage, amenities, inAvailable, onSale, orderPrice, orderMostReserved]);


  useEffect(() => {
    if (locationUser) {
      setDetectedLocation(locationUser);
    } else {
      setDetectedLocation(undefined); // Asegurar que sea undefined si no hay ubicación
    }
  }, [locationUser]);


  // Callback para la llamada a la API
  const fetchRooms = useCallback(async () => {
    if (!detectedLocation) {
      // Si no hay ubicación detectada, no hacemos la llamada
      setIsLoadingInitialData(false);
      setAwaitResult(true); // Podría ser true para mostrar "NoFoundSearch" si la ubicación es crucial
      setOriginalRooms([]);
      return;
    }

    setIsLoading(true); // Para cargar los resultados de la búsqueda
    setAwaitResult(true); // Inicialmente estamos esperando resultados

    try {
      const response = await axios.get<RoomAllApi[]>(
        `${process.env.NEXT_PUBLIC_API_ROUTE}room/search?term=${query}&cityId=${detectedLocation.id}`
      );
      setOriginalRooms(response.data);
      setTotalCountResultsFilter(response.data.length);
      setAwaitResult(false); // Tenemos resultados (aunque sean 0)
    } catch (error: any) {
      console.error("Error fetching rooms:", error);
      setOriginalRooms([]);
      setTotalCountResultsFilter(0);
      setAwaitResult(false); // La API falló, no hay resultados.
    } finally {
      setIsLoading(false);
      setIsLoadingInitialData(false); // La carga inicial ha terminado
    }
  }, [query, detectedLocation]); // Depende de la query y la ubicación detectada


  // Effect para ejecutar fetchRooms cuando la ubicación detectada esté disponible
  useEffect(() => {
    if (detectedLocation !== undefined) { // Solo si ya hemos determinado si hay o no ubicación
      fetchRooms();
    }
  }, [detectedLocation, fetchRooms]);


  // Lógica de filtrado y paginación
  const filteredAndPaginatedRooms = useMemo(() => {
    let currentFilteredRooms = [...originalRooms]; // Trabaja con la copia original

    // Aplicar filtros
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

    if (onSale === "true") {
      currentFilteredRooms = currentFilteredRooms.filter(room => room.promoActive);
    }

    // Ordenamiento
    let sortedRooms = [...currentFilteredRooms];
    if (orderPrice === "asc") {
      sortedRooms = sortedRooms.sort((a, b) => a.price - b.price);
    } else if (orderPrice === "desc") {
      sortedRooms = sortedRooms.sort((a, b) => b.price - a.price);
    }

    // Actualizar el conteo total de resultados después de filtrar/ordenar
    setTotalCountResultsFilter(sortedRooms.length);
    setTotalPages(Math.ceil(sortedRooms.length / itemsPerPage));

    // Paginación
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedRooms.slice(startIndex, endIndex);
  }, [
    originalRooms,
    category,
    garage,
    amenities,
    onSale,
    orderPrice,
    currentPage,
    itemsPerPage
  ]);

  // Actualiza las habitaciones mostradas cuando cambian los filtros/paginación
  useEffect(() => {
    setDisplayedRooms(filteredAndPaginatedRooms);
  }, [filteredAndPaginatedRooms]);


  // Handlers para los filtros
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

  const BestPromotion = useMemo(() => {
    const best = getBestPromotionRoom(originalRooms);
    return best?.discountedPrice || null;
  }, [originalRooms]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Nueva variable de estado para controlar si la búsqueda inicial tuvo resultados
  const [initialSearchHadNoResults, setInitialSearchHadNoResults] = useState(false);

  useEffect(() => {
    if (!isLoadingInitialData && !awaitResult) {
      setInitialSearchHadNoResults(originalRooms.length === 0);
    }
  }, [isLoadingInitialData, awaitResult, originalRooms.length]);

  return (
    <>
      <SideBarMenuFilter
        BestPromotion={BestPromotion}
        categoryRoom={categoryRoom}
        garageRoom={garageRoom}
        amenitiesRoom={amenitiesRoom}
        onSelectedCategory={handleFilterCategory}
        onselectedGarage={handleFilterGarage}
        onSelectedAmenities={handleFilterAmenities}
        onToogleSale={handleFilterSale}
        onToogleinAvailable={handleFilterAviable}
      />

      {isLoadingInitialData ? ( // Muestra el spinner de carga inicial
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
      ) : initialSearchHadNoResults ? ( // Condición para cuando la búsqueda inicial NO retorna resultados
        <>
          <NoFoundSearch query={decodedSearchTerm} />
          <div className="mt-20 md:mt-32">
            <SuggestedAndTopRoom />
          </div>
        </>
      ) : ( // Cuando hay datos cargados, o se están cargando elementos específicos, o no se encontró nada por filtros
        <div className="bg-white">
          {/* Sección visible en dispositivos móviles */}
          <div className="Block md:hidden mt-28 justify-between items-center md:mt-0">
            <div className="px-3">
              <p className={`text-lg md:text-xl antialiased`}>
                Busquedad: {decodedSearchTerm}
              </p>
              {isLoading ? (
                <div className="flex justify-start">
                  <div className="w-24 h-4 mb-2 bg-gray-400 rounded-sm animate-pulse"></div>
                </div>
              ) : (
                <p className="text-xs text-black">
                  Resultados: {totalCountResultsFilter}
                </p>
              )}
            </div>
            <div className="flex justify-between mt-6 mx-3 mb-5">
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

          {/* Sección visible en dispositivos de escritorio */}
          <div className="hidden md:flex justify-between items-end bg-gray-100 border-b border-gray-200 shad shadow-sm mt-12 px-4 py-10">
            <div className="px-10">
              <p className="text-xl text-black">
                Busquedad:{" "}
                <span className="capitalize text-black">
                  {decodedSearchTerm}
                </span>
              </p>
              <p className="text-sm text-black">
                Resultados: {totalCountResultsFilter}
              </p>
            </div>
            <div className="flex justify-start mt-2 md:mt-0 px-3 md:justify-end5 md:px-10 ">
              <SortRooms
                onOrderMostReserved={(order) => setOrderMostReserved(order)}
                onSortByPrice={(order) => setOrderPrice(order)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-12 md:p-10">
            <div className="hidden md:block col-span-2">
              <div className="sticky top-24">
                <SideMenuFilter
                  BestPromotion={BestPromotion}
                  categoryRoom={categoryRoom}
                  garageRoom={garageRoom}
                  amenitiesRoom={amenitiesRoom}
                  onSelectedCategory={handleFilterCategory}
                  onselectedGarage={handleFilterGarage}
                  onSelectedAmenities={handleFilterAmenities}
                  onToogleSale={handleFilterSale}
                  onToogleinAvailable={handleFilterAviable}
                />
              </div>
            </div>

            <div className="col-span-1 md:col-span-10 rounded-md mt-0 md:mt-3">
              {isLoading ? ( // Muestra esqueletos mientras se cargan o se aplican filtros
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
              ) : displayedRooms.length > 0 ? ( // Muestra los resultados si los hay
                <>
                  <GridRoomSearch rooms={displayedRooms} location={detectedLocation} />
                  <div className="mb-10">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </>
              ) : ( // Esto se mostrará si isLoading es false, initialSearchHadNoResults es false y displayedRooms.length es 0 (ej: no hay resultados después de un filtro)
                <div className="flex justify-center px-5 items-center h-screen">
                  <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
                    <TbBedOff size={50} />
                    <h3 className="text-md md:text-xl font-semibold mt-4 text-black">
                      No se encontraron habitaciones
                    </h3>
                    <p className="text-gray-700 text-xs md:text-md mt-2">
                      Lo sentimos, no hemos podido encontrar ninguna habitación
                      que coincida con tu búsqueda.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};