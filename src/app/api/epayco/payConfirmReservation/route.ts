import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import axios from 'axios';
import { emitPusherEvent } from '@/lib';

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
    const order = await prisma.service.findFirst({
        where: {
            transactionId: x_id_invoice,
            type: "reservation"
        },
    });

    if (!order?.transactionId || order.total !== Number(x_amount)) {
        return NextResponse.json({ message: 'Número de orden o valor pagado no coinciden' }, { status: 400 });
    }

    // Manejar los diferentes estados de la transacción
    switch (parseInt(x_cod_response, 10)) {
        case 1:
            // Transacción aceptada: Actualiza el estado de la reserva
            const checkReservation = await prisma.service.update({
                where: {
                    id: order.id,
                    type: "reservation",
                },
                data: {
                    paymentStatus: 'ACCEPTED',
                    paidAt: new Date(),
                },
                include: {
                    ServiceItem: {
                        select: {
                            id: true,
                            title: true,
                            arrivalDate: true,
                            roomNumber: true,
                            accessCode: true,
                            status: true,

                        }
                    }
                }
            });

            const reservationRealTime = {
                id: checkReservation.id,
                title: checkReservation.ServiceItem?.title || "No title",
                accessCode: checkReservation.ServiceItem?.accessCode,
                status: checkReservation.ServiceItem?.status,
                arrivalDate: checkReservation.ServiceItem?.arrivalDate || new Date(),
                roomNumber: checkReservation.ServiceItem?.roomNumber,
            };

            // Emitir evento de Pusher
            await emitPusherEvent('reservations', 'new-reservation', reservationRealTime);

            checkReservation.id
            const { phoneNumber, mail } = checkReservation;
            const reservationId = checkReservation.id;

            const baseUrl = "https://vibetel.vercel.app";

            if (phoneNumber) {
                try {
                    const smsResponse = await axios.post(`${baseUrl}/api/twilio/sendCodeReservation`, {
                        phoneNumber,
                        reservationId,
                    });

                    if (smsResponse.status === 200) {
                        return NextResponse.json({ message: 'Webhook procesado correctamente' }, { status: 200 });
                    } else {
                        console.error('Error al enviar el SMS:', smsResponse.statusText);
                        return NextResponse.json({ message: 'Error  al enviar el codigo de acceso al numero de telefono' }, { status: 400 });
                    }
                } catch (error) {
                    return NextResponse.json({ message: 'Error al enviar el codigo de acceso al correo' }, { status: 400 });
                }
            } else if (mail) {
                try {
                    const smsResponse = await axios.post(`${baseUrl}/api/mailer/service/reservation/sendCodeReservation`, {
                        mail,
                        reservationId,
                    });

                    if (smsResponse.status === 200) {
                        return NextResponse.json({ message: 'Webhook procesado correctamente' }, { status: 200 });
                    } else {
                        return NextResponse.json({ message: 'Error al enviar el codigo de acceso al correo' }, { status: 400 });
                    }
                } catch (error) {
                    return NextResponse.json({ message: 'Error al enviar el codigo de acceso al correo' }, { status: 400 });
                }
            }

            break;

        case 2:
            // Transacción rechazada
            await prisma.service.update({
                where: {
                    id: order.id,
                    type: "reservation"
                },
                data: {
                    paymentStatus: 'REJECTED'
                },
            });
            return NextResponse.json({ message: 'Webhook procesado correctamente' }, { status: 200 });
            break;

        case 3:
            // Transacción pendiente
            await prisma.service.update({
                where: {
                    id: order.id,
                    type: "reservation"
                },
                data: {
                    paymentStatus: 'PENDING'
                },
            });
            return NextResponse.json({ message: 'Webhook procesado correctamente' }, { status: 200 });
            break;

        case 4:
            // Transacción fallida
            await prisma.service.update({
                where: {
                    id: order.id,
                    type: "reservation"
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

    return NextResponse.json({ message: 'Webhook procesado correctamente' }, { status: 200 });
}
