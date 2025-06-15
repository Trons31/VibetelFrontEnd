'use server'; 
import prisma from "@/lib/prisma"




export const updateLocationMotel = async(country:string,department:string,city:string,address:string,neighborhood:string, idMotel:string) => {

    try {

        const updateLocationMotel = await prisma.motel.update({
            data:{
               countryId: country,
               departmentId: department,
               cityId: city,
               address: address,
               neighborhood: neighborhood
              
            },
            select:{
                id: true,
                
            },
            where:{
                id: idMotel
            }
        })

        return {
            ok:true,
            updateLocationMotel
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo actualizar los datos basicos'
        }
    }

}