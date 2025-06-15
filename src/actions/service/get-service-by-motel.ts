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

export const getServiceByMotel = async ({ motelId, searchQuery, statusFilter, date, page, limit = 10 }: GetReservationsParams) => {

    try {

        let whereConditions: any = {
            ServiceItem: {
                room: { motelId: motelId },
            },
            type: 'noReservation'
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
                const startOfDay = new Date(date);
                startOfDay.setUTCHours(0, 0, 0, 0);

                const endOfDay = new Date(date);
                endOfDay.setUTCHours(23, 59, 59, 999);

                whereConditions.AND.push({
                    createdAt: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                });
            }

        }

        const services = await prisma.service.findMany({
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
            services: services.map(service => ({
                id: service.id,
                title: service.ServiceItem?.title,
                arrivalDate: service.ServiceItem?.arrivalDate,
                roomNumber: service.ServiceItem?.roomNumber,
                departureDate: service.ServiceItem?.departureDate,
                status: service.ServiceItem?.status,
            })),
            totalCount,
        };

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            services: [],
            totalCount: 0,
            message: `No se pudieron obtener las reservas del motel con id ${motelId}`,
        };
    }
};
