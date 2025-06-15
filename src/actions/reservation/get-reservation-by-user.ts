'use server';

import prisma from '@/lib/prisma';

interface GetReservationsParams {
  userId: string;
  page: number;
  statusFilter: string;
  titleFilter: string;
  dateRange: string;
}

export const getReservationByUser = async ({ userId, page = 1, statusFilter, titleFilter, dateRange }: GetReservationsParams) => {
  const itemsPerPage = 5; // Número de reservas por página
  const skip = (page - 1) * itemsPerPage;



  try {
    // Condiciones de filtro inicial
    let whereConditions: any = {
      user: { id: userId },
      type: "reservation",
      paymentStatus: 'ACCEPTED'
    };

    // Añadir condiciones de filtro si hay un filtro de búsqueda específico
    if (statusFilter || titleFilter || dateRange) {
      whereConditions.AND = [];

      if (statusFilter) {
        whereConditions.AND.push({ ServiceItem: { status: { equals: statusFilter } } });
      }

      if (titleFilter) {
        whereConditions.AND.push({ ServiceItem: { room: { title: { contains: titleFilter } } } });
      }

      // Agregar filtro de rango de fechas
      if (dateRange) {
        const currentDate = new Date();
        let startDate: Date | undefined;
        let endDate: Date = new Date(); // End date is always now

        if (dateRange === 'last_week') {
          startDate = new Date(currentDate);
          startDate.setDate(startDate.getDate() - 7);
        } else if (dateRange === 'last_month') {
          startDate = new Date(currentDate);
          startDate.setMonth(startDate.getMonth() - 1);
        }

        if (startDate) {
          whereConditions.AND.push({
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          });
        }
      }
    }

    // Consulta a la base de datos
    const reservations = await prisma.service.findMany({
      where: whereConditions,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        ServiceItem: {
          include: {
            room: {
              select: {
                motel: {
                  select: {
                    title: true,
                    address: true,
                    neighborhood: true,
                    contactPhone: true,
                  }
                },
                slug: true,
                roomImage: {
                  take: 2,
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
        ServiceRating: {
          select: {
            id: true,
          }
        },
        RoomRating: {
          select: {
            id: true,
            rating: true
          }
        }
      },
      take: itemsPerPage,
      skip: skip,
    });



    // Contar el total de reservas que cumplen con las condiciones de filtro
    const totalCount = await prisma.service.count({
      where: whereConditions,
    });

    return {
      ok: true,
      reservations: reservations.map(reservation => ({
        id: reservation.id,
        createdAt: reservation.createdAt,
        status: reservation.ServiceItem?.status,
        roomSlug: reservation.ServiceItem?.room.slug,
        motelName: reservation.ServiceItem?.room.motel.title,
        room: reservation.ServiceItem?.title,
        roomId: reservation.ServiceItem?.roomId,
        roomImages: reservation.ServiceItem?.room.roomImage,
        total: reservation.total,
        ratings: reservation.RoomRating,
        serviceRating: reservation.ServiceRating
      })),
      totalCount,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      reservations: [],
      message: `No se pudieron obtener las reservas del usuario con id ${userId}`,
    };
  }
};
