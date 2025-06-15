'use server';
import prisma from "@/lib/prisma";

export const getDataServicesGeneral = async (motelId: string) => {


    try {
        const reservations = await prisma.serviceItem.findMany({
            where: {
                room: {
                    motelId: motelId,
                },
                service: {
                    type: "noReservation",
                }
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
