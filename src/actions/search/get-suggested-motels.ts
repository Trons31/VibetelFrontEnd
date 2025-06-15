'use server';

import prisma from "@/lib/prisma";

interface Props {
    query: string,
    city?: string,
}

export const getSuggestedMotels = async ({ city, query }: Props) => {

    try {

        if (!query) return {
            suggestedMotels: []
        };

        let whereConditions: any = {
            city: {
                name: city
            }
        };

        if (query) {
            whereConditions.AND = [];

            if (query) {
                const searchTermLowerCase = query.toLowerCase();
                whereConditions.AND.push({
                    OR: [
                        { title: { contains: searchTermLowerCase, mode: 'insensitive' } }// Buscar por nombre del motel
                    ]
                });
            }
        }



        const suggestedMotels = await prisma.motel.findMany({
            where: whereConditions,
            select:{
                id:true,
                title:true,
                department:{
                    select:{
                        name:true,
                    }
                },
                city:{
                    select:{
                        name: true
                    }
                }
            }
        })

        return {
            ok: true,
            suggestedMotels: suggestedMotels.map(motel => ({
                id:motel.id,
                title: motel.title,
                department: motel.department.name,
                city: motel.city.name
            }))
        }

    } catch (error) {
        return {
            ok: false,
            suggestedMotels: []
        }
    }


}