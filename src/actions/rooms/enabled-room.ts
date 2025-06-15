'use server';
import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';


export const enabledRoom = async (idRoom: string,) => {

    try {

        const ExistRoom = await prisma.room.findUnique({
            where: {
                id: idRoom
            },
            include: {
                motel: {
                    select: {
                        slug: true,
                    }
                }
            }
        })
        if (!ExistRoom) {
            return {
                ok: false,
                message: `La habitacion con id ${idRoom} no existe`
            }
        }

        await prisma.room.update({
            where: { id: ExistRoom.id },
            data: {
                status: "AVAILABLE"
            }
        })


        revalidatePath('/admin/dashboard-partner-motel/room')
        revalidatePath('/home')
        revalidatePath('/room')
        revalidatePath(`/room/${ExistRoom.slug}`)
        revalidatePath(`/motel/${ExistRoom.motel.slug}`)

        return {
            ok: true,
            message: "Success"
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Ups ocurrio un error"
        }
    }

}