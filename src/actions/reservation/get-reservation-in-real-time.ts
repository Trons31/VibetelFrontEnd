
'use server';
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay } from "date-fns";

interface GetReservationsParams {
  motelId: string;
  page: number;
  limit: number;
}

export const getReservationInRealTime = async ({ motelId, page, limit = 10 }: GetReservationsParams) => {
  const now = new Date();
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);

  try {

    let whereConditions: any = {
      ServiceItem: {
        room: { motelId: motelId },
        arrivalDate: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      type: 'reservation',
      paymentStatus: 'ACCEPTED'
    };


    const reservations = await prisma.service.findMany({
      where: whereConditions,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        createdAt: true,
        ServiceItem: {
          select: {
            id: true,
            arrivalDate: true,
            roomNumber: true,
            title: true,
            timeLimit: true,
            accessCode: true,
            departureDate: true,
            status: true,
          }
        },
      },
      skip: (page - 1) * limit,
      take: limit
    });

    const totalCount = await prisma.service.count({
      where: whereConditions,
    });

    return {
      ok: true,
      reservations: reservations.map(reservation => ({
        id: reservation.id,
        title: reservation.ServiceItem?.title || "No title",
        arrivalDate: reservation.ServiceItem?.arrivalDate.toISOString() || new Date().toISOString(),
        departureDate: reservation.ServiceItem?.departureDate.toISOString() || new Date().toISOString(),
        timeLimit: reservation.ServiceItem?.timeLimit || 0,
        executedDate: reservation.createdAt.toISOString()
      })),
      totalCount
    }

  } catch (error) {
    console.error('Error fetching reservations:', error);
    return {
      ok: false,
      reservations: [],
      totalBooking: 0,
    };
  }
};
