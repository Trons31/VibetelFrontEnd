import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { mail, message } = await request.json();

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
            subject: '🚨 Corrección requerida: Información inválida en su registro de motel',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background-color: #f8f9fa; color: #333;">
                    <div style="text-align: center;">
                        <h2 style="color: #d97706;">⚠️ Información inválida en su registro ⚠️</h2>
                        <p style="font-size: 16px; color: #555;">
                            Hemos encontrado errores en la información proporcionada para la activación de su motel.
                        </p>
                    </div>

                    <div style="background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <p style="font-size: 14px; color: #555;">
                            Estimado(a) administrador del motel,
                        </p>
                        <p style="font-size: 14px; color: #555;">
                            Durante el proceso de registro y validación de su motel en VibeTel, hemos detectado que algunos de los datos proporcionados no son válidos o contienen errores.
                        </p>

                        <p style="font-size: 14px; color: #555;">
                            Para continuar con la activación, es necesario que revise y corrija la información lo antes posible.
                        </p>
                        
                        <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; text-align: center; margin: 15px 0;">
                            <p style="font-size: 14px; color: #856404; margin: 0;">
                                📌 Su motel aún no ha sido activado debido a errores en la información proporcionada.
                            </p>
                        </div>

                        <div style="background-color: #fef2f2; padding: 15px; border-radius: 5px; border-left: 5px solid #dc2626; margin: 15px 0;">
                            <p style="font-size: 14px; color: #b91c1c; font-weight: bold; margin: 0;">🔍 Detalles a corregir:</p>
                            <p style="font-size: 14px; color: #b91c1c; margin: 5px 0;">${message}</p>
                        </div>

                        <p style="font-size: 14px; color: #555;">
                            Por favor, acceda a su cuenta y verifique los datos ingresados en la configuración del motel.
                        </p>

                        <div style="text-align: center; margin: 20px 0;">
                            <a href="https://vibetel.vercel.app/admin/dashboard-partner-motel" style="background-color: #f59e0b; color: #ffffff; padding: 12px 24px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
                                Corregir información
                            </a>
                        </div>

                        <p style="font-size: 14px; color: #555; text-align: center;">
                            Si necesita ayuda, no dude en contactarnos.
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

        return NextResponse.json({ ok: true, message: "Correo de corrección de información enviado correctamente" });
    } catch (error) {
        console.error('Error al enviar el correo de corrección de información:', error);
        return NextResponse.json({ ok: false, error: 'Error al enviar el correo de corrección de información' }, { status: 500 });
    }
}
