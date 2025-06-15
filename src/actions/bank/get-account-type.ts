'use server';
import prisma from "@/lib/prisma";




export const getAccountType = async () => {

    try {

        const accountType = await prisma.accountType.findMany();

        return {
            ok: true,
            accountType
        }

    } catch (error) {
        return {
            ok: false,
            accountType: []
        }
    }

}