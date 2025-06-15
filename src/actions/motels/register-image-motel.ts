'use server';
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? '');
 




export const registerImageMotel = async(formData: FormData, motelId:string, ImageId?:number, imageUrl?:string) => {


    try {

         // Borrar la imagen existente si ImageId existe
         if (ImageId && imageUrl) {
            // Extraer el ID de Cloudinary de la URL
            const publicId = imageUrl.split('/').pop()?.split('.')[0];
            if (publicId) {
                // Borrar la imagen de Cloudinary
                await cloudinary.uploader.destroy(publicId);
                
                // Borrar la imagen de la base de datos
                await prisma.motelImage.delete({
                    where: {
                        id: ImageId,
                    },
                });
            }
        }

        
        if (formData.getAll('images')) {
            const images = await upLoadImages(formData.getAll('images') as File[])
            if(!images){
                throw new Error('No se pudo cargar las imagenes')
            }

            await prisma.motelImage.createMany({
                data:images.map(image => ({
                    url: image!,
                    motelId: motelId
                }))
            })
        }


        //Revalidar los paths
        revalidatePath('/admin/dashboard-partner-motel/config-motel/motel-cover')
        revalidatePath('/admin/dashboard-partner-motel')

        return {
            ok:true,
        }

    } catch (error) {
        console.log(error)
        return {
            ok:false
        }
    }

}


const upLoadImages = async(images: File[]) => {

    try {
        const uploadPromises = images.map(async (image) => {
            try {
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');


                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
                    .then(r => r.secure_url);
            } catch (error) {
                console.log(error)
                return null;
            }
        })


        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages;

    } catch (error) {
        console.log(error)
        return null;
    }

}