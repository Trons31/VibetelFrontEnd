'use server';
import prisma from "@/lib/prisma";



export const endServiceByMotel = async (idService: string) => {


    try {

        const service = await prisma.service.update({
            where: {
                id: idService,
                type: "noReservation"
            },
            data: {
                ServiceItem: {
                    update: {
                        serviceCompleted: true,
                        dateComplete: new Date(),
                        status: "completado",
                        room: {
                            update: {
                                status: "SERVICE_COMPLETED"
                            }
                        }
                    },
                },
            }
        })

        return {
            ok: true,
            message: "Servicio finalizado correctamente"
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "Ups el servicio no se pudo finalizar"
        }
    }

}