'use server';
import prisma from "@/lib/prisma";

 




export const registerAmenitiesByRoom = async(amenitiesRoomlInfoId:string,roomId:string,) => {

    try {
        
        const registerAmenitiesRoom = await prisma.amenitiesRoom.create({
            data:{
                amenitiesRoomlInfoId: amenitiesRoomlInfoId,
                roomId: roomId
            }            
        })

        
        return{
            ok:true
       }

    } catch (error) {
        console.log("No se pudo registrar la comodida")
        return{
            ok:false
        }
    }

}
 
