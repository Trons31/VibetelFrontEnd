'use server';
import prisma from "@/lib/prisma";

export const getAddTimeReservationById = async (idReservation: string) => {
    try {
        // Primero obtenemos el tipo del servicio relacionado
        const serviceItem = await prisma.serviceItem.findUnique({
            where: {
                id: idReservation,
            },
            include: {
                service: true, // Incluimos el servicio para acceder al tipo
            },
        });

        if (!serviceItem) {
            return {
                ok: false,
                aditionalTime: [],
                message: "Servicio no encontrado",
            };
        }

        // Validamos el tipo de servicio para definir la condición
        const isReservation = serviceItem.service?.type === "reservation";

        // Construimos la consulta según el tipo
        const aditionalTime = await prisma.serviceAddTime.findMany({
            where: isReservation
                ? {
                    serviceItemId: idReservation,
                    paymentStatus: "ACCEPTED",
                }
                : {
                    serviceItemId: idReservation,
                },
            orderBy: {
                createdAt: "desc",
            },
        });

        return {
            ok: true,
            aditionalTime,
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            aditionalTime: [],
            message: "Error al obtener la/s adicione/s de tiempo",
        };
    }
};
