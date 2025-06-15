'use server';
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay } from 'date-fns';

interface GetReservationsParams {
    motelId: string;
    page: number;
    limit: number;
}


export const getReservationByRoom = async ({ motelId, page, limit = 10 }: GetReservationsParams) => {
    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);

    try {

        const roomsWithReservations = await prisma.room.findMany({
            where: {
                motelId: motelId,
            },
            select: {
                id: true,
                title: true,
                roomNumber: true,
                status: true,
                _count: {
                    select: {
                        ServiceItem: {
                            where: {
                                arrivalDate: {
                                    gte: start,
                                    lte: end,
                                },
                                service: {
                                    type: "reservation"
                                }
                            },
                        },
                    },
                },
            },
            orderBy: {
                roomNumber: 'asc', // Ordenar por roomNumber de forma ascendente
            },
            skip: (page - 1) * limit,
            take: limit
        });

        const totalCount = await prisma.service.count({
            where: {
                ServiceItem: {
                    room: {
                        motelId: motelId
                    },
                    arrivalDate: {
                        gte: start,
                        lte: end,
                    }
                },
                type: "reservation"
            }
        });

        return {
            ok: true,
            roomsWithReservations: roomsWithReservations.map(room => ({
                id: room.id,
                title: room.title,
                roomNumber: room.roomNumber,
                status: room.status,
                totalReservation: room._count.ServiceItem,
            })),
            totalCount
        };

    } catch (error) {
        console.error("Error fetching reservations by room:", error);
        return {
            ok: false,
            roomsWithReservations: [],
            totalCount: 0,
        };
    }



}

