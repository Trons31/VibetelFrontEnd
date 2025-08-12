"use client";
import {
  GridMotelBySlug,
  ModalLocationMotel,
  NoService,
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
  MotelBySlugApi,
  motelConfig,
  RoomAllApi,
} from "@/interfaces";
import { useLocationStore, useUIStore } from "@/store";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaMagnifyingGlassLocation, FaRegStar } from "react-icons/fa6";
import { IoChevronForward, IoLocationSharp, IoOptionsSharp } from "react-icons/io5";
import { MdOutlineBed, MdOutlineLocationOn } from "react-icons/md";
import { TbBedOff, TbPointFilled } from "react-icons/tb";
import { TiLocationArrowOutline } from "react-icons/ti";

interface Props {
  motel: MotelBySlugApi;
  categoryRoom: CategoryRoomApi[];
  garageRoom: GarageRoomApi[];
  amenitiesRoom: AmenitiesRoomApi[];
  motelConfig: motelConfig;
}

export const FilterRooms = ({ categoryRoom, garageRoom, amenitiesRoom, motel, motelConfig }: Props) => {
  const openSideMenuFilter = useUIStore((state) => state.openSideMenuFilter);
  const { locationUser } = useLocationStore();

  const [detectedLocation, setDetectedLocation] = useState<LocationCity | undefined>(undefined);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true); // Renombrado para consistencia
  const [modalLocationUser, setModalLocationUser] = useState(false);
  const [openModalLocationMotel, setOpenModalLocationMotel] = useState(false);

  const [originalRooms, setOriginalRooms] = useState<RoomAllApi[]>([]);
  const [displayedRooms, setDisplayedRooms] = useState<RoomAllApi[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true); // Renombrado para consistencia
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

  // Efecto para procesar la ubicación del usuario desde el store
  useEffect(() => {
    if (locationUser === null) {
      setDetectedLocation(undefined); // Si es null, lo convertimos a undefined
    } else if (locationUser !== undefined) {
      setDetectedLocation(locationUser);
    }
    setIsLoadingLocation(false); // La ubicación ha sido procesada
  }, [locationUser]);

  const fetchRooms = useCallback(async () => {
    setIsLoadingRooms(true); // Usamos isLoadingRooms
    try {
      const response = await axios.get<RoomAllApi[]>(
        `${process.env.NEXT_PUBLIC_API_ROUTE}room/motel/${motel.slug}`
      );
      setOriginalRooms(response.data);
    } catch (error: any) {
      setOriginalRooms([]);
      console.error("Error al cargar habitaciones:", error);
    } finally {
      setIsLoadingRooms(false); // Usamos isLoadingRooms
    }
  }, [motel.slug]); // Depende únicamente del slug del motel

  useEffect(() => {
    // No necesitamos `detectedLocation` aquí para `fetchRooms`
    // porque las habitaciones son específicas del motel, no de la ubicación del usuario.
    // Solo se debe llamar cuando el componente se monta o el slug del motel cambia.
    fetchRooms();
  }, [fetchRooms]); // Depende solo de fetchRooms

  const filteredAndPaginatedRooms = useMemo(() => {
    let currentFilteredRooms = [...originalRooms];

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

    setTotalCountResultsFilter(sortedRooms.length);
    setTotalPages(Math.ceil(sortedRooms.length / itemsPerPage));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedRooms.slice(startIndex, endIndex);
  }, [originalRooms, category, garage, amenities, onSale, orderPrice, currentPage, itemsPerPage]);

  useEffect(() => {
    setDisplayedRooms(filteredAndPaginatedRooms);
  }, [filteredAndPaginatedRooms]);

  // Handlers para los filtros, ahora envueltos en useCallback
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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
    return getBestPromotionRoom(originalRooms)?.discountedPrice || null;
  }, [originalRooms]);

  return (
    <>
      <SideBarMenuFilter
        categoryRoom={categoryRoom}
        garageRoom={garageRoom}
        amenitiesRoom={amenitiesRoom}
        BestPromotion={BestPromotion}
        onSelectedCategory={handleFilterCategory} // Pasamos la función directamente
        onselectedGarage={handleFilterGarage} // Pasamos la función directamente
        onSelectedAmenities={handleFilterAmenities} // Pasamos la función directamente
        onToogleSale={handleFilterSale} // Pasamos la función directamente
        onToogleinAvailable={handleFilterAviable} // Pasamos la función directamente
      />

      <ModalLocationMotel
        motelName={motel.razonSocial}
        motelLocationLatitude={motelConfig!.locationLatitude!}
        motelLocationLongitude={motelConfig!.locationLongitude!}
        isOpen={openModalLocationMotel}
        onClose={() => setOpenModalLocationMotel(false)}
      />

      {/* Mostrar NoService solo si el motel no está en servicio */}
      {!motelConfig.inService && (
        <NoService startDateOffService={motelConfig.outOfServiceStart!} endDateOffService={motelConfig.outOfServiceEnd!} />
      )}

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
        <div className="flex gap-3 h-screen justify-center items-center">
          <div className="block md:flex items-center gap-4 px-2">
            <div className="flex mb-2 cursor-pointer rounded-md p-2 md:mb-0 justify-center hover:bg-gray-200">
              <FaMagnifyingGlassLocation
                onClick={() => {
                  setModalLocationUser(true);
                }}
                className="w-10 h-10 text-gray-500"
              />
            </div>
            <div>
              <p className="text-gray-900 text-center md:text-start text-2xl font-semibold">
                Ingresa tu ubicacion
              </p>
              <p className="text-gray-800 text-center text-sm font-medium">
                Te mostraremos las habitaciones de los moteles registrados en tu zona cuando ingreses tu ubicacion
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Si la ubicación fue detectada, procedemos a mostrar el contenido principal
        <>
          <div className="bg-white">
            <div className="Block md:hidden mt-28 justify-between items-center md:mt-0">
              <div className="px-3 mb-6">
                <div className="flex justify-between items-center">
                  <h1 className={`text-xl font-bold capitalize antialiased`}>{motel.razonSocial}</h1>
                  <Link
                    href={`/motel/info/${motel!.slug}`}
                    className="text-xs px-2 py-1 bg-blue-600 rounded-full text-white flex items-center hover:underline"
                  >
                    ver mas
                  </Link>
                </div>
                <p className="text-xs text-gray-700">Encuentra tu habitacion perfecta</p>
                <div className="flex md:hidden items-center space-x-2 mt-2">
                  <button onClick={() => setOpenModalLocationMotel(true)} className="text-xs flex gap-1 items-center text-gray-800 ">
                    <IoLocationSharp className="h-3.5 w-3.5" />
                    Ubicacion
                  </button>
                  <TbPointFilled className="w-2 h-2 flex-shrink-0" />
                  <p className="flex items-center text-xs gap-2">
                    <FaRegStar className="h-3.5 w-3.5" />5 calificacion
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-3 mx-3 mb-5">
                <SortRooms onOrderMostReserved={setOrderMostReserved} onSortByPrice={setOrderPrice} />

                <button className="flex justify-center text-sm gap-2 px-2 my-2 items-center" onClick={openSideMenuFilter}>
                  <p className="text-gray-700">Filtrar</p>
                  <IoOptionsSharp size={20} className="text-gray-700" />
                </button>
              </div>
            </div>

            <div className="hidden md:flex justify-between items-end bg-gray-100 border-b border-gray-200 shad shadow-sm mt-12 px-4 py-10">
              <div className="block px-10">
                <p className="text-2xl capitalize text-black font-normal"> {motel.razonSocial} </p>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="flex items-center text-xs gap-2">
                      <MdOutlineBed className="h-4 w-4" />
                      {motel.totalRooms} habitaciones
                    </p>
                    <TbPointFilled className="w-2 h-2 flex-shrink-0" />
                    <p className="flex items-center text-xs gap-2">
                      <FaRegStar className="h-3.5 w-3.5" />
                      {
                        motel.averageRating === 0
                          ? "Sin calificacion"
                          : motel.averageRating
                      }

                      {
                        motel.averageRating > 0 &&
                        " Calificacion"
                      }

                    </p>
                    <TbPointFilled className="w-2 h-2 flex-shrink-0" />
                    <p className="flex items-center text-xs gap-2">
                      <MdOutlineLocationOn className="h-3.5 w-3.5" />
                      {motel.city.name}
                    </p>
                    <TbPointFilled className="w-2 h-2 flex-shrink-0" />
                    <button onClick={() => setOpenModalLocationMotel(true)} className="text-xs flex gap-1 items-center text-gray-800 underline">
                      <TiLocationArrowOutline className="h-3.5 w-3.5" />
                      Ubicacion
                    </button>
                    <TbPointFilled className="w-2 h-2 flex-shrink-0" />
                    <Link
                      href={`/motel/info/${motel.slug}`}
                      className="text-xs text-black flex items-center hover:underline"
                    >
                      Mas informacion
                      <IoChevronForward />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex justify-start mt-2 md:mt-0 px-3 md:justify-end5 md:px-10 ">
                <SortRooms onOrderMostReserved={setOrderMostReserved} onSortByPrice={setOrderPrice} />
              </div>
            </div>

            <div className="grid md:grid-cols-12 md:p-10">
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
                    <GridMotelBySlug rooms={displayedRooms} />
                    <div className="mb-10">
                      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                  </>
                ) : (
                  // Si no hay habitaciones después de la carga
                  <div className="flex justify-center px-5 items-center h-screen">
                    <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
                      <TbBedOff size={50} />
                      <h3 className="text-md md:text-xl font-semibold mt-4 text-black">
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