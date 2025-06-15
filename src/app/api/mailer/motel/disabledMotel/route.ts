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
            subject: '⚠️ Su motel ha sido desactivado en VibeTel',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background-color: #f8f9fa; color: #333;">
                    <div style="text-align: center;">
                        <h2 style="color: #dc3545;">⚠️ Importante: Su motel ha sido desactivado ⚠️</h2>
                        <p style="font-size: 16px; color: #555;">
                            Su motel ha sido desactivado y ya no está disponible en nuestra plataforma.
                        </p>
                    </div>

                    <div style="background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <p style="font-size: 14px; color: #555;">
                            Estimado(a) administrador del motel,
                        </p>
                        <p style="font-size: 14px; color: #555;">
                            Le informamos que su motel ha sido desactivado en nuestra plataforma debido a un posible incumplimiento de las normas y políticas de VibeTel.
                        </p>

                        <p style="font-size: 14px; color: #555;">
                            Como resultado, su motel no estará visible ni disponible para los usuarios y no podrá recibir reservas hasta que la situación sea regularizada.
                        </p>
                        
                        <div style="background-color: #ffe8e8; padding: 15px; border-radius: 5px; text-align: center; margin: 15px 0;">
                            <p style="font-size: 14px; color: #d9534f; margin: 0;">
                                🚨 Su motel no está en operación en la plataforma.
                            </p>
                        </div>

                        <p style="font-size: 14px; color: #555;">
                            Si cree que esta desactivación ha sido un error o desea conocer los pasos para reactivar su cuenta, por favor contáctenos lo antes posible.
                        </p>

                        <div style="text-align: center; margin: 20px 0;">
                            <a href="mailto:soporte@vibetel.com" style="background-color: #dc3545; color: #ffffff; padding: 12px 24px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
                                Contactar soporte
                            </a>
                        </div>

                        <p style="font-size: 14px; color: #555; text-align: center;">
                            Estamos aquí para ayudarle. No dude en escribirnos.
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

        return NextResponse.json({ ok: true, message: "Correo de notificación de desactivación del motel enviado correctamente" });
    } catch (error) {
        console.error('Error al enviar el correo de desactivación del motel:', error);
        return NextResponse.json({ ok: false, error: 'Error al enviar el correo de desactivación del motel' }, { status: 500 });
    }
}
