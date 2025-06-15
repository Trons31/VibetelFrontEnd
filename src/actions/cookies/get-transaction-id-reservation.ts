'use server';

import { cookies } from 'next/headers';

export const getTransactionIdReservation = async () => {
    const cookieStore = cookies();
    const transactionId = cookieStore.get('transactionIdReservation');

    if (!transactionId) {
        return null; // No hay cookie
    }

    return transactionId.value; // Retorna el valor de la cookie
}
