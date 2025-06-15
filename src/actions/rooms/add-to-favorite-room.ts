'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const addOrDeleteFavoriteRoom = async (roomId: string, userId: string) => {
    try {
        // Verifica si la habitación ya está en los favoritos del usuario
        const existingFavorite = await prisma.favoriteRoomByUser.findFirst({
            where: {
                roomId: roomId,
                userId: "e490f9dc-ff69-4e89-b1e3-4586ae49c39b",
            },
            include: {
                room: {
                    select: {
                        title: true
                    }
                }
            }
        });

        if (existingFavorite) {
            // Si ya está en los favoritos, elimínala
            await prisma.favoriteRoomByUser.delete({
                where: {
                    id: existingFavorite.id,
                },
            });
            revalidatePath('/favoriteRoom')
            return { message: `${existingFavorite.room.title} eliminada de favoritos` };
        } else {
            // Si no está en los favoritos, agrégala
            const roomAddToFavorites = await prisma.favoriteRoomByUser.create({
                data: {
                    roomId: roomId,
                    userId: "e490f9dc-ff69-4e89-b1e3-4586ae49c39b",
                },
                include: {
                    room: {
                        select: {
                            title: true
                        }
                    }
                }
            });
            revalidatePath('/favoriteRoom')
            return { message: `${roomAddToFavorites.room.title} agregada a favoritos` };
        }



    } catch (error) {
        console.error('Error en addOrDeleteFavoriteRoom:', error);
        throw new Error('Algo salió mal al actualizar los favoritos');
    }
};


export const inFavorites = async (roomId: string, userId: string) => {
    try {

        const inFavoritesValidate = await prisma.favoriteRoomByUser.findFirst({
            where: {
                roomId: roomId,
                userId: "e490f9dc-ff69-4e89-b1e3-4586ae49c39b",
            }
        })

        if (!inFavoritesValidate) {
            return {
                ok: false,
            }
        }

        return {
            ok: true
        }

    } catch (error) {
        return {
            ok: false
        }
    }
}