import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { mail } = await request.json();

        // Configuración del transporte de Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Tu email
                pass: process.env.EMAIL_PASSWORD, // Tu contraseña
            },
        });

        // Contenido del correo en formato HTML
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: mail, // Correo del motel
            subject: '¡Su motel ha sido aprobado y está listo para operar!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background-color: #f8f9fa; color: #333;">
                    <div style="text-align: center;">
                        <h2 style="color: #28a745;">🎉 ¡Felicidades! 🎉</h2>
                        <p style="font-size: 16px;">Su motel ha sido aprobado y ya está activo en nuestra plataforma.</p>
                    </div>

                    <div style="background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <p style="font-size: 14px; color: #555;">
                            Estimado(a) administrador del motel,
                        </p>
                        <p style="font-size: 14px; color: #555;">
                            Nos complace informarle que hemos revisado y aprobado su información. Ahora su motel está listo para recibir reservas y comenzar a operar en nuestra plataforma.
                        </p>
                        
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="https://vibetel.vercel.app/auth/partner" style="background-color: #28a745; color: #ffffff; padding: 12px 24px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
                                Acceder a la plataforma
                            </a>
                        </div>

                        <p style="font-size: 14px; color: #555; text-align: center;">
                            Si tiene alguna duda o necesita asistencia, no dude en contactarnos.
                        </p>
                    </div>

                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

                    <p style="font-size: 12px; color: #aaa; text-align: center;">
                        © 2024 VibeTel. Todos los derechos reservados.<br>
                        <a href="https://vibetel.vercel.app" style="color: #007BFF; text-decoration: none;">Visite nuestro sitio web</a>
                    </p>
                </div>
            `,
        };

        // Enviar correo
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ ok: true, message: "Correo de notificación de aprobación del motel enviado correctamente" });
    } catch (error) {
        console.error('Error al enviar el correo de aprobación del motel:', error);
        return NextResponse.json({ ok: false, error: 'Error al enviar el correo de aprobación del motel' }, { status: 500 });
    }
}
