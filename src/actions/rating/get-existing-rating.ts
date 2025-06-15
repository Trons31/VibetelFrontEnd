'use server';

import prisma from "@/lib/prisma";



export const getExistingRating = async (ratinRoomgId?: string, ratingServiceId?: string) => {

    try {
        if (!ratinRoomgId || !ratingServiceId) return {
            ok: false,
        }

        const ratingRoom = await prisma.roomRating.findFirst({
            where: { id: ratinRoomgId }
        })


        if (!ratingRoom) return {
            ok: false,
        }

        const ratingService = await prisma.serviceRating.findFirst({
            where: { id: ratingServiceId }
        })

        if (!ratingService) return {
            ok: false,
        }

        return {
            ok: true,
            ratingRoom: {
                roomRating: ratingRoom.rating,
                roomComments: ratingRoom.comment
            },
            ratingService: {
                serviceRating: ratingService.rating,
                serviceComments: ratingService.comment,
            }
        }


    } catch (error) {
        return {
            ok: false,
        }
    }

}