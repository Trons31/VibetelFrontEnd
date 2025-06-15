'use server';
import prisma from "@/lib/prisma";



export const validateTokenResertPassword = async (token: string) => {

    try {

        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordTokenExpiration: {
                    gt: new Date(),
                },
            },
        })

        if (!user) return {
            ok: false,
            user: {}
        }

        const { id, email,role } = user;

        return {
            ok: true,
            user: {
                id,
                email,
                role
            }
        }

    } catch (error) {
        return {
            ok: false,
            user: {}
        }
    }


}