'use server';

import prisma from "@/lib/prisma";


export const createOrDeleteOtherAmenities = async(motelId:string,amenitiesMotel: string[]) => {

    try {
        // Obtener los amenities actuales del motel específico
        const motel = await prisma.motel.findUnique({
            where: {
                id: motelId
            },
            select: {
                amenities: true
            }
        });

        if (!motel) {
            throw new Error(`Motel con id ${motelId} no encontrado`);
        }

        const existingAmenities = motel.amenities;

        // Determinar los amenities que se deben agregar
        const amenitiesToAdd = amenitiesMotel.filter(amenity => !existingAmenities.includes(amenity));

        // Determinar los amenities que se deben eliminar
        const amenitiesToDelete = existingAmenities.filter(amenity => !amenitiesMotel.includes(amenity));

        // Actualizar la base de datos: eliminar amenities
        if (amenitiesToDelete.length > 0) {
            await prisma.motel.update({
                where: {
                    id: motelId
                },
                data: {
                    amenities: {
                        set: existingAmenities.filter(existing => !amenitiesToDelete.includes(existing))
                    }
                }
            });
        }

        // Actualizar la base de datos: agregar amenities
        if (amenitiesToAdd.length > 0) {
            await prisma.motel.update({
                where: {
                    id: motelId
                },
                data: {
                    amenities: {
                        push: amenitiesToAdd
                    }
                }
            });
        }

        return{
            ok:true
        }
    } catch (error) {
        return{
            ok:false
        }
    } 

}