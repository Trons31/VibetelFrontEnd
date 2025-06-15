"use server";
import prisma from "@/lib/prisma";

interface GetReservationsParams {
  motelId: string;
  searchFilter: string;
  page: number;
  itemsPerPage: number;
}

export const getRoomsByMotelManager = async ({
  motelId,
  searchFilter,
  page,
  itemsPerPage,
}: GetReservationsParams) => {
  const skip = (page - 1) * itemsPerPage;
  const now = new Date();

  try {
    // Obtener la configuración del motel
    const motelConfig = await prisma.motelConfig.findUnique({
      where: { motelId },
      select: { timeMinutesCleanRoom: true },
    });

    if (!motelConfig || motelConfig.timeMinutesCleanRoom === null) {
      return {
        ok: false,
        rooms: [],
        totalCount: 0,
        message: "No se encontró la configuración del motel o está incompleta.",
      };
    }

    const timeMinutesCleanRoom = motelConfig.timeMinutesCleanRoom; // Tiempo de limpieza del motel

    // Obtener habitaciones con sus servicios
    const rooms = await prisma.room.findMany({
      where: {
        motelId,
      },
      select: {
        id: true,
        title: true,
        roomNumber: true,
        status: true,
        price: true,
        timeLimit: true, // Obtener el tiempo límite de la habitación
        RoomCleaning: {
          select: { createdAt: true },
        },
        ServiceItem: {
          orderBy: { arrivalDate: "asc" },
          select: {
            arrivalDate: true,
            departureDate: true,
            dateComplete: true,
          },
        },
      },
      take: itemsPerPage,
      skip: skip,
    });

    // Filtrar habitaciones que tengan un servicio futuro que no permita su uso
    const availableRooms = rooms.filter((room) => {
      const nextService = room.ServiceItem.find(
        (service) => service.arrivalDate && new Date(service.arrivalDate) > now
      );

      if (nextService) {
        const arrivalTime = new Date(nextService.arrivalDate).getTime();

        // Tiempo total necesario antes del próximo servicio
        const requiredTime =
          (room.timeLimit + timeMinutesCleanRoom) * 60 * 1000;
        const availableUntil = now.getTime() + requiredTime; // Tiempo disponible hasta el servicio futuro

        if (availableUntil > arrivalTime) {
          return false; // No hay suficiente espacio para otro servicio antes del próximo
        }
      }

      return true; // Si no hay servicios futuros cercanos o hay suficiente tiempo, la habitación es válida
    });

    // Ordenar las habitaciones por la fecha de finalización del último servicio
    availableRooms.sort((a, b) => {
      const dateA = a.ServiceItem[0]?.dateComplete
        ? new Date(a.ServiceItem[0].dateComplete).getTime()
        : 0;
      const dateB = b.ServiceItem[0]?.dateComplete
        ? new Date(b.ServiceItem[0].dateComplete).getTime()
        : 0;
      return dateB - dateA;
    });

    // Contar habitaciones disponibles después del filtrado
    const totalCount = availableRooms.length;

    return {
      ok: true,
      rooms: availableRooms,
      totalCount,
      timeMinutesCleanRoom,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      rooms: [],
      totalCount: 0,
      timeMinutesCleanRoom: 0,
      message: `No se pudieron obtener las reservas del motel con id ${motelId}`,
    };
  }
};
