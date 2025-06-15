import { NextResponse, NextRequest } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        // Verifica si el email está registrado
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ message: 'Correo no encontrado' }, { status: 404 });
        }

        // Genera un token de restablecimiento
        const token = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiration = new Date();
        resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1); // El token expira en 1 hora

        // Guarda el token en la base de datos asociado al usuario
        await prisma.user.update({
            where: { email },
            data: {
                resetPasswordToken: token,
                resetPasswordTokenExpiration: resetTokenExpiration,
            },
        });

        // Enlace de restablecimiento de contraseña
        const resetLink = `https://vibetel.vercel.app/auth/recover-password-motel-partner/reset-password/${token}`;

        // Configuración del transporte de Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Contenido del correo en formato HTML
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: '🔒 Restablecimiento de contraseña - VibeTel',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background-color: #f8f9fa; color: #333;">
          <div style="text-align: center;">
            <h2 style="color: #dc2626;">🔑 Restablecimiento de contraseña</h2>
            <p style="font-size: 16px; color: #555;">
              Hemos recibido una solicitud para restablecer la contraseña de su cuenta en VibeTel.
            </p>
          </div>

          <div style="background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 14px; color: #555;">
              Si no ha solicitado este cambio, ignore este correo. De lo contrario, haga clic en el siguiente botón para establecer una nueva contraseña:
            </p>

            <div style="text-align: center; margin: 20px 0;">
              <a href="${resetLink}" style="background-color: #dc2626; color: #ffffff; padding: 12px 24px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
                Restablecer contraseña
              </a>
            </div>

            <p style="font-size: 14px; color: #555; text-align: center;">
              Este enlace expirará en 1 hora. Si necesita ayuda, contáctenos.
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

        return NextResponse.json({ message: 'Correo de recuperación enviado' }, { status: 200 });
    } catch (error) {
        console.error('Error al enviar el correo de recuperación:', error);
        return NextResponse.json({ message: 'Error al enviar el correo de recuperación' }, { status: 500 });
    }
}
