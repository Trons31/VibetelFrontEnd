'use server';
import prisma from "@/lib/prisma";



export const getBankAccountByMotel = async (motelId: string) => {

    try {

        const bankAccount = await prisma.bankAccount.findUnique({
            where: {
                motelId: motelId
            }
        })

        if (!bankAccount) return {
            ok: false,
        }

        return {
            ok: true,
            bankAccount
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
        }
    }

}