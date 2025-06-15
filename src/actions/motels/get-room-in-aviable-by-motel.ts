'use server';

import prisma from "@/lib/prisma";



export const getRoomInAviableByMotel = async (motelId: string) => {

    try {

        const roomInAviable = await prisma.room.count({
            where: { 
                motelId: motelId,
                inAvailable: true, 
            }
        })

        return roomInAviable;

    } catch (error) {
        return 0;
    }

}