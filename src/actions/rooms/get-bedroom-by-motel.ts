"use server";

import { auth } from "@/auth.config";
import prisma from "../../lib/prisma";

interface Props {
  motel?: string;
}

export const getBedroomByMotel = async ({ motel }: Props) => {

  const session = await auth();

  try {
    const roomsByMotel = await prisma.room.findMany({
      where: {
        motel: {
          id: motel,
        },
      },
      orderBy: {
        promoActive: "desc",
      },
      take: 10,

      include: {
        ratings: {
          select: {
            createdAt: true,
            rating: true,
            comment: true,
          },
        },
        roomImage: {
          take: 3,
          select: {
            id: true,
            url: true,
          },
        },
        category: {
          select: {
            name: true,
            description: true,
          },
        },
        garage: {
          select: {
            name: true,
          },
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
    });

    return {
      ok: true,
      rooms: roomsByMotel.map((room) => ({
        ...room,
        category: room.category,
        garage: room.garage.name,
        images: room.roomImage.map((image) => image.url),
        city: room.motel.city.name,
        department: room.motel.department.name,
        country: room.motel.country.name,
        isFavorite: session?.user ? room.LikeRoomByUser.length > 0 : false,
      })),
      totalCount: roomsByMotel.length,
    };
  } catch (error) {
    return {
      ok: false,
      rooms: [],
      totalCount: 0,
      message: `No se pudieron obtener las habitaciones`,
    };
  }
};
