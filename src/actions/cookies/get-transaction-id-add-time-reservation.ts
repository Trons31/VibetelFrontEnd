'use server';

import { cookies } from 'next/headers';

export const getTransactionIdAddTimeReservation = async () => {
    const cookieStore = cookies();
    const transactionId = cookieStore.get('transactionIdAddTimeReservation');

    if (!transactionId) {
        return null; // No hay cookie
    }

    return transactionId.value; // Retorna el valor de la cookie
}
