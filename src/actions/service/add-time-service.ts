'use server';
import prisma from "@/lib/prisma";


export const addTimeService = async (addTimeReservation: number, newDepartureDate: Date, reservationItemId: string, roomId: string) => {

    try {
        const transaction = await prisma.$transaction(async (prisma) => {
            // Obtiene el precio adicional por 10 minutos de la habitación
            const room = await prisma.room.findFirst({
                where: {
                    id: roomId,
                },
                select: {
                    priceAddTime: true,
                },
            });

            if (!room) {
                throw new Error("Room not found");
            }

            // Calcula el total basado en el tiempo adicional seleccionado
            const increments = addTimeReservation / 10;
            const totalAdditionalCost = increments * room.priceAddTime;

            // Registra el tiempo adicional y actualiza la fecha de salida
            const reservationAddTime = await prisma.serviceAddTime.create({
                data: {
                    addTimeReservation: addTimeReservation,
                    newDepartureDate: newDepartureDate,
                    total: totalAdditionalCost,
                    serviceItemId: reservationItemId,
                },
                include: {
                    serviceItem: {
                        select: {
                            service: {
                                select: {
                                    id: true,
                                }
                            }
                        }
                    }
                }
            });

            return {
                ok: true,
            };
        });

        return transaction;
    } catch (error) {
        console.log(error);
        return {
            ok: false,
        }
    }

};
