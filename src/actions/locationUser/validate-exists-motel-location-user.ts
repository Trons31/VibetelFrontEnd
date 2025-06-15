'use server';
import prisma from "@/lib/prisma";




export const validateExistsMotelLocationUser = async (city: string) => {

    try {

        const validateMotelInLocation = await prisma.motel.count({
            where: {
                city: {
                    name: { equals: city }
                },
                isApproved: "APPROVED",
            }
        })

        return {
            validateExist: validateMotelInLocation > 0 ? true : false,
        }

    } catch (error) {
        return {
            validateExist: false
        }
    }

}