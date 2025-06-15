'use server';
import prisma from "@/lib/prisma";




export const getAllBanks = async () => {

    try {

        const banks = await prisma.bank.findMany();

        return {
            ok: true,
            banks
        }

    } catch (error) {
        return {
            ok: false,
            banks: []
        }
    }

}