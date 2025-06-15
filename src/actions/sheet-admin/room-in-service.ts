'use server';
import prisma from "@/lib/prisma";

interface GetReservationsParams {
    motelId: string;
    page: number;
    limit: number;
}

export const roomInServiceAdmin = async ({ motelId, page, limit = 10 }: GetReservationsParams) => {
    try {
        let whereConditions: any = {
            ServiceItem: {
                room: { motelId: motelId },
                status: "iniciado",
            }
        };

        const service = await prisma.service.findMany({
            where: whereConditions,
            orderBy: {
                ServiceItem: {
                    departureDate: 'desc'
                }
            },
            select: {
                type: true,
                ServiceItem: {
                    select: {
                        id: true,
                        roomNumber: true,
                        title: true,
                        departureDate: true,
                        dateTaken: true,
                        serviceAddTime: {
                            select: {
                                newDepartureDate: true,
                                addTimeReservation: true,
                                createdAt: true,
                                paymentStatus: true // Para aplicar la condición más adelante
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

        const formattedReservations = service.map(service => {
            const addTimes = service.ServiceItem?.serviceAddTime || [];
            
            // Filtrar `serviceAddTime` según el tipo de servicio
            const filteredAddTimes = service.type === "reservation"
                ? addTimes.filter(time => time.paymentStatus === "ACCEPTED")
                : addTimes;

            const totalAddTime = filteredAddTimes.reduce((total, current) => total + current.addTimeReservation, 0);

            const lastAddTime = filteredAddTimes.length > 0 ? filteredAddTimes[filteredAddTimes.length - 1].createdAt : null;

            return {
                id: service.ServiceItem?.id!,
                type: service.type,
                title: service.ServiceItem?.title || "No title",
                roomNumber: service.ServiceItem?.roomNumber || "",
                dateTaken: service.ServiceItem?.dateTaken!,
                departureDate: filteredAddTimes.length > 0 
                    ? filteredAddTimes[filteredAddTimes.length - 1].newDepartureDate!
                    : service.ServiceItem?.departureDate!,
                createdAtAddTime: lastAddTime,
                totalAddTime: totalAddTime
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
