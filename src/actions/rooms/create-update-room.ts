'use server';
import prisma from "@/lib/prisma";
import { Room } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');


const roomSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(2))),
    priceAddTime: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(2))),
    promoActive: z.preprocess((val) => val === 'true', z.boolean()),
    promoPrice: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(2)))
        .optional(),
    tags: z.string(),
    inAvailable: z.preprocess((val) => val === 'true', z.boolean()),
    timeLimit: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(0))),
    roomNumber: z.string().min(1).max(255),
    extraServicesActive: z.preprocess((val) => val === 'true', z.boolean()),
    extraServices: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(2)))
        .optional(),
    surcharge: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(2))),
    amenities: z.coerce.string().transform(val => val.split(','))
        .optional(),
    categoryId: z.string().uuid(),
    garageId: z.string().uuid(),
    motelId: z.string().uuid(),


})

export const CreateUpdateRoom = async (formData: FormData) => {

    const data = Object.fromEntries(formData);
    const roomParsed = roomSchema.safeParse(data);

    if (!roomParsed.success) {
        console.log(roomParsed.error)
        return {
            ok: false,
            message: "Verifique los campos existe un error"
        }
    }

    const room = roomParsed.data;
    room.slug = room.slug.trim().toLowerCase().replace(/\s+/g, '-');

    const { id, ...rest } = room;

    try {


        const primsaTx = await prisma.$transaction(async (tx) => {

            let room: Room;
            const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());

            if (id) {
                //Actualizar
                room = await prisma.room.update({
                    where: { id: id },
                    data: {
                        ...rest,
                        promoPrice: rest.promoActive ? rest.promoPrice : null,
                        extraServices: rest.extraServicesActive ? rest.extraServices : null,
                        amenities: rest.amenities ? rest.amenities : [],
                        tags: {
                            set: tagsArray
                        },
                    }
                })


            } else {

                room = await prisma.room.create({
                    data: {
                        ...rest,
                        promoPrice: rest.promoActive ? rest.promoPrice : null,
                        extraServices: rest.extraServicesActive ? rest.extraServices : null,
                        tags: {
                            set: tagsArray
                        },
                    }
                })
            }

            if (formData.getAll('amenitiesRoom')) {
                const amenitiesRoom = formData.getAll('amenitiesRoom') as string[];
                const selectedAmenities: string[] = [];

                // Filtrar valores nulos y agregar a selectedAmenities
                amenitiesRoom.forEach(amenity => {
                    if (amenity !== null) {
                        selectedAmenities.push(amenity);
                    }
                });

                const existingAmenities = await prisma.amenitiesRoom.findMany({
                    where: { roomId: room.id },
                    select: { amenitiesRoomlInfoId: true }
                });
                const existingAmenitiesSet = new Set(existingAmenities.map(amenity => amenity.amenitiesRoomlInfoId));

                const amenitiesToRemove: string[] = [];
                existingAmenities.forEach(amenity => {
                    if (!selectedAmenities.includes(amenity.amenitiesRoomlInfoId!)) {
                        amenitiesToRemove.push(amenity.amenitiesRoomlInfoId!);
                    }
                });

                await prisma.amenitiesRoom.deleteMany({
                    where: {
                        roomId: room.id,
                        amenitiesRoomlInfoId: { in: amenitiesToRemove }
                    }
                });

                const amenitiesToAdd: string[] = [];
                selectedAmenities.forEach(amenity => {
                    if (!existingAmenitiesSet.has(amenity)) {
                        amenitiesToAdd.push(amenity);
                    }
                });

                await prisma.amenitiesRoom.createMany({
                    data: amenitiesToAdd.map(amenity => ({
                        amenitiesRoomlInfoId: amenity,
                        roomId: room.id,
                    }))
                });
            }




            if (formData.getAll('images')) {
                const images = await upLoadImages(formData.getAll('images') as File[])
                if (!images) {
                    throw new Error('No se pudo cargar las imagenes')
                }

                await prisma.roomImage.createMany({
                    data: images.map(image => ({
                        url: image!,
                        roomId: room.id
                    }))
                })
            }

            return {
                room: room
            }
        }, { timeout: 30000 });

        revalidatePath('/admin/dashboard-partner-motel/room')
        revalidatePath(`/admin/dashboard-partner-motel/room/${room.slug}`)
        revalidatePath(`/home`)
        revalidatePath(`/room`)
        revalidatePath(`/room/${room.slug}`)
        const slugMotel = await prisma.motel.findUnique({ where: { id: room.motelId }, select: { slug: true } })
        revalidatePath(`/motel/${slugMotel}`)


        return {
            ok: true,
            room: primsaTx.room,

        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Revisar los logs no se pudo actualizar/crear'
        }
    }

}




const upLoadImages = async (images: File[]) => {

    try {
        const uploadPromises = images.map(async (image) => {
            try {
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');


                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
                    .then(r => r.secure_url);
            } catch (error) {
                return null;
            }
        })


        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages;

    } catch (error) {
        return null;
    }

}