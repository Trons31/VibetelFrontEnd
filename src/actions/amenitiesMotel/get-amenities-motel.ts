'use server'; 
import prisma from "@/lib/prisma"





export const getAmenitiesMotel = async() => {

    try {

        const amenitiesMotel = await prisma.amenitiesMotelInfo.findMany()
        return amenitiesMotel;
        
    } catch (error) {
        return []
    }


}