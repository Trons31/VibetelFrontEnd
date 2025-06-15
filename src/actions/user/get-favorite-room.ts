'use server';

import prisma from '@/lib/prisma';

interface GetFavoritesParams {
  userId: string;
  page: number;
  titleFilter?: string;
  priceFilter?: number;
  filterType?:string;
  garageFilter?:string;
  categoryFilter?:string;
}


export const getFavoriteRoomByUser = async ({ 
  userId, 
  page = 1, 
  titleFilter, 
  priceFilter, 
  filterType,
  garageFilter,
  categoryFilter,
  
}: GetFavoritesParams) => {
  const itemsPerPage = 5; // Número de habitaciones por página
  const skip = (page - 1) * itemsPerPage;
  
  try {
    // Condiciones de filtro inicial
    let whereConditions: any = {
      userId: userId, // Filtrar por usuario
    };

    
    // Añadir condiciones de filtro si hay un filtro de búsqueda específico
    if (titleFilter || garageFilter || categoryFilter || filterType ) {
      whereConditions.AND = [];

      if (titleFilter) {
        whereConditions.AND.push({ room: { title: { contains: titleFilter } } });
      }

      if(filterType){

          if(filterType === "available"){
            whereConditions.AND.push({ room: { inAvailable: { equals: true } } });
          }

          if(filterType === "promo"){
            whereConditions.AND.push({ room: { promoActive: { equals: true } } });
          }

      }

      if(garageFilter){
        whereConditions.AND.push({ room: { garageId: { equals: garageFilter } } });
      }

      if(categoryFilter){
        whereConditions.AND.push({ room: { categoryId: { equals: categoryFilter } } });
      }
      
    }

    // Consulta a la base de datos
    const favorites = await prisma.favoriteRoomByUser.findMany({
      where: whereConditions,
     
      include: {
        room: {
          select: {
            title: true,
            price: true,
            promoActive: true,
            promoPrice: true,
            roomImage: {
              take: 2,
              select: {
                url: true,
              },
            },
            inAvailable: true,
            slug: true,
            timeLimit: true,
            motel: {
              select: {
                title: true,
              },
            },
          },
        },
      },
      take: itemsPerPage,
      skip: skip,
    });

    // Contar el total de habitaciones que cumplen con las condiciones de filtro
    const totalCount = await prisma.favoriteRoomByUser.count({
      where: whereConditions,
    });

    return {
      ok: true,
      favorites,
      totalCount,
    };
  } catch (error) {
    return {
      ok: false,
      favorites: [],
      message: `No se pudieron obtener las habitaciones favoritas del usuario con id ${userId}`,
    };
  }
};
