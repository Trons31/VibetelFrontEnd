'use server';
import prisma from "@/lib/prisma";



export const updateMotelPartner = async (id: string, name: string, lastName: string, email: string, contactPhone: string) => {


    try {

        const motelPartnerExist = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!motelPartnerExist) {
            return {
                ok: false,
                message: "El usuario no existe"
            }
        }

        await prisma.user.update({
            data: {
                name: name,
                lastname: lastName,
                email: email,
                contactPhone: contactPhone
            },
            where: {
                id: motelPartnerExist.id
            }
        })

        return {
            ok: true,
        }

    } catch (error) {
        return {
            ok: false,
            message: "No se pudo actualizar el usuario"
        }
    }



}