'use server';

import prisma from '../../lib/prisma';

export const getMotelBySlug = async (slug: string) => {


    try {

        const motel = await prisma.motel.findFirst({
            include: {
                motelImage: {
                    take: 2,
                    select: {
                        url: true,
                    }
                },
                country: {
                    select: {
                        name: true,
                    }
                },
                city: {
                    select: {
                        name: true,
                    }
                },
                department: {
                    select: {
                        name: true,
                    }
                },
                AmenitiesMotel: {
                    select: {
                        amenitiesMotelInfo: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                MotelConfig: true,

            },
            where: {
                slug: slug,
                isApproved: "APPROVED"
            }
        })

        if (!motel) return null;
        return {
            motel: {
                ...motel,
                images: motel.motelImage.map(image => image.url),
                country: motel.country.name,
                city: motel.city.name,
                department: motel.department.name,
                amentiesMotelMap: motel.AmenitiesMotel.map(amenitie => amenitie.amenitiesMotelInfo.name),
            }
        }

    } catch (error) {
        throw new Error("No se pudo cargar el motel");
    }


}