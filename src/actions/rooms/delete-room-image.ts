'use server'; 
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');


export const deleteRoomImage = async(ImageId:number, imageUrl:string) => {

    if(!imageUrl.startsWith('http')){
        return{
            ok:false,
            error: "No se puede borrar imagenes de FS"
        }
    }

    const imageName = imageUrl
        .split("/")   
        .pop()
        ?.split(".")[0] ?? "";


    try {

        await cloudinary.uploader.destroy(imageName);
        const deletedImage = await prisma.roomImage.delete({
            where:{
                id:ImageId,
            },
            select:{
                room:{
                    select:{
                        slug:true,
                    }
                }
            }
        });



        //Revalidar los paths
        revalidatePath('/admin/dashboard-partner-motel/room')
        revalidatePath(`/admin/dashboard-partner-motel/room/${deletedImage.room.slug}`)
        revalidatePath(`/room/${deletedImage.room.slug}`)
        revalidatePath(`/room`)
        revalidatePath(`/home`)


        return{
            ok:true
        }
        
    } catch (error) {
        return {
            ok:false,
            message: "No se pudo eliminar la imagen"
        }
    }

}