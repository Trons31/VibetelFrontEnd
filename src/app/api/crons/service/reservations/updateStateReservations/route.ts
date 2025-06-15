import { NextResponse } from "next/server";
import dayjs from "dayjs";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    console.time("Tiempo de ejecución de actualización de servicios");

    try {
        const today = dayjs().startOf("day").toDate();
        const endOfDay = dayjs().endOf("day").toDate();

        // Verificar si hay servicios para actualizar antes de ejecutar updateMany
        const pendingServicesCount = await prisma.serviceItem.count({
            where: {
                status: "en_espera",
                departureDate: {
                    gte: today,
                    lte: endOfDay,
                },
            },
        });

        if (pendingServicesCount === 0) {
            console.timeEnd("Tiempo de ejecución de actualización de servicios");
            return NextResponse.json({
                message: "No hay servicios para actualizar",
                updatedCount: 0,
            });
        }

        // Actualizar solo si hay servicios que cumplir con la condición
        const updatedServices = await prisma.serviceItem.updateMany({
            where: {
                status: "en_espera",
                departureDate: {
                    gte: today,
                    lte: endOfDay,
                },
            },
            data: {
                status: "no_iniciado",
            },
        });

        console.timeEnd("Tiempo de ejecución de actualización de servicios");

        return NextResponse.json({
            message: "Servicios actualizados con éxito",
            updatedCount: updatedServices.count,
        });
    } catch (error) {
        console.error("Error al actualizar los servicios:", error);
        console.timeEnd("Tiempo de ejecución de actualización de servicios");
        return NextResponse.json(
            { message: "Error al actualizar los servicios", error },
            { status: 500 }
        );
    }
}
