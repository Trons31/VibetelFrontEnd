'use server';

import prisma from "@/lib/prisma";



export const getBedroomBySlugByMotel = async (slug: string) => {

    try {
        const room = await prisma.room.findUnique({
            include: {
                ratings: {
                    select: {
                        rating: true,
                        createdAt: true,
                        comment: true,
                    }
                },
                roomImage: {
                    take: 3,
                    select: {
                        id: true,
                        url: true,
                    }
                },
                category: {
                    select: {
                        name: true,
                        description: true,
                    }
                },
                garage: {
                    select: {
                        name: true
                    }
                },
                motel: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        contactPhone: true,
                        address: true,
                        neighborhood: true,
                        city: {
                            select: {
                                name: true,
                            }
                        },
                        department: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },

            },

            where: {
                slug: slug,
            }
        });

        if (!room) return null;

        return {
            room: {
                ...room,
                category: room.category,
                garage: room.garage.name,
                images: room.roomImage.map(image => image.url),
            }
        }
    } catch (error) {
        console.log(error)
    }

}