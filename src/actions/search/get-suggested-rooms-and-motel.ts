'use server';

import prisma from "@/lib/prisma";
import { ApprovalStatus } from "@prisma/client"; // Importar enums si están disponibles

interface Props {
    query: string;
    city?: string;
}

export const getSuggestedRoomsAndMotels = async ({ city, query }: Props) => {
    try {
        if (!query.trim()) return { suggestedResults: [] };

        const searchTermLowerCase = query.toLowerCase();

        const whereCondition = city
            ? { motel: { city: { name: city }, isApproved: ApprovalStatus.APPROVED } }
            : { motel: { isApproved: ApprovalStatus.APPROVED } };

        // Buscar moteles y habitaciones en una sola consulta
        const [motels, rooms] = await Promise.all([
            prisma.motel.findMany({
                where: {
                    ...whereCondition.motel,
                    title: { contains: searchTermLowerCase, mode: 'insensitive' },
                },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                }
            }),
            prisma.room.findMany({
                where: {
                    ...whereCondition,
                    title: { contains: searchTermLowerCase, mode: 'insensitive' },
                },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    motelId: true,
                    motel: { select: { isApproved: true } }
                }
            })
        ]);

        // Filtrar habitaciones que pertenezcan a moteles aprobados
        const filteredRooms = rooms.filter(room => room.motel.isApproved === ApprovalStatus.APPROVED);

        // Elegir qué mostrar primero (moteles o habitaciones)
        const suggestedResults = (motels.length >= filteredRooms.length ? motels : filteredRooms).map(item => ({
            id: item.id,
            title: item.title,
            type: motels.includes(item) ? 'motel' : 'room',
            slug: item.slug
        }));

        return { ok: true, suggestedResults };
    } catch (error) {
        console.error("Error en getSuggestedRoomsAndMotels:", error);
        return { ok: false, suggestedResults: [] };
    }
};
