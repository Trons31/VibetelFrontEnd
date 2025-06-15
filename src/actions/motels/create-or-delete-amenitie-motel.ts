'use server';
import prisma from "@/lib/prisma";

 




export const createOrDeleteAmenitiesMotel = async(IdAmentie:string, idMotel:string) => {


    try {
        
        const AmenitieExist = await prisma.amenitiesMotel.findFirst({
            where:{
                amenitiesMotelInfoId: IdAmentie
            }
        })

        if(AmenitieExist){
            await prisma.amenitiesMotel.delete({
                where:{
                    id:AmenitieExist.id
                }
            })
            
            return{
                ok:true
            }
        }

        await prisma.amenitiesMotel.create({
            data:{
                amenitiesMotelInfoId: IdAmentie,
                motelId: idMotel
            }
        })

        return {
            ok:true
        }

    } catch (error) {
        return {
            ok:false
        }
    }

}