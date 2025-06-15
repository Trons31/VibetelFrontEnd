'use server';
import prisma from "@/lib/prisma"


import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
import { Motel } from "@prisma/client";

cloudinary.config(process.env.CLOUDINARY_URL ?? '');


const motelSchema = z.object({
    name: z.string().min(3).max(255),
    identificationCard: z.string().min(3).max(255),
    root: z.string().min(3).max(255),

    motelPartnerId: z.string().uuid(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    nit: z.string(),
    contactEmail: z.string().min(3).max(255),
    contactPhone: z.string().min(3).max(255),
    whatsapp: z.string().min(3).max(255),
    amenities: z.coerce.string()
        .transform(val => val.split(','))
        .optional(),
    countryId: z.string(),
    departmentId: z.string(),
    cityId: z.string(),
    neighborhood: z.string().min(3).max(255),
    address: z.string().min(3).max(255),

})




export const registerMotel = async (formData: FormData) => {

    const data = Object.fromEntries(formData);
    const motelParsed = motelSchema.safeParse(data);

    if (!motelParsed.success) {
        console.log(motelParsed.error)
        return {
            ok: false,
        }
    }

    const motel = motelParsed.data;
    const { name, root, identificationCard, ...rest } = motel;

    try {
        const motelExist = await prisma.motel.findUnique({
            where: {
                nit: rest.nit
            }
        })

        if (motelExist) {
            return {
                ok: false,
                message: "Error: El NIT ingresado ya se encuentra registrado en nuestro sistema. Por favor, verifique los datos e intente nuevamente o póngase en contacto con el soporte para más información.",
            }
        }
    } catch (error) {
        return {
            ok: false,
            message: 'Revisar los logs no se pudo actualizar/crear'
        }
    }

    try {
        const primsaTx = await prisma.$transaction(async (tx) => {



            const legalRepresentative = await prisma.legalRepresentativeMotel.create({
                data: {
                    name: name,
                    root: root,
                    identificationCard: identificationCard
                }
            })

            let motel: Motel;


            motel = await prisma.motel.create({
                data: {
                    ...rest,
                    legalRepresentativeMotelId: legalRepresentative.id
                }
            })


            if (formData.getAll('amenitiesMotel')) {
                const amenitiesMotel = formData.getAll('amenitiesMotel') as string[];

                await prisma.amenitiesMotel.createMany({
                    data: amenitiesMotel.map(amenitie => ({
                        amenitiesMotelInfoId: amenitie,
                        motelId: motel.id
                    }))
                })
            }


            return {
                motel: motel
            }
        });


        return {
            ok: true,
            room: primsaTx.motel,
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Revisar los logs no se pudo actualizar/crear'
        }
    }
   
}

