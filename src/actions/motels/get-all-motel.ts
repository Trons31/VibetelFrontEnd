'use server';
import prisma from '../../lib/prisma';

interface GetMotelParams {
    page?: number;
    searchTerm?: string;
    city?: string,
}


export const getAllMotel = async ({ page = 1, searchTerm, city }: GetMotelParams) => {

    const itemsPerPage = 12;
    const skip = (page - 1) * itemsPerPage;

    try {

        if (city === '') {
            return {
                ok: false,
                motels: [],
                totalCount: 0,
                message: `No se pudieron obtener los moteles`,
            };
        }

        let whereConditions: any = {
            isApproved: "APPROVED",
            city: {
                name: {
                    equals: city,
                }
            }
        };

        if (searchTerm) {
            whereConditions.AND = [];

            if (searchTerm) {
                const searchTermLowerCase = searchTerm.toLowerCase();
                whereConditions.AND.push({ title: { contains: searchTermLowerCase, mode: 'insensitive' } });
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
                MotelConfig:true,
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
                inService: motel.MotelConfig?.inService || false,
                city: motel.city.name,
                department: motel.department.name,
            })),
            totalCount,
        }

    } catch (error) {
        return {
            ok: false,
            motels: [],
            totalCount: 0,
            message: `No se pudieron obtener los moteles`,
        };
    }

}