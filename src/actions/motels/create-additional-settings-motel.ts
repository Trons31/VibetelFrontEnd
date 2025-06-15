'use server';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createAdditionalSettingsMotel = async (timeAwaitTakeReservation: number, timeMinutesCleanRoom: number, optionTimeAddReservation: number, motelId: string) => {


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
                    timeAwaitTakeReservation: timeAwaitTakeReservation,
                    timeMinutesCleanRoom: timeMinutesCleanRoom,
                    defaultReservationAddTime: optionTimeAddReservation,
                    inService: true,
                },
            });
        } else {
            // Si no existe, crear una nueva configuración
            await prisma.motelConfig.create({
                data: {
                    timeAwaitTakeReservation: timeAwaitTakeReservation,
                    timeMinutesCleanRoom: timeMinutesCleanRoom,
                    defaultReservationAddTime: optionTimeAddReservation,
                    inService: true,
                    motelId: motelId,
                },
            });
        }

        revalidatePath('/admin/dashboard-partner-motel')

        return {
            ok: true,
        };

    } catch (error) {
        return {
            ok: false,
        }
    }


}