import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { emitPusherEvent } from "@/lib";

const p_cust_id_cliente = process.env.NEXT_PUBLIC_EPAYCO_KEY || '';
const p_key = process.env.NEXT_PUBLIC_EPAYCO_PRIVATE_KEY || '';

export async function POST(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    const x_ref_payco = searchParams.get('x_ref_payco');
    const x_transaction_id = searchParams.get('x_transaction_id');
    const x_amount = searchParams.get('x_amount');
    const x_currency_code = searchParams.get('x_currency_code');
    const x_signature = searchParams.get('x_signature');
    const x_cod_response = searchParams.get('x_cod_response');
    const x_id_invoice = searchParams.get('x_id_invoice');

    // Log para ver los parámetros recibidos
    console.log("Parámetros recibidos:", {
        x_ref_payco,
        x_transaction_id,
        x_amount,
        x_currency_code,
        x_signature,
        x_cod_response,
        x_id_invoice,
    });

    if (!x_cod_response) {
        return NextResponse.json({ message: 'x_cod_response es requerido' }, { status: 400 });
    }

    // Agregar logs detallados para ver los valores utilizados en la firma local
    console.log("Valores para firma local:");
    console.log("p_cust_id_cliente:", p_cust_id_cliente.trim());
    console.log("p_key:", p_key.trim());
    console.log("x_ref_payco:", x_ref_payco?.trim());
    console.log("x_transaction_id:", x_transaction_id?.trim());
    console.log("x_amount:", x_amount?.trim());
    console.log("x_currency_code:", x_currency_code?.trim());




    // Validar el número de orden y el valor esperado
    const order = await prisma.serviceAddTime.findFirst({
        where: {
            transactionId: x_id_invoice,
        },
    });

    if (!order?.transactionId || order.total !== Number(x_amount)) {
        return NextResponse.json({ message: 'Número de orden o valor pagado no coinciden' }, { status: 400 });
    }

    // Manejar los diferentes estados de la transacción
    switch (parseInt(x_cod_response, 10)) {
        case 1:
            // Transacción aceptada: Actualiza el estado de la reserva
            const updatedReservation = await prisma.serviceAddTime.update({
                where: {
                    id: order.id,
                },
                data: {
                    paymentStatus: 'ACCEPTED',
                    paidAt: new Date(),
                },
            });

            // Obtiene la reserva actual con las adiciones de tiempo para calcular el total y la última fecha de salida
            const currentReservation = await prisma.serviceItem.findUnique({
                where: { id: updatedReservation.serviceItemId },
                select: {
                    serviceAddTime: {
                        orderBy: { createdAt: 'desc' },
                        select: {
                            newDepartureDate: true,
                            addTimeReservation: true,
                            createdAt: true,
                        }
                    },
                    id: true,
                    departureDate: true,
                },
            });

            if (!currentReservation) {
                throw new Error("Reservation not found");
            }

            // Calcula el total de tiempo adicionado
            const totalAddTime = currentReservation.serviceAddTime.reduce((total, addTime) => total + addTime.addTimeReservation, 0);

            // Usa la última fecha de salida registrada
            const latestDepartureDate = currentReservation.serviceAddTime.length > 0
                ? currentReservation.serviceAddTime[0].newDepartureDate
                : currentReservation.departureDate;

            // Emitir el evento Pusher con el total de tiempo adicionado y la nueva hora de salida
            const reservationUpdate = {
                id: currentReservation.id,
                totalAddTime,
                departureDate: latestDepartureDate,
                createdAtAddTime: currentReservation.serviceAddTime.length > 0
                    ? currentReservation.serviceAddTime[0].createdAt
                    : null,
            };

            await emitPusherEvent('rooms', 'add-time-room', reservationUpdate);

            return NextResponse.json({ message: 'Pago aceptado y reserva actualizada' }, { status: 200 });

        case 2:
            // Transacción rechazada
            await prisma.serviceAddTime.update({
                where: {
                    id: order.id,
                },
                data: {
                    paymentStatus: 'REJECTED'
                },
            });
            return NextResponse.json({ message: 'Webhook procesado correctamente' }, { status: 200 });
            break;

        case 3:
            // Transacción pendiente
            await prisma.serviceAddTime.update({
                where: {
                    id: order.id,
                },
                data: {
                    paymentStatus: 'PENDING'
                },
            });
            return NextResponse.json({ message: 'Webhook procesado correctamente' }, { status: 200 });
            break;

        case 4:
            // Transacción fallida
            await prisma.serviceAddTime.update({
                where: {
                    id: order.id,
                },
                data: {
                    paymentStatus: 'FAILED'
                },
            });
            return NextResponse.json({ message: 'Webhook procesado correctamente' }, { status: 200 });
            break;

        default:
            return NextResponse.json({ message: 'Código de respuesta no válido' }, { status: 400 });
    }

}
