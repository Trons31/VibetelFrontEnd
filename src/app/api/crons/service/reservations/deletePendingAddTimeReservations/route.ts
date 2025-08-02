import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    console.time("Tiempo de ejecución de eliminación de serviceAddTime");

    const now = new Date();
    const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60000); // 30 minutos atrás

    try {
        // const deletedServiceAddTimes = await prisma.$transaction(async (tx) => {
        //     const nonAcceptedReservations = await tx.service.findMany({
        //         where: {
        //             type: "reservation",
        //             paymentStatus: { not: "ACCEPTED" },
        //             createdAt: { lt: thirtyMinutesAgo },
        //         },
        //         select: { id: true },
        //     });

        //     const reservationIds = nonAcceptedReservations.map((reservation) => reservation.id);

        //     if (reservationIds.length === 0) {
        //         return 0; // Evitamos llamar a console.timeEnd() aquí
        //     }

        //     console.log(`🔹 Eliminando registros de serviceAddTime relacionados con ${reservationIds.length} reservas pendientes...`);

        //     const deletedAddTimesCount = await tx.serviceAddTime.deleteMany({
        //         where: {
        //             serviceItem: {
        //                 serviceId: { in: reservationIds },
        //             },
        //         },
        //     });

        //     return deletedAddTimesCount.count;
        // });

        // console.timeEnd("Tiempo de ejecución de eliminación de serviceAddTime");

        // return NextResponse.json({
        //     message: `${deletedServiceAddTimes} registros de serviceAddTime eliminados`,
        // });
    } catch (error) {
        console.error("❌ Error al eliminar las adiciones de tiempo:", error);
        console.timeEnd("Tiempo de ejecución de eliminación de serviceAddTime");

        return NextResponse.json(
            { message: "Error al eliminar las adiciones de tiempo", error },
            { status: 500 }
        );
    }
}

