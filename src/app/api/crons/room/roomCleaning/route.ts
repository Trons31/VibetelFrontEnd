import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    console.time("Tiempo de ejecución de limpieza");

    try {
        // const now = new Date();

        // // Buscar habitaciones en limpieza con la configuración del motel
        // const roomsToUpdate = await prisma.room.findMany({
        //     where: {
        //         RoomCleaning: { is: {} }, // Asegura que la habitación tiene un registro en RoomCleaning
        //     },
        //     include: {
        //         RoomCleaning: true, // Obtener la fecha de limpieza
        //         motel: {
        //             include: { MotelConfig: true }, // Obtener configuración del motel
        //         },
        //     },
        // });

        // // Filtrar las habitaciones según el tiempo de limpieza de cada motel
        // const roomsToReset = roomsToUpdate.filter((room) => {
        //     if (!room.RoomCleaning) return false; // Verifica que RoomCleaning no sea null

        //     const timeLimitMinutes = room.motel?.MotelConfig?.timeMinutesCleanRoom ?? 30;
        //     const limitTime = new Date(now.getTime() - timeLimitMinutes * 60000);

        //     return room.RoomCleaning.createdAt <= limitTime;
        // });

        // // Si no hay habitaciones para actualizar, termina la ejecución
        // if (roomsToReset.length === 0) {
        //     console.timeEnd("Tiempo de ejecución de limpieza");
        //     return NextResponse.json({ message: "No hay habitaciones para actualizar" });
        // }

        // // Ejecutar ambas consultas en paralelo
        // await Promise.all([
        //     prisma.room.updateMany({
        //         where: { id: { in: roomsToReset.map((room) => room.id) } },
        //         data: {
        //             inAvailable: true,
        //             status: "AVAILABLE"
        //         },
        //     }),
        //     prisma.roomCleaning.deleteMany({
        //         where: { roomId: { in: roomsToReset.map((room) => room.id) } },
        //     }),
        // ]);

        // await Promise.all(
        //     roomsToReset.map((room) => emitPusherEvent('rooms', 'available', room.id))
        // );

        // console.timeEnd("Tiempo de ejecución de limpieza");

        // return NextResponse.json({
        //     message: `${roomsToReset.length} habitaciones actualizadas`,
        // });
    } catch (error) {
        console.error("Error actualizando habitaciones:", error);
        console.timeEnd("Tiempo de ejecución de limpieza");
        return NextResponse.json(
            { message: "Error al actualizar las habitaciones en limpieza" },
            { status: 500 }
        );
    }
}
