'use server';

import { cookies } from 'next/headers';

export const setCookieCodeBookingAnonymous = async (code: string) => {
    try {
        const cookieStore = cookies(); // Obtener el store de cookies

        cookieStore.set('codeBooking', code || "", {
            httpOnly: true,                        // Cookie no accesible desde JS
            secure: true,                          // Solo enviada a través de HTTPS
            sameSite: 'strict',                    // Evitar ataques CSRF
            path: '/',
        });

        return { ok: true };  // Si no hay error, la cookie se guardó correctamente
    } catch (error) {
        console.error('Error al guardar la cookie:', error);
        return { ok: false };  // Si hay un error, la cookie no se guardó correctamente
    }
}


export const getCookieCodeBookingAnonymous = async () => {
    const cookieStore = cookies();
    const codeBooking = cookieStore.get('codeBooking');

    if (!codeBooking) {
        return null; // No hay cookie
    }

    return codeBooking.value; // Retorna el valor de la cookie
}
