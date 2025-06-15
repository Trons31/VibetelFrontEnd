'use server';

import prisma from '@/lib/prisma';
import { startOfDay, endOfDay } from 'date-fns';


export const getReservationByRoomId = async (roomId: string) => {

  const today = new Date();
  const start = startOfDay(today);
  const end = endOfDay(today);

  try {
    // Obtén los totales de reservas por estado
    const reservationsCount = await prisma.serviceItem.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
      where: {
        roomId: roomId,
        arrivalDate: {
          gte: start,
          lte: end,
        },
      },
    });

    // Obtén todas las reservas de la habitación con hora de entrada y salida
    const reservations = await prisma.serviceItem.findMany({
      where: {
        roomId: roomId,
        service: {
          type: "reservation"
        },
        arrivalDate: {
          gte: start,
          lte: end,
        },
      },
      select: {
        id: true,
        timeLimit: true,
        arrivalDate: true,
        departureDate: true,
        status: true,
      },
    });

    // Formatea los resultados
    const formattedCounts = {
      en_espera: reservationsCount.find(res => res.status === 'en_espera')?._count.id || 0,
      completado: reservationsCount.find(res => res.status === 'completado')?._count.id || 0,
      cancelado: reservationsCount.find(res => res.status === 'cancelado')?._count.id || 0,
      iniciado: reservationsCount.find(res => res.status === 'iniciado')?._count.id || 0,
    };

    const totalCount = await prisma.serviceItem.count({
      where: {
        roomId: roomId,
        service: {
          type: "reservation"
        },
        arrivalDate: {
          gte: start,
          lte: end,
        },
      },
    });

    return {
      ok: true,
      reservations,
      statusCounts: formattedCounts,
      totalCount
    };

  } catch (error) {
    return {
      ok: false,
      reservations: [],
      statusCounts: {
        en_espera: 0,
        completado: 0,
        cancelado: 0,
        iniciado: 0,
      },
      totalCount: 0
    }
  }
};
