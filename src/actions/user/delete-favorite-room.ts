'use server';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

 



export const deleteFavoriteRoom = async( idFavoriteRoom:string ) => {


    try {
        
        const deleteRoomOnFavorite = await prisma.favoriteRoomByUser.delete({
            where:{
                id:idFavoriteRoom
            },
            include:{
                room:{
                    select:{
                        title:true,
                    }
                }
            }
        })
        
        revalidatePath('/favoriteRoom')

        return {
            ok:true,
            message: `Habitacion ${deleteRoomOnFavorite.room.title} eliminada de favoritos`
        }

    } catch (error) {
        return {
            ok:false,
            message: `No se pudo eliminar la habitacion de favoritos`
        }
    }


}