'use server';
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay } from "date-fns";

interface GetReservationsParams {
    motelId: string;
    searchFilter: string;
    page: number;
    limit: number;
}

export const reservationCheckIn = async ({ motelId, searchFilter, page, limit = 10 }: GetReservationsParams) => {
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);

    try {
        let whereConditions: any = {
            ServiceItem: {
                room: { motelId: motelId },
                status: "en_espera",
                arrivalDate: {
                    gte: todayStart,
                    lte: todayEnd,
                },
            },
            type: 'reservation',
            paymentStatus: 'ACCEPTED'
        };

        if (searchFilter) {
            whereConditions.AND = [{ ServiceItem: { accessCode: { contains: searchFilter } } }];
        }

        const reservations = await prisma.service.findMany({
            where: whereConditions,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                ServiceItem: {
                    select: {
                        id: true,
                        arrivalDate: true,
                        roomNumber: true,
                        title: true,
                        accessCode: true,
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
                id: reservation.ServiceItem?.id,
                title: reservation.ServiceItem?.title,
                arrivalDate: reservation.ServiceItem?.arrivalDate,
                roomNumber: reservation.ServiceItem?.roomNumber,
                accessCode: reservation.ServiceItem?.accessCode,
                status: reservation.ServiceItem?.status,
            })),
            totalCount
        };

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            reservations: [],
            totalBooking: 0,
            message: `No se pudieron obtener las reservas del motel con id ${motelId}`,
        };
    }
};
