'use server';

import prisma from "@/lib/prisma";

interface Props {
    query: string,
    city?: string,
}

export const getSuggestedRooms = async ({ city, query }: Props) => {

    try {

        if (!query) return {
            suggestedRooms: []
        };

        let whereConditions: any = {
            motel: {
                city: {
                    name: city
                }
            }
        };

        if (query) {
            whereConditions.AND = [];

            if (query) {
                const searchTermLowerCase = query.toLowerCase();
                whereConditions.AND.push({
                    OR: [
                        { title: { contains: searchTermLowerCase, mode: 'insensitive' } }, // Buscar por nombre de la habitación
                        { category: { name: { contains: searchTermLowerCase, mode: 'insensitive' } } }, // Buscar por nombre de la categoría
                        { motel: { title: { contains: searchTermLowerCase, mode: 'insensitive' } } } // Buscar por nombre del motel
                    ]
                });
            }
        }



        const suggestedRooms = await prisma.room.findMany({
            where: whereConditions,
        })

        return {
            ok: true,
            suggestedRooms: suggestedRooms.map(room => ({
                slug: room.slug,
                title: room.title
            }))
        }

    } catch (error) {
        return {
            ok: false,
            suggestedRooms: []
        }
    }


}