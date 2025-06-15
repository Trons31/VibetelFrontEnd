'use server';

import prisma from "@/lib/prisma";


export const getLocationByUser = async (query: string) => {

    try {

        if (!query) return {
            city: []
        };

        const searchCity = await prisma.city.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                    {
                        department: {
                            name: {
                                contains: query,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        department: {
                            country: {
                                name: {
                                    contains: query,
                                    mode: 'insensitive',
                                },
                            },
                        },
                    },
                ],
            },
            select: {
                name: true,
                id:true,
                department: {
                    select: {
                        name: true,
                        country: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            }
        })

        return {
            city: searchCity.map(city => ({
                country: city.department.country.name,
                department: city.department.name,
                city: city.name,
                cityId: city.id
            }))
        }


    } catch (error) {
        return {
            city: []
        };
    }

}