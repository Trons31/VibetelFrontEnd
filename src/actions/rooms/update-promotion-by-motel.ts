'use server';

import prisma from "@/lib/prisma";

export const updatePromotionByMotel = async (roomIds: string[], newPromotion: number) => {
    try {
        // Obtener habitaciones con su precio actual
        const rooms = await prisma.room.findMany({
            where: { id: { in: roomIds } },
            select: { id: true, price: true }
        });

        // Calcular los nuevos precios promocionales
        const updatePromises = rooms.map((room) => {
            const promoPrice = room.price - (room.price * (newPromotion / 100));
            return prisma.room.update({
                where: { id: room.id },
                data: {
                    promoActive: true,
                    promoPrice: promoPrice,
                }
            });
        });

        // Ejecutar las actualizaciones
        await Promise.all(updatePromises);

        return {
            ok: true,
        };

    } catch (error) {
        console.error("Error actualizando promociones:", error);
        return {
            ok: false,
        };
    }
};
