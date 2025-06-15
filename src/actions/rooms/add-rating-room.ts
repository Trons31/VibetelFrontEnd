'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const addRatingRoom = async (
    roomId: string,
    ratingRoom: number,
    roomComments: string,
    serviceId: string,
    ratingService: number,
    serviceComments: string,
    ratingRoomId?: string,
    ratingServiceId?: string
) => {
    const session = await auth();

    let userId: string | undefined;
    if (session?.user.roles.includes("user")) {
        userId = session.user.id;
    }

    try {
        // Envolver las operaciones en una transacción
        await prisma.$transaction(async (tx) => {
            if (ratingRoomId) {
                // Actualizar la calificación de la habitación si existe
                await tx.roomRating.update({
                    where: { id: ratingRoomId },
                    data: {
                        roomId: roomId,
                        rating: ratingRoom,
                        comment: roomComments.length > 0 ? roomComments : null,
                    },
                });
            } else {
                // Crear una nueva calificación de habitación
                await tx.roomRating.create({
                    data: {
                        roomId: roomId,
                        serviceId: serviceId,
                        userId: userId,
                        rating: ratingRoom,
                        comment: roomComments.length > 0 ? roomComments : null,
                    },
                });
            }

            if (ratingServiceId) {
                // Actualizar la calificación del servicio si existe
                await tx.serviceRating.update({
                    where: { id: ratingServiceId },
                    data: {
                        serviceId: serviceId,
                        rating: ratingService,
                        comment: serviceComments.length > 0 ? serviceComments : null,
                    },
                });
            } else {
                // Crear una nueva calificación de servicio
                await tx.serviceRating.create({
                    data: {
                        serviceId: serviceId,
                        rating: ratingService,
                        comment: serviceComments.length > 0 ? serviceComments : null,
                    },
                });
            }
        });

        return {
            ok: true,
        };
    } catch (error) {
        console.error("Error adding/updating rating:", error);
        return {
            ok: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
