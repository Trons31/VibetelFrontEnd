'use server';
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay } from 'date-fns';

interface GetReservationsParams {
    motelId: string;
    searchQuery: string;
    statusFilter: string;
    date: Date | null;
    page: number;
    limit: number;
}

export const getServiceByMotelToday = async ({ motelId, searchQuery, statusFilter, date, page, limit = 10 }: GetReservationsParams) => {

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
