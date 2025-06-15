'use server';
import prisma from "@/lib/prisma";

export const updatePriceRoomByMotel = async (roomIds: string[], newPrice: number) => {

    try {

        await prisma.room.updateMany({
            where: { id: { in: roomIds } },
            data: {
                price: newPrice
            }
        })


        return {
            ok: true,
        }

    } catch (error) {
        return {
            ok: false,
        }
    }

}