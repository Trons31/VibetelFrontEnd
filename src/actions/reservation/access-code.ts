'use server';

import prisma from '@/lib/prisma';
import { startOfDay, endOfDay } from 'date-fns';

export const searchAccessCode = async (query: string, motelId: string) => {
  try {
    if (!query) return [];

    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);

    const reservations = await prisma.serviceItem.findMany({
      where: {
        accessCode: {
          contains: query,
          mode: 'insensitive',
        },
        room: {
          motelId: motelId,
        },
        arrivalDate: {
          gte: todayStart,
          lte: todayEnd,
        },
        service: {
          type: 'reservation',
          paymentStatus: 'ACCEPTED',
          ServiceItem: {
            status: "en_espera"
          }
        },
      },
      select: {
        id: true,
        accessCode: true,
        title: true,
        room: {
          select: {
            roomNumber: true,
          },
        },
        arrivalDate: true,
      },
      orderBy: {
        arrivalDate: 'desc',
      },
    });

    return reservations;
  } catch (error) {
    console.error('Error searching access codes:', error);
    return [];
  }
};
