'use server';
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay } from 'date-fns';

export const traficServiceToday = async (motelId: string) => {
    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);

    try {
        const reservations = await prisma.serviceItem.findMany({
            where: {
                room: {
                    motelId: motelId,
                },
                service: {
                    type: "noReservation",
                },
                arrivalDate: {
                    gte: start,
                    lte: end,
                },
            },
        });

        const totalServices = reservations.length;
        const startedServices = reservations.filter(r => r.status === 'iniciado').length;
        const completedServices = reservations.filter(r => r.status === 'completado').length;


        return {
            totalServices,
            startedServices,
            completedServices,
        };
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return {
            totalServices: 0,
            startedServices: 0,
            completedServices: 0,
        };
    }
};
