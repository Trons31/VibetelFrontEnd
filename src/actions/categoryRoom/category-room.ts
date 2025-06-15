'use server'; 
import prisma from "@/lib/prisma";



export const GetCategoryRoom = async() => {

    try {

        const categoryRoom = await prisma.categoryRooms.findMany({ });

        return categoryRoom;
        
    } catch (error) {
        return []
    }

}