'use server'; 
import prisma from "@/lib/prisma";



export const GetGarageRoom = async() => {

    try {

        const garageRoom = await prisma.garage.findMany();

        return garageRoom;
        
    } catch (error) {
        console.log("No se pudieron cargar los garages")
        return []
    }

}