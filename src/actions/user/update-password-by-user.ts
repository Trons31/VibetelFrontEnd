'use server';
import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';


export const updatePasswordByUser = async (password: string, idUser: string) => {
    try {

        const updatePasswordByUser = await prisma.user.update({
            data: {
                password: bcryptjs.hashSync(password),
                resetPasswordToken: null,
                resetPasswordTokenExpiration: null
            },
            where: {
                id: idUser
            }
        })

        return {
            ok: true,
            user: updatePasswordByUser
        }

    } catch (error) {
        return {
            ok: false,
        }
    }

}