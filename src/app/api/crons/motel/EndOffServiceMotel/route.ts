import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";

export async function GET() {
    console.time("Tiempo de ejecución de actualizar configuracion del motel");
    try {
        const today = dayjs().startOf("day").toDate();

        // Actualizar todos los MotelConfig que deben volver a estar en servicio
        const updatedConfigs = await prisma.motelConfig.updateMany({
            where: {
                outOfServiceEnd: {
                    lte: today, // Si outOfServiceEnd es menor o igual a la fecha actual
                },
            },
            data: {
                inService: true,
                outOfServiceStart: null,
                outOfServiceEnd: null,
            },
        });

        console.timeEnd("Tiempo de ejecución de actualizar configuracion del motel");

        return NextResponse.json({
            message: "Configuracion del motel actualizada correctamente",
            updatedCount: updatedConfigs.count,
        });
    } catch (error) {
        console.error("Error al actualizar la configuracion del motel:", error);
        console.timeEnd("Tiempo de ejecución de actualizar configuracion del motel");
        return NextResponse.json(
            { error: "Fallo al actualizar la configuracion del motel" },
            { status: 500 }
        );
    }
}
