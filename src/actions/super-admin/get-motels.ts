'use server';
import prisma from "@/lib/prisma";
interface GetRoomsParams {
    page: number;
    isApproved: string,
    searchTerm: string;
    itemsPerPage: number;
    city: string,
}


export const getMotels = async ({ page = 1, isApproved, searchTerm, city, itemsPerPage }: GetRoomsParams) => {

    const skip = (page - 1) * itemsPerPage;

    try {

        let whereConditions: any = {};

        if (isApproved || searchTerm || city) {
            whereConditions.AND = [];

            if (isApproved) {
                whereConditions.AND.push({ isApproved: { equals: isApproved === "APPROVED" ? true : false } });
            }

            if (searchTerm) {
                whereConditions.AND.push({
                    OR: [
                        { title: { contains: searchTerm, mode: 'insensitive' } },  // Buscar por nombre del motel
                        { city: { name: { contains: searchTerm, mode: 'insensitive' } } },  // Buscar por nombre de la ciudad
                        { department: { name: { contains: searchTerm, mode: 'insensitive' } } }  // Buscar por nombre del departamento
                    ]
                });
            }

        }

        const motels = await prisma.motel.findMany({
            where: whereConditions,
            include: {
                motelImage: {
                    select: {
                        url: true,
                    }
                },
                MotelConfig: true,
                city: {
                    select: {
                        name: true,
                    }
                },
                department: {
                    select: {
                        name: true,
                    }
                },
                country: {
                    select: {
                        name: true
                    }
                },
            },
            take: itemsPerPage,
            skip: skip,
        });


        const totalCount = await prisma.motel.count({
            where: whereConditions
        });

        return {
            ok: true,
            motels: motels.map(motel => ({
                ...motel,
                images: motel.motelImage.map(image => image.url),
                city: motel.city.name,
                department: motel.department.name,
                country: motel.country.name,
            })),
            totalCount
        };

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            motels: [],
            totalCount: 0,
            message: `No se pudieron obtener los moteles`,
        };
    }

}