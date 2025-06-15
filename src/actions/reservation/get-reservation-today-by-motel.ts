'use server';
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay } from 'date-fns';


interface GetReservationsParams {
    motelId: string;
    searchQuery: string;
    statusFilter: string;
    page: number;
    limit: number;
}

export const getTodayReservationsByMotel = async ({ motelId, searchQuery, statusFilter, page, limit = 10 }: GetReservationsParams) => {

    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);

    try {

        let whereConditions: any = {
            ServiceItem: {
                room: { motelId: motelId },
                arrivalDate: {
                    gte: start,
                    lte: end,
                },
            },
            type: 'reservation',
            paymentStatus: 'ACCEPTED'
        };

        if (statusFilter || searchQuery) {
            whereConditions.AND = [];

            if (statusFilter) {
                whereConditions.AND.push({ ServiceItem: { status: { equals: statusFilter } } });
            }

            if (searchQuery) {
                whereConditions.AND.push({ ServiceItem: { room: { title: { contains: searchQuery } } } });
            }

        }

        // TODO: Modifique los Id

        const reservations = await prisma.service.findMany({
            where: whereConditions,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                ServiceItem: {
                    select: {
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
                id: reservation.id,
                title: reservation.ServiceItem?.title,
                arrivalDate: reservation.ServiceItem?.arrivalDate,
                roomNumber: reservation.ServiceItem?.roomNumber,
                accessCode: reservation.ServiceItem?.accessCode,
                status: reservation.ServiceItem?.status,
            })),
            totalCount,
        };

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            reservations: [],
            totalCount: 0,
            message: `No se pudieron obtener las reservas del motel con id ${motelId}`,
        };
    }
};
