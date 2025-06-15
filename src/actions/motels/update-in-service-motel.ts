'use server';
import prisma from "@/lib/prisma";

export const updateInServiceMotel = async (motelId: string, inService: boolean, startOffService?: Date, endOffService?: Date) => {

    try {

        const existingConfig = await prisma.motelConfig.findUnique({
            where: {
                motelId: motelId,
            },
        });

        if (existingConfig) {
            // Si existe, actualizar la configuración existente
            await prisma.motelConfig.update({
                where: {
                    motelId: motelId,
                },
                data: {
                    inService: inService,
                    outOfServiceStart: startOffService ? startOffService : null,
                    outOfServiceEnd: endOffService ? endOffService : null,
                },
            });
        } else {
            return {
                ok: false,
            }
        }

        return {
            ok: true,
        };

    } catch (error) {
        return {
            ok: false,
        }
    }


}