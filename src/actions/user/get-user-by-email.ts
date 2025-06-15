'use server';
import prisma from "@/lib/prisma";
import { sleep } from "@/utils";





export const GetUserByEmail = async (emailP: string) => {

    sleep(5);

    try {

        const user = await prisma.user.findUnique({
            where: {
                email: emailP
            }
        })

        if (!user) {
            return {
                ok: false
            }
        }

        return {
            ok: true,
            user: user
        }


    } catch (error) {
        console.log(error);
        return {
            ok: false
        }
    }

}