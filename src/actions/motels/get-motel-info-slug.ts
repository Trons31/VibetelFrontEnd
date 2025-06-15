import prisma from "@/lib/prisma";

export const getMotelInfoBySlug = async (slug: string) => {
    try {
        const motel = await prisma.motel.findFirst({
            include: {
                motelImage: {
                    take: 2,
                    select: {
                        url: true,
                    },
                },
                country: {
                    select: {
                        name: true,
                    },
                },
                city: {
                    select: {
                        name: true,
                    },
                },
                department: {
                    select: {
                        name: true,
                    },
                },
                AmenitiesMotel: {
                    select: {
                        amenitiesMotelInfo: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                room: {
                    include: {
                        ratings: true,
                    },
                },
                MotelConfig: true,
            },
            where: {
                slug: slug,
                isApproved: "APPROVED"
            },
        });

        if (!motel) return null;

        const totalRooms = motel.room.length;

        const topRooms = await prisma.room.findMany({
            where: {
                motelId: motel.id
            },
            include: {
                ServiceItem: {
                    where: {
                        canceledReservation: false, // Asegúrate de no contar reservas canceladas
                    },
                },
                ratings: {
                    select: {
                        rating: true,
                        comment: true,
                        createdAt: true,
                    }
                },
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
                        title: true
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
            },
            orderBy: {
                ServiceItem: {
                    _count: 'desc', // Ordenar por el conteo de reservas
                },
            },
            take: 10, // Limitar a las 10 habitaciones más reservadas
        });

        const allRatings = await prisma.roomRating.findMany({
            where: {
                room: {
                    motelId: motel.id,
                },
            },
            select: {
                id: true,
                rating: true,
                createdAt: true,
                comment: true,
                room: {
                    select: {
                        title: true,
                        roomNumber: true
                    }
                }
            }
        });

        const totalRatings = motel.room.reduce((acc, room) => {
            const roomTotal = room.ratings.reduce((sum, rating) => sum + rating.rating, 0);
            return acc + roomTotal;
        }, 0);

        const totalRatingCount = motel.room.reduce((acc, room) => acc + room.ratings.length, 0);

        const motelAverageRating = totalRatingCount > 0 ? totalRatings / totalRatingCount : 0;

        return {
            title: motel.title,
            address: motel.address,
            contactEmail: motel.contactEmail,
            contactPhone: motel.contactPhone,
            description: motel.description,
            neighborhood: motel.neighborhood,
            whatsapp: motel.whatsapp,
            images: motel.motelImage.map((image) => image.url),
            country: motel.country.name,
            city: motel.city.name,
            department: motel.department.name,
            locationLatitude: motel.MotelConfig?.locationLatitude,
            locationLongitude: motel.MotelConfig?.locationLongitude,
            amentiesMotelMap: motel.AmenitiesMotel.map((amenity) => amenity.amenitiesMotelInfo.name),
            totalRooms,
            topRooms: topRooms.map(room => ({
                ...room,
                category: room.category,
                garage: room.garage.name,
                images: room.roomImage.map(image => image.url)

            })),
            motelAverageRating: Number(motelAverageRating.toFixed(2)),
            allRatings,
        };
    } catch (error) {
        console.log(error);
    }
};
