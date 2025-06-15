'use server';
import prisma from "@/lib/prisma";




export const getAllRoomByMotel = async (motelId: string) => {

    try {

        const totalRoom = await prisma.room.count({
            where: { motelId: motelId }
        })

        return {
            totalRoom
        };

    } catch (error) {
        return {
            totalRoom: 0
        }
    }

}