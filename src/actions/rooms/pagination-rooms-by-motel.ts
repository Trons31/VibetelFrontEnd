'use server';
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";



interface GetRoomsParams {
    page: number;
    category: string,
    garage: string,
    inAvailable: string,
    onSale: string,
    orderPrice: string,
    orderMostReserved?: string,
    searchTerm: string,
    itemsPerPage: number;
    motelId?: string,
}


export const paginationRoomByMotel = async ({ page = 1, category, garage, orderPrice, inAvailable, onSale, orderMostReserved, searchTerm, itemsPerPage, motelId }: GetRoomsParams) => {


    const skip = (page - 1) * itemsPerPage;

    try {

        let whereConditions: any = {
            motelId: motelId,
        };

        if (category || garage || inAvailable || onSale || searchTerm) {
            whereConditions.AND = [];

            if (category) {
                whereConditions.AND.push({ category: { id: { equals: category } } });
            }

            if (garage) {
                whereConditions.AND.push({ garage: { id: { equals: garage } } });
            }

            if (searchTerm) {
                whereConditions.AND.push({
                    OR: [
                        { title: { contains: searchTerm, mode: 'insensitive' } }, // Buscar por nombre de la habitación
                        { category: { name: { contains: searchTerm, mode: 'insensitive' } } }, // Buscar por nombre de la categoría
                        { motel: { title: { contains: searchTerm, mode: 'insensitive' } } } // Buscar por nombre del motel
                    ]
                });
            }

        }

        let orderByCondition: Prisma.RoomOrderByWithRelationInput | undefined = undefined;

        if (orderPrice) {
            orderByCondition = { price: orderPrice === "asc" ? "asc" : "desc" };
        }

        if (onSale) {
            orderByCondition = { promoActive: onSale === "asc" ? "asc" : "desc" };
        }

        if (inAvailable) {
            orderByCondition = { inAvailable: inAvailable === "asc" ? "asc" : "desc" };
        }

        const rooms = await prisma.room.findMany({
            where: whereConditions,
            orderBy: orderByCondition,
            include: {
                ratings: {
                    select: {
                        createdAt: true,
                        rating: true,
                        comment: true,
                    }
                },
                //Incluimos el productImage que es la relacion que existe entre el producto y sus imagenes
                roomImage: {
                    //Definimos la cantidad de imagenes por producto que queremos obtener
                    take: 2,
                    //Definimos la property select para seleccionar de la tabla ProductImage la propiedad que queremos obtener y lo definimos en true en este caso la url
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
                        ServiceItem: true  // Incluimos el conteo de reservas por habitación
                    }
                }
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