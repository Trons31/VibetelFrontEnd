'use server';
import prisma from "@/lib/prisma"




export const updateDataBasicMotel = async (title: string, description: string, contactPhone: string, whatsapp: string, idMotel: string) => {

    try {

        const updateDataBasicMotel = await prisma.motel.update({
            data: {
                title: title.toLowerCase(),
                description: description,
                contactPhone: contactPhone,
                whatsapp: whatsapp

            },
            select: {
                id: true,

            },
            where: {
                id: idMotel
            }
        })

        return {
            ok: true,
            updateDataBasicMotel
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo actualizar los datos basicos'
        }
    }

}