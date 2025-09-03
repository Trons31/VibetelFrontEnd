"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import {
  CleaningTimeDisplay,
  PaginationTable,
  SkeletonTableCheckIn,
} from "@/components";
import { motion } from "framer-motion";
import { statusRoom, RoomManagerProps } from "@/interfaces";
import { MdBlockFlipped } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { ActionsManager } from "./ActionsManager";

interface Props {
  motelId: string;
}

interface Rooms {
  id: string;
  title: string;
  status: statusRoom;
  roomNumber: string;
  price: number;
  RoomCleaning: {
    createdAt: Date;
  } | null;
}

export const RoomManager = ({ motelId }: Props) => {
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [totalCountResultsFilter, setTotalCountResultsFilter] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [selectedRooms, setSelectedRooms] = useState<RoomManagerProps[]>([]);
  const [timeMinutesCleamRoom, setTimeMinutesCleamRoom] = useState(0);

  const searchFilterRef = useRef(searchFilter);

  useEffect(() => {
    searchFilterRef.current = searchFilter;
  }, [searchFilter]);

  const fetchRooms = useCallback(async () => {
    setIsLoading(true);
    // const data = await getRoomsByMotelManager({
    //   motelId,
    //   searchFilter,
    //   page: currentPage,
    //   itemsPerPage,
    // });
    // if (data.ok && data.totalCount !== undefined) {
    //   const { rooms, totalCount, timeMinutesCleanRoom } = data;
    //   setRooms(rooms);
    //   setTimeMinutesCleamRoom(timeMinutesCleanRoom!);
    //   setTotalCountResultsFilter(totalCount);
    //   const totalPagesCount = Math.ceil(totalCount / itemsPerPage);
    //   setTotalPages(totalPagesCount);
    // }
    setIsLoading(false);
  }, [currentPage, itemsPerPage, searchFilter]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleFilterChange = (newSearchFilter: string) => {
    setSearchFilter(newSearchFilter);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setCurrentPage(1);
    setRooms([]);
    handleFilterChange(searchQuery);
  };

  const cleanInputSearch = async () => {
    setIsLoading(true);
    setSearchFilter("");
    setSearchQuery("");
    setCurrentPage(1);
    setRooms([]);
  };

  const handleCheckboxChange = (room: RoomManagerProps) => {
    setSelectedRooms((prev) =>
      prev.includes(room)
        ? prev.filter((r) => r.id !== room.id)
        : [...prev, room]
    );
  };

  const handleSelectAll = () => {
    if (selectedRooms.length === rooms.length) {
      setSelectedRooms([]); // Si todas están seleccionadas, deseleccionar todas
    } else {
      setSelectedRooms(rooms.map((room) => room)); // Seleccionar todas
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Resetea la página actual al cambiar el número de elementos por página
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRemoveRoom = (roomId: string) => {
    setSelectedRooms((prevRooms) =>
      prevRooms.filter((room) => room.id !== roomId)
    );
  };

  const hasCleaningRooms = rooms.some((room) => room.status === "CLEANING");

  return (
    <>
      <div className="bg-gray-50 py-5 mt-5 rounded-lg">
        <div className="mb-6">
          <div className="flex items-center px-5 justify-between">
            <h1 className=" text-2xl font-bold text-gray-900">Habitaciones</h1>
          </div>

          <div className="ml-5">
            <p className="text-gray-500 text-sm text-start">
              Aquí podrás ver todas las habitaciones disponibles y gestionar su
              estado en tiempo real.{" "}
              <strong>
                Puedes marcar una habitación en limpieza cuando sea necesario.
              </strong>
            </p>
          </div>
        </div>

        <div className="flex mt-4 justify-between items-center ">
          <div className="px-2 leading-6">
            <div className="relative mx-auto flex w-full max-w-2xl items-center justify-between rounded-md border shadow-sm">
              <IoSearchOutline className="absolute left-2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 w-full rounded-md py-4 pr-12 pl-12 outline-none focus:ring-2"
                placeholder="Habitacion, codigo de acceso, numero de habitacion:"
              />
              <div className="flex gap-2 items-center px-2">
                {searchFilter && (
                  <IoCloseOutline
                    size={30}
                    className="text-red-600 cursor-pointer"
                    onClick={cleanInputSearch}
                  />
                )}
                <button
                  type="button"
                  onClick={handleSearch}
                  className="inline-flex h-8 items-center justify-center rounded-lg bg-blue-600 px-4 font-medium text-white hover:bg-blue-700"
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-6 justify-end items-center">
          <ActionsManager
            selectedRooms={selectedRooms}
            onRemoveRoom={handleRemoveRoom}
          />
        </div>

        <div className="mx-auto px-2 mt-1 mb-5">
          <div className="rounded-xl bg-white shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                {/* Cabecera de la tabla */}
                <thead className="bg-gray-100 border-b sticky top-0 z-10">
                  <tr>
                    <th className="p-2 w-12">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          selectedRooms.length === rooms.length &&
                          rooms.length > 0
                        }
                      />
                    </th>
                    <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                      Habitación
                    </th>
                    <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                      Estado
                    </th>
                    {hasCleaningRooms && (
                      <th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                        Duración
                      </th>
                    )}
                  </tr>
                </thead>
                {/* Cuerpo de la tabla con scroll vertical */}
                <tbody className="bg-white lg:border-gray-300">
                  {!isLoading &&
                    (rooms.length > 0 ? (
                      rooms.map((room) => (
                        <motion.tr
                          key={room.id}
                          initial={{ opacity: 0, x: -100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                          transition={{ duration: 0.3 }}
                          onClick={() => handleCheckboxChange(room)}
                          className="hover:bg-gray-200 cursor-pointer"
                        >
                          <th className="p-2 w-12">
                            <input
                              type="checkbox"
                              checked={selectedRooms.includes(room)}
                              onChange={() => handleCheckboxChange(room)}
                            />
                          </th>
                          <td className="whitespace-no-wrap py-4 text-center text-sm text-gray-600 sm:px-3 ">
                            {room.title} - Nro {room.roomNumber}
                          </td>
                          <td className="whitespace-no-wrap hidden text-center  py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                            {room.status === "AVAILABLE" && (
                              <span className="rounded-md px-2 py-1 text-xs font-medium bg-blue-600 text-white">
                                Disponible
                              </span>
                            )}

                            {room.status === "IN_SERVICE" && (
                              <span className="rounded-md px-2 py-1 text-xs font-medium bg-green-600 text-white">
                                En servicio
                              </span>
                            )}

                            {room.status === "SERVICE_COMPLETED" && (
                              <span className="rounded-md px-2 py-1 text-xs font-medium bg-purple-600 text-white">
                                Servicio completado
                              </span>
                            )}

                            {room.status === "CLEANING" && (
                              <span className="rounded-md px-2 py-1 text-xs font-medium bg-gray-600 text-white">
                                En limpieza
                              </span>
                            )}

                            {room.status === "DISABLED" && (
                              <span className="rounded-md px-2 py-1 text-xs font-medium bg-black text-white">
                                Desactivada
                              </span>
                            )}
                          </td>
                          {room.status === "CLEANING" &&
                            room.RoomCleaning?.createdAt &&
                            timeMinutesCleamRoom > 0 ? (
                            <td className="flex justify-center py-4">
                              <div className="flex justify-center items-center gap-2 rounded px-2 py-1 bg-red-600 w-fit">
                                <FaClock className="text-white" />
                                <CleaningTimeDisplay
                                  createdAt={
                                    room.RoomCleaning?.createdAt || null
                                  }
                                  timeMinutesCleamRoom={timeMinutesCleamRoom}
                                />
                              </div>
                            </td>
                          ) : (
                            hasCleaningRooms && (
                              <td className="flex justify-center py-4">
                                <div className="flex justify-center">
                                  <MdBlockFlipped className="text-red-600 h-5 w-5" />
                                </div>
                              </td>
                            )
                          )}
                        </motion.tr>
                      ))
                    ) : searchFilter === "" ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-4 text-center text-sm text-gray-600"
                        >
                          No existen habitaciones registradas.
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-4 text-center text-sm text-gray-600"
                        >
                          No se encontraron habitaciones.
                        </td>
                      </tr>
                    ))}

                  {isLoading && (
                    <tr>
                      <td colSpan={4}>
                        <SkeletonTableCheckIn />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {rooms.length > 0 && (
          <PaginationTable
            nameData="habitaciones"
            currentPage={currentPage}
            totalItems={rooms.length}
            onItemsPerPageChange={(value) => handleItemsPerPageChange(value)}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </>
  );
};
