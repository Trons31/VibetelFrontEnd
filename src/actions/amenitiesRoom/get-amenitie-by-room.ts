'use server'; 
import prisma from "@/lib/prisma";



export const GetAmenitiesByRoom = async(roomId: string) => {

    try {

        const amenitiesRoom = await prisma.amenitiesRoom.findMany({
            where:{
                roomId:roomId
            },
            select:{
                
                AmenitiesRoomlInfo: true
            }
        });

        const amenitiesRoomComplete = amenitiesRoom.map(amenitie => ({
            id: amenitie.AmenitiesRoomlInfo!.id,
            name: amenitie.AmenitiesRoomlInfo!.name,
            description: amenitie.AmenitiesRoomlInfo!.description
        }
        ))

        return amenitiesRoomComplete;
        
    } catch (error) {
        return []
    }

}