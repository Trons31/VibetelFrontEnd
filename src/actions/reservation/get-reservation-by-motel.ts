'use server';
import prisma from "@/lib/prisma";

interface GetReservationsParams {
    motelId: string;
    searchQuery: string;
    statusFilter: string;
    date: Date | null;
    page: number;
    limit: number;
}

export const getReservationsByMotel = async ({ motelId, searchQuery, statusFilter, date, page, limit = 10 }: GetReservationsParams) => {
    try {

        let whereConditions: any = {
            ServiceItem: {
                room: { motelId: motelId },
            },
            type: 'reservation',
            paymentStatus: 'ACCEPTED'
        };

        if (statusFilter || searchQuery || date) {
            whereConditions.AND = [];

            if (statusFilter) {
                whereConditions.AND.push({ ServiceItem: { status: { equals: statusFilter } } });
            }

            if (searchQuery) {
                whereConditions.AND.push({ ServiceItem: { room: { title: { contains: searchQuery } } } });
            }

            if (date) {
                const localDate = new Date(date);
                const startOfDay = new Date(localDate);
                startOfDay.setHours(0, 0, 0, 0); // Inicio del día en hora local

                const endOfDay = new Date(localDate);
                endOfDay.setHours(23, 59, 59, 999); // Fin del día en hora local

                whereConditions.AND.push({
                    ServiceItem: {
                        arrivalDate: {
                            gte: startOfDay,
                            lte: endOfDay,
                        },
                    },
                });
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
