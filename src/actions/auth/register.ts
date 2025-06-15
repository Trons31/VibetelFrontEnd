'use server';
import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';


export const registerUser = async (name: string, lastName: string, email: string, password: string) => {


    try {

        const emailexist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (emailexist) {
            return {
                ok: false,
                message: 'Este correo ya está registrado. Inicia sesión.'
            }
        }

        const user = await prisma.user.create({
            data: {
                name: name,
                lastname: lastName,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password)
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return {
            ok: true,
            user: user,
            message: 'Usuario creado correctamente'
        }

    } catch (error) {

        return {
            ok: false,
            message: 'No se pudo crear el usuario'
        }

    }


}