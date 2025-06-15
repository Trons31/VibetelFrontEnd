'use server';
import prisma from '@/lib/prisma';

export const getServiceById = async (IdService: string) => {
    try {

        const service = await prisma.service.findUnique({
            where: {
                id: IdService
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

        if (!service) return {
            ok: false,
            message: `No se pudieron obtener las reservas del usuario con id ${IdService}`,
        };
        const latestNewDepartureDate = service?.ServiceItem?.serviceAddTime[0]?.newDepartureDate;
        return {
            ok: true,
            service: {
                ...service,
                type: service.type,
                departureDate: latestNewDepartureDate || service?.ServiceItem?.departureDate!,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: `No se pudieron obtener las reservas del usuario con id ${IdService}`,
        };
    }
};
