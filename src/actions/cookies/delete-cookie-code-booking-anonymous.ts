'use server';

import { cookies } from 'next/headers';

export const deleteCookieCodeBookingAnonymous = () => {
    const cookieStore = cookies();
    cookieStore.delete('codeBooking');
};
