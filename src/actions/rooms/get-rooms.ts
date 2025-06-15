'use server';
import { auth } from "@/auth.config";
import { AmenitiesRoom } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";



interface GetRoomsParams {
    page: number;
    category: string,
    garage: string,
    amenities: AmenitiesRoom[],
    inAvailable: string,
    onSale: string,
    orderPrice: string,
    orderMostReserved?: string,
    city: string,
    motelId?: string,
}


export const getRooms = async ({ page = 1, category, garage, amenities, orderPrice, inAvailable, onSale, orderMostReserved, city, motelId }: GetRoomsParams) => {

    const session = await auth();

    const itemsPerPage = 9;
    const skip = (page - 1) * itemsPerPage;

    try {

        if (city === '') {
            return {
                ok: false,
                rooms: [],
                totalCount: 0,
                message: `No se pudieron obtener las habitaciones`,
            };
        }

        let whereConditions: any = {
            motelId: motelId,
            motel: {
                city: {
                    name: {
                        equals: city,
                    }
                }
            }
        };

        if (category || garage || amenities || inAvailable || onSale) {
            whereConditions.AND = [];

            if (category) {
                whereConditions.AND.push({ category: { id: { equals: category } } });
            }

            if (garage) {
                whereConditions.AND.push({ garage: { id: { equals: garage } } });
            }

            if (inAvailable) {
                whereConditions.AND.push({ inAvailable: { equals: inAvailable === "true" ? true : false } });
            }

            if (onSale) {
                whereConditions.AND.push({ promoActive: { equals: onSale === "true" ? true : false } });
            }

            if (amenities.length > 0) {
                whereConditions.AND.push({
                    amenitiesRoom: {
                        some: {
                            AmenitiesRoomlInfo: {
                                name: { in: amenities.map(amenity => amenity.name) }
                            }
                        }
                    }
                });
            }

        }

        let orderByCondition: Prisma.RoomOrderByWithRelationInput | undefined = undefined;

        if (orderPrice) {
            orderByCondition = { price: orderPrice === "asc" ? "asc" : "desc" };
        }

        // Si se solicita ordenar por las habitaciones más reservadas
        if (orderMostReserved) {
            orderByCondition = {
                ServiceItem: {
                    _count: "desc"
                }
            };
        }

        const rooms = await prisma.room.findMany({
            where: whereConditions,
            orderBy: orderByCondition,
            include: {
                ratings: {
                    select: {
                        rating: true,
                        comment: true,
                        createdAt: true,
                    }
                },
                roomImage: {
                    take: 2,
                    select: {
                        id: true,
                        url: true,
                    },

                },
                category: {
                    select: {
                        id: false,
                        name: true,
                        description: true,
                    }
                },
                garage: {
                    select: {
                        id: false,
                        name: true
                    }
                },
                motel: {
                    select: {
                        id: true,
                        title: true,
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
                                name: true
                            }
                        },
                        country: {
                            select: {
                                name: true
                            }
                        },
                    }
                },
                amenitiesRoom: {
                    include: {
                        AmenitiesRoomlInfo: {
                            select: {
                                name: true,
                                description: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        ServiceItem: true
                    }
                },
                LikeRoomByUser: session?.user
                    ? {
                        where: {
                            userId: session.user.id,
                        },
                        select: {
                            id: true,
                        },
                    }
                    : false,
            },

            take: itemsPerPage,
            skip: skip,
        });


        const totalCount = await prisma.room.count({
            where: whereConditions
        });

        return {
            ok: true,
            rooms: rooms.map(room => ({
                ...room,
                category: room.category,
                garage: room.garage.name,
                images: room.roomImage.map(image => image.url),
                city: room.motel.city.name,
                department: room.motel.department.name,
                country: room.motel.country.name,
                isFavorite: session?.user ? room.LikeRoomByUser.length > 0 : false,
            })),
            totalCount
        };

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            rooms: [],
            totalCount: 0,
            message: `No se pudieron obtener las habitaciones`,
        };
    }

}