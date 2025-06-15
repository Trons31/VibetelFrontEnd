'use server';
import prisma from "@/lib/prisma";

 



export const registerAmenitiesMotel = async(amenitie:string, motelPartner:string) => {

    try {
        
        const amentieMotel = await prisma.amenitiesMotel.create({
            data:{
                amenitiesMotelInfoId:amenitie,
                motelId: motelPartner
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