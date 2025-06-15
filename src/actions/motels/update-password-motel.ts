'use server';
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';


export const updatePasswordMotel = async (currentPassword: string, newPassword: string, motelPartnerId: string) => {


    try {

        const motelPartner = await prisma.user.findUnique({
            where: {
                id: motelPartnerId
            }
        })

        if (motelPartner) {

            if (!bcryptjs.compareSync(currentPassword, motelPartner.password)) {
                return {
                    ok: false,
                    message: "La contraseña actual es incorrecta. Por favor vuelve a intentarlo"
                }
            };

            await prisma.user.update({
                data: {
                    password: newPassword
                },
                where: {
                    id: motelPartnerId
                }
            })

            return {
                ok: true
            }
        }



    } catch (error) {
        return {
            ok: false,
            message: "Ocurrio un error Ups"
        }
    }

}