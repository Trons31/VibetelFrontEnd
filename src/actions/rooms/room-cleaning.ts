'use server';

import prisma from "@/lib/prisma";

export const roomCleaning = async (roomIds: string[]) => {
    try {

        // Obtener las habitaciones que ya están en limpieza
        const existingCleanings = await prisma.roomCleaning.findMany({
            where: { roomId: { in: roomIds } },
            select: { roomId: true }
        });

        const roomsAlreadyCleaning = new Set(existingCleanings.map(rc => rc.roomId));

        // Filtrar las habitaciones que no están en limpieza
        const roomsToClean = roomIds.filter(id => !roomsAlreadyCleaning.has(id));

        if (roomsToClean.length === 0) {
            return {
                message: "Todas las habitaciones ya están en limpieza",
                ok: false
            };
        }

        // Actualizar estado de las habitaciones
        await prisma.room.updateMany({
            where: { id: { in: roomsToClean } },
            data: {
                status: "CLEANING",
                inAvailable: false,
            }
        });

        // Agregar registros en RoomCleaning
        await prisma.roomCleaning.createMany({
            data: roomsToClean.map(roomId => ({
                roomId
            })),
            skipDuplicates: true
        });

        return {
            message: "Habitaciones actualizadas a estado de limpieza",
            ok: true,
        };

    } catch (error) {
        console.error("Error en roomCleaning:", error);
        return {
            message: "Ocurrió un error al actualizar las habitaciones a limpieza.",
            ok: false,
        };
    }
};
