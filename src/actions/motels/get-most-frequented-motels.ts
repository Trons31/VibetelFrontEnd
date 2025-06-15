'use server';
import prisma from "@/lib/prisma";



export const getMostFrecuentedMotels = async (city?: string) => {
    try {
        const motels = await prisma.motel.findMany({
            where: city ?
                {
                    city: {
                        name: city,
                    }
                } : undefined,
            select: {
                id: true,
                title: true,
                slug: true,
                _count: {
                    select: {
                        room: {
                            where: {
                                ServiceItem: {
                                    some: {
                                        service: {
                                            type: 'reservation',
                                            paymentStatus: 'ACCEPTED',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                room: {
                    _count: 'desc',
                },
            },
            take: 10, // Ajusta según el número de moteles que desees mostrar
        });
        return {
            ok: true,
            motels,
        };
    } catch (error) {
        console.error("Error fetching most frequented motels:", error);
        return {
            ok: false,

        };
    }
};
