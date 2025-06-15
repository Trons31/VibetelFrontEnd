'use server';
import prisma from "@/lib/prisma";

interface GetReservationsParams {
    motelId: string;
    searchFilter: string;
    page: number;
    limit: number;
}

export const getRoomsInAvailableByMotel = async ({ motelId, searchFilter, page, limit = 10 }: GetReservationsParams) => {
    try {
        const currentTime = new Date();

        // Obtener la configuración del motel para determinar el tiempo de limpieza
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

        const timeMinutesCleanRoom = motelConfig.timeMinutesCleanRoom;

        // Condiciones iniciales para las habitaciones disponibles
        let whereConditions: any = {
            motelId: motelId,
            inAvailable: true,
            status: "AVAILABLE"
        };

        if (searchFilter) {
            whereConditions.AND = [{ title: { contains: searchFilter } }];
        }

        // Obtener el tiempo límite para la validación
        const maxTime = new Date(currentTime.getTime() + timeMinutesCleanRoom * 60 * 1000);

        // Validar que las habitaciones no estén solapadas con servicios programados en el futuro
        const rooms = await prisma.room.findMany({
            where: {
                ...whereConditions,
                NOT: {
                    ServiceItem: {
                        some: {
                            OR: [
                                {
                                    arrivalDate: { gte: currentTime, lte: maxTime },
                                },
                                {
                                    departureDate: { gte: currentTime, lte: maxTime },
                                },
                            ],
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                title: true,
                roomNumber: true,
                price: true,
                timeLimit: true,
                promoActive: true,
                promoPrice: true,
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        // Conteo total de habitaciones disponibles
        const totalCount = await prisma.room.count({
            where: {
                ...whereConditions,
                NOT: {
                    ServiceItem: {
                        some: {
                            OR: [
                                {
                                    arrivalDate: { gte: currentTime, lte: maxTime },
                                },
                                {
                                    departureDate: { gte: currentTime, lte: maxTime },
                                },
                            ],
                        },
                    },
                },
            },
        });

        return {
            ok: true,
            rooms,
            totalCount,
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            rooms: [],
            totalCount: 0,
            message: `No se pudieron obtener las reservas del motel con id ${motelId}`,
        };
    }
};
