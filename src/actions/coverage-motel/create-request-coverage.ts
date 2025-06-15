'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";


export const createRequestCoverage = async (cityId: string) => {

    try {

        const session = await auth();
        let userId: string | undefined;
        if (session?.user.roles.includes("user")) {
            userId = session.user.id;
        } else {
            return {
                ok: false
            }
        }

        await prisma.requestServiceInCity.create({
            data: {
                cityId: cityId,
                userId: userId
            }
        })

        return {
            ok: true,
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
        }
    }

}