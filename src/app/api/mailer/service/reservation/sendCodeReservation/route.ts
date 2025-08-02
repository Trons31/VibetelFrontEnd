// import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    //     try {
    //         const { mail, reservationId } = await request.json();

    //         // Configuración del transporte de Nodemailer
    //         const transporter = nodemailer.createTransport({
    //             service: 'gmail',
    //             auth: {
    //                 user: process.env.EMAIL_USER, // tu email
    //                 pass: process.env.EMAIL_PASSWORD, // tu contraseña
    //             },
    //         });

    //         // Contenido del correo en formato HTML con título y botón en rojo
    //         const mailOptions = {
    //             from: process.env.EMAIL_USER,
    //             to: mail, // Correo del usuario que hizo la reserva
    //             subject: '🏨 Confirmación de su reserva - VibeTel',
    //             html: `
    //                 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background-color: #f8f9fa; color: #333;">
    //                     <div style="text-align: center;">
    //                         <h2 style="color: #dc2626;">✅ ¡Su reserva ha sido confirmada!</h2>
    //                         <p style="font-size: 16px; color: #555;">
    //                             Gracias por elegir VibeTel. Su reserva ha sido realizada con éxito.
    //                         </p>
    //                     </div>

    //                     <div style="background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    //                         <p style="font-size: 14px; color: #555;">
    //                             Para acceder a los detalles de su reserva, incluyendo el código de acceso al motel, utilice el siguiente código de acceso:
    //                         </p>

    //                         <p style="font-size: 24px; color: #dc2626; font-weight: bold; text-align: center;">${reservationId}</p>

    //                         <p style="font-size: 14px; color: #555; text-align: center;">
    //                             Puede ingresar este código en nuestra plataforma para ver más detalles sobre su reserva.
    //                         </p>

    //                         <div style="text-align: center; margin: 20px 0;">
    //                             <a href="https://vibetel.vercel.app/searchBooking?codeBooking=${reservationId}" 
    //                                style="background-color: #dc2626; color: #ffffff; padding: 12px 24px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px; display: inline-block;">
    //                                 Ver reserva
    //                             </a>
    //                         </div>
    //                     </div>

    //                     <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

    //                     <p style="font-size: 12px; color: #aaa; text-align: center;">
    //                         © 2024 VibeTel. Todos los derechos reservados.<br>
    //                         <a href="https://vibetel.vercel.app" style="color: #dc2626; text-decoration: none; font-weight: bold;">Visite nuestro sitio web</a>
    //                     </p>
    //                 </div>
    //             `,
    //         };

    //         // Enviar correo
    //         await transporter.sendMail(mailOptions);

    //         return NextResponse.json({ ok: true, message: "Correo de confirmación enviado exitosamente con el código de reserva." });
    //     } catch (error) {
    //         console.error('Error al enviar el correo de confirmación de reserva:', error);
    //         return NextResponse.json({ ok: false, error: 'Error al enviar el correo de confirmación' }, { status: 500 });
    //     }
}
