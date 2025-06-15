'use server';
import prisma from "@/lib/prisma";



export const createUpdateBankMotel = async (id: string, accountHolderId: string, accountHolderName: string, accountNumber: string, accountTypeId: string, bankId: string, motelId: string) => {

    try {

        const bankAccount = await prisma.bankAccount.findFirst({
            where: {
                id: id
            }
        })

        if (bankAccount) {
            await prisma.bankAccount.update({
                where: {
                    id: id
                },
                data: {
                    accountHolderId: accountHolderId,
                    accountHolderName: accountHolderName,
                    accountNumber: accountNumber,
                    accountTypeId: accountTypeId,
                    bankId: bankId,
                    motelId: motelId
                }
            })
        } else {
            await prisma.bankAccount.create({
                data: {
                    accountHolderId: accountHolderId,
                    accountHolderName: accountHolderName,
                    accountNumber: accountNumber,
                    accountTypeId: accountTypeId,
                    bankId: bankId,
                    motelId: motelId
                }
            })
        }

        return {
            ok: true,
        }

    } catch (error) {
        return {
            ok: false,
        }
    }

}