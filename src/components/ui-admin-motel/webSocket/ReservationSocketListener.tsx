'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useReservationStore } from '@/store/reservation/adminWebsocket.store';

export const ReservationSocketListener = () => {
  const { data: session, status } = useSession();
  const connectSocket = useReservationStore(state => state.connectSocket);

  useEffect(() => {
    if (status === 'authenticated' && session?.accessToken) {
      connectSocket(session.accessToken);
    }
  }, [status, session?.accessToken, connectSocket]);

  return null;
};
