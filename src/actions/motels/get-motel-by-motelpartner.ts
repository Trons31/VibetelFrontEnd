'use server';

import prisma from "@/lib/prisma";




export const getMotelByMotelPartner = async (id: string) => {

    try {

        const motelExist = await prisma.motel.findFirst({
            include: {
                motelImage: {
                    select: {
                        id: true,
                        url: true
                    }
                },
                country: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                city: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                department: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                AmenitiesMotel: {
                    select: {
                        amenitiesMotelInfo: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                MotelConfig: true,
                bankAccount: {
                }
            },
            where: {
                motelPartnerId: id
            }
        })

        if (!motelExist) return {
            ok: false,
        };

        const { MotelConfig, bankAccount, ...rest } = motelExist;
        return {
            ok: true,
            motelExist: {
                ...rest,
                images: rest.motelImage.map(image => image.url),
                amentiesMotelMap: rest.AmenitiesMotel.map(amenitie => amenitie.amenitiesMotelInfo.name),
                amentiesMotelMapId: rest.AmenitiesMotel.map(amenitie => amenitie.amenitiesMotelInfo.id),
                priceAddTime: MotelConfig?.defaultReservationAddTime,
                motelConfig: MotelConfig ? true : false,
                config: MotelConfig || undefined,
                bankAccount: bankAccount ? true : false,
            }
        };

    } catch (error) {
        return {
            ok: false,
            message: 'Revisar los logs no se pudo actualizar/crear'
        }

    }



}