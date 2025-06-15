import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    console.time("Tiempo de ejecución de eliminación de reservas pendientes");

    const now = new Date();
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60000); // 15 minutos atrás

    try {
        const deletedReservations = await prisma.$transaction(async (tx) => {
            const pendingReservations = await tx.service.findMany({
                where: {
                    type: "reservation",
                    paymentStatus: { not: "ACCEPTED" },
                    createdAt: { lt: fifteenMinutesAgo },
                },
                select: { id: true },
            });

            const reservationIds = pendingReservations.map((reservation) => reservation.id);

            if (reservationIds.length === 0) {
                return 0;
            }

            console.log(`🔹 Eliminando ${reservationIds.length} reservas pendientes...`);

            await tx.serviceItem.deleteMany({
                where: { serviceId: { in: reservationIds } },
            });

            const deletedReservationCount = await tx.service.deleteMany({
                where: { id: { in: reservationIds } },
            });

            return deletedReservationCount.count;
        });

        console.timeEnd("Tiempo de ejecución de eliminación de reservas pendientes");

        return NextResponse.json({
            message: `${deletedReservations} reservas eliminadas`,
        });
    } catch (error) {
        console.error("❌ Error al eliminar reservas pendientes:", error);
        console.timeEnd("Tiempo de ejecución de eliminación de reservas pendientes");

        return NextResponse.json(
            { message: "Error al eliminar reservas pendientes", error },
            { status: 500 }
        );
    }
}
