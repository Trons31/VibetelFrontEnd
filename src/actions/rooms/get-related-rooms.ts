"use server";
import prisma from "@/lib/prisma";

export const getRelatedRooms = async (category: string) => {
  try {
    const relatedRooms = await prisma.room.findMany({
      where: {
        category: {
          name: category,
        },
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
          },
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
          },
        },
        garage: {
          select: {
            id: false,
            name: true,
          },
        },
        motel: {
          select: {
            id: true,
            title: true,
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
            country: {
              select: {
                name: true,
              },
            },
          },
        },
        amenitiesRoom: {
          include: {
            AmenitiesRoomlInfo: {
              select: {
                name: true,
                description: true,
              },
            },
          },
        },
      },
      orderBy: {
        ServiceItem: {
          _count: "desc", // Ordenar por el conteo de reservas
        },
      },
      take: 10, // Limitar a las 10 habitaciones más reservadas
    });

    // Mapear los resultados para devolver solo los datos relevantes
    return {
      ok: true,
      relatedRooms: relatedRooms.map((room) => ({
        ...room,
        category: room.category,
        garage: room.garage.name,
        images: room.roomImage.map((image) => image.url),
        city: room.motel.city.name,
        department: room.motel.department.name,
        country: room.motel.country.name,
      })),
    };
  } catch (error) {
    return {
      ok: false,
      relatedRooms: [],
    };
  }
};
