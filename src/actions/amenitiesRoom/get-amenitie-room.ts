'use server'; 
import prisma from "@/lib/prisma";



export const GetAmenitiesRoom = async() => {

    try {

        const amenitiesRoom = await prisma.amenitiesRoomlInfo.findMany();

        return amenitiesRoom;
        
    } catch (error) {
        console.log(error,"No se pudieron cargar las comodidades de las habitaciones")
        return []
    }

}