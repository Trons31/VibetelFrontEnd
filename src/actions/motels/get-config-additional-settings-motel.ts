'use server';
import prisma from "@/lib/prisma";

 





export const getConfigAdditionalSettingsMotel = async(idMotel:string) => {
    

    try {
        
        const additionalSettingsMotel = await prisma.motelConfig.findUnique({
            where:{
                motelId: idMotel
            }
        })

        if(!additionalSettingsMotel) return;

        return {
            ok:true,
            additionalSettingsMotel,
        }

    } catch (error) {
        return {
            ok:false,
        }
    }


}