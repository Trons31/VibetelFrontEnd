'use server';
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { ApprovalStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";




export const updateStatusMotel = async (motelId: string, state: ApprovalStatus) => {

    const session = await auth();

    if (!session?.user.roles.includes("SuperAdmin")) {
        return {
            ok: false,
            message: "Debe estar autenticado como super administrador",
            state: false
        }
    }

    try {

        await prisma.motel.update({
            where: { id: motelId },
            data: {
                isApproved: state, // Este es el estado actualizado (PENDING, APPROVED, DATA_CORRECTION)
            },
        });

        revalidatePath("/admin/dashboard-partner-motel");

        return {
            ok: true,
            state//retonar el estado
        }

    } catch (error) {
        return {
            ok: false,
            state: false,
        }
    }

}