'use server';
import prisma from '@/lib/prisma';

export const getReservationById = async (IdReservation: string) => {
    try {

        const reservation = await prisma.service.findUnique({
            where: {
                id: IdReservation,
                type: "reservation",
                paymentStatus: 'ACCEPTED'
            },
            include: {
                ServiceItem: {
                    include: {
                        room: {
                            select: {
                                motel: {
                                    select: {
                                        title: true,
                                        address: true,
                                        neighborhood: true,
                                        contactPhone: true,
                                        MotelConfig: {
                                            select: {
                                                defaultReservationAddTime: true,
                                            }
                                        }
                                    }
                                },
                                slug: true,
                                roomImage: {
                                    take: 2,
                                    select: {
                                        url: true,
                                    },
                                },
                                priceAddTime: true,
                            },
                        },
                        serviceAddTime: {
                            where: { paymentStatus: "ACCEPTED" },
                            select: {
                                newDepartureDate: true,
                            },
                            orderBy: {
                                newDepartureDate: 'desc', // Ordena por la fecha más reciente
                            },
                            take: 1, // Toma solo el más reciente
                        },
                    },
                },
                RoomRating: {
                    select: {
                        rating: true
                    }
                }
            }
        });

        if (!reservation) return {
            ok: false,
            message: `No se pudieron obtener las reservas del usuario con id ${IdReservation}`,
        };


        const latestNewDepartureDate = reservation?.ServiceItem?.serviceAddTime[0]?.newDepartureDate;
        return {
            ok: true,
            reservation: {
                ...reservation,
                departureDate: latestNewDepartureDate || reservation?.ServiceItem?.departureDate!,
            },
        };
    } catch (error) {
        return {
            ok: false,
            message: `No se pudieron obtener las reservas del usuario con id ${IdReservation}`,
        };
    }
};
