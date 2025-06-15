'use server';

import prisma from "@/lib/prisma";



export const getRoomWithBestPromotion = async () => {

    try {

        const roomWithBestPromotion = await prisma.room.findFirst({
            where: {
                promoActive: true, // Solo habitaciones con promoción activa
            },
            orderBy: {
                promoPrice: 'asc', // Ordenar por precio promocional más bajo primero
            },
            select:{
                promoPrice:true
            }
        });

        return {
            BestPromotion: roomWithBestPromotion?.promoPrice,
        };

    } catch (error) {
        console.error("Error fetching room with the best promotion:", error);
        throw new Error("Failed to fetch room with best promotion");
    }

}