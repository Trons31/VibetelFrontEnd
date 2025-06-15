'use server';

import { emitPusherEvent } from "@/lib";
import prisma from "@/lib/prisma";

interface ServiceProps {
    roomId: string;
    arrivalDate: Date;
    departureDate: Date;
}

export const serviceWalkIn = async (service: ServiceProps) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const room = await tx.room.findUnique({
                where: { id: service.roomId },
                select: {
                    id: true,
                    title: true,
                    roomNumber: true,
                    timeLimit: true,
                    price: true,
                    promoPrice: true,
                    promoActive: true,
                    extraServices: true,
                    extraServicesActive: true
                }
            });

            if (!room) throw new Error(`La habitación ${service.roomId} no existe - 500`);

            const subTotal = room.promoActive ? room.promoPrice || 0 : room.price || 0;
            const total = subTotal + (room.extraServicesActive ? room.extraServices || 0 : 0);

            await tx.service.create({
                data: {
                    subTotal,
                    total,
                    type: "noReservation",
                    ServiceItem: {
                        create: {
                            title: room.title,
                            price: room.price,
                            roomNumber: room.roomNumber,
                            timeLimit: room.timeLimit,
                            arrivalDate: service.arrivalDate,
                            serviceTaken: true,
                            dateTaken: service.arrivalDate,
                            departureDate: service.departureDate,
                            status: "iniciado",
                            roomId: room.id,
                        }
                    }
                }
            });

            await tx.room.update({
                where: { id: service.roomId },
                data: {
                    inAvailable: false,
                    status: "IN_SERVICE"
                }
            });

            await emitPusherEvent('rooms', 'no-available', room.id);

            return {
                ok: true,
                message: "Servicio generado correctamente"
            };
        }, { timeout: 20000 });
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: "No se pudo generar el servicio"
        };
    }
};
