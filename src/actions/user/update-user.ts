'use server';
import prisma from "@/lib/prisma";





export const updateUser = async (idUser: string, name: string, lastName: string, email: string,) => {

    try {

        const emailexist = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (emailexist && emailexist.id !== idUser) {
            return {
                ok: false,
                message: `El correo ${email} ya está registrado.`
            };
        }

        await prisma.user.update({
            where: { id: idUser },
            data: {
                name: name,
                lastname: lastName,
                email: email
            }
        })

        return {
            ok: true,
        }


    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo actualizar el usuario.'
        }
    }

}