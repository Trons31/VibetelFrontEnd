"use server";

import prisma from "@/lib/prisma";

export const getMostReservedMotels = async (city: string) => {
  try {
    const motels = await prisma.motel.findMany({
      where: {
        city: {
          name: city,
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
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
        MotelConfig: true,
        address: true,
        _count: {
          select: {
            room: {
              where: {
                ServiceItem: {
                  some: {
                    service: {
                      type: "reservation",
                      paymentStatus: "ACCEPTED",
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        room: {
          _count: "desc",
        },
      },
      take: 10, // Ajusta según el número de moteles que desees mostrar
    });

    return {
      ok: true,
      motels: motels.map((motel) => ({
        ...motel,
        city: motel.city.name,
        department: motel.department.name,
        country: motel.country.name,
      })),
    };
  } catch (error) {
    console.error("Error fetching most frequented motels:", error);
    return {
      ok: false,
    };
  }
};
