import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Configura el cliente de Twilio
// const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
// const authToken = process.env.TWILIO_AUTH_TOKEN as string;
// const client = twilio(accountSid, authToken);

// Función para enviar el SMS
export async function POST(request: Request) {
  try {
    // const { phoneNumber, reservationId } = await request.json();

    // if (!phoneNumber || !reservationId) {
    //   return NextResponse.json(
    //     { error: 'Número de teléfono y ID de reserva son requeridos' },
    //     { status: 400 }
    //   );
    // }

    // // Mensaje de la reserva
    // const message = `Su reserva ha sido confirmada. El ID de su reserva es: ${reservationId}. Use este ID para gestionar su reserva.`;

    // // Enviar SMS utilizando Twilio
    // const response = await client.messages.create({
    //   body: message,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: phoneNumber,
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al enviar el SMS:', error);
    return NextResponse.json({ error: 'No se pudo enviar el SMS' }, { status: 500 });
  }
}
