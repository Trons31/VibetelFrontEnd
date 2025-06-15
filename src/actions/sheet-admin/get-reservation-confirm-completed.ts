
'use server';
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay } from "date-fns";

interface GetReservationsParams {
    motelId: string;
    page: number;
    limit: number;
}

export const getReservationConfirmCompleted = async ({ motelId, page, limit = 10 }: GetReservationsParams) => {
    const now = new Date();
    const todayStart = startOfDay(now);

    try {

        let whereConditions: any = {
            ServiceItem: {
                room: { motelId: motelId },
                status: "iniciado",
                userConfirmServiceCompleted: true,
            },
            type: "reservation"
        };


        const reservations = await prisma.service.findMany({
            where: whereConditions,
            orderBy: {
                ServiceItem: {
                    departureDate: 'desc'
                }
            },
            select: {
                id: true,
                ServiceItem: {
                    select: {
                        roomNumber: true,
                        title: true,
                        departureDate: true,
                        dateUserConfirmServiceCompleted: true,
                        serviceAddTime: {
                            select: {
                                newDepartureDate: true,
                                addTimeReservation: true,
                                createdAt: true,
                            },
                        }
                    }
                },
            },
            skip: (page - 1) * limit,
            take: limit
        });

        const totalCount = await prisma.service.count({
            where: whereConditions,
        });

        const formattedReservations = reservations.map(reservation => {
            const addTimes = reservation.ServiceItem?.serviceAddTime || [];

            return {
                id: reservation.id,
                title: reservation.ServiceItem?.title || "No title",
                roomNumber: reservation.ServiceItem?.roomNumber || "",
                departureDate: addTimes.length > 0 ? addTimes[addTimes.length - 1].newDepartureDate! : reservation.ServiceItem?.departureDate!,
                createdAt: reservation.ServiceItem?.dateUserConfirmServiceCompleted || new Date(),
            };
        });

        return {
            ok: true,
            reservations: formattedReservations,
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
