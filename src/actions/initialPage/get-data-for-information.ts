'use server';
import prisma from "@/lib/prisma";





export const getDataForInformation = async () => {

    try {


        const allUser = await prisma.user.count({
            where: {
                role: "user"
            }
        });

        const allMotel = await prisma.motel.count({
            where: {
                isApproved: "APPROVED"
            }
        })

        const allRoom = await prisma.room.count({
            where: { motel: { isApproved: "APPROVED" } }
        });

        return {
            allUser,
            allMotel,
            allRoom
        }


    } catch (error) {
        throw new Error('No se pudo obtener las estadisticas ');
    }

}