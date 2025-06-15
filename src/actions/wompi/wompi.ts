'use server';

import crypto from 'crypto';
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from 'uuid';


export const PaidWhitWompi = async (roomId: string) => {
    try {

        const room = await prisma.room.findUnique({
            where: { id: roomId },
        });

        if (!room) throw new Error(`${roomId} no existe - 500`);

        // Calcular subtotal y total
        let subTotal = room.promoActive ? room.promoPrice || 0 : room.price || 0;
        let total = room.extraServicesActive ? subTotal + (room.extraServices || 0) : subTotal;

        // Datos necesarios para la firma
        const referenciaTransaccion = uuidv4(); // Genera o usa una referencia dinámica
        const llaveIntegridad = "test_integrity_Giz0A6OtmZvmMLVpq7ZpsfvpFDzI9cIs"; // Llave de integridad proporcionada por Wompi
        const moneda = "COP";

        // Crear la cadena concatenada para el hash
        const cadenaConcatenada = `${referenciaTransaccion}${total}${moneda}${llaveIntegridad}`;

        // Generar el hash SHA-256
        const hash = crypto.createHash('sha256').update(cadenaConcatenada).digest('hex');

        return {
            total,
            referenciaTransaccion,
            hash,
        };

    } catch (error) {
        console.log(error)
        return{
            total:0,
            referenciaTransaccion: "",
            hash: "",
        }
    }

};
