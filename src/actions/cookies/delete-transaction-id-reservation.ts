'use server';

import { cookies } from 'next/headers';

export const deleteTransactionIdReservation = async () => {
    const cookieStore = cookies();
    cookieStore.delete('transactionIdReservation'); 
};
