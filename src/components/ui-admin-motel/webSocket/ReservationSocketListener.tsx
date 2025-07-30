'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useReservationStore } from '@/store/reservation/reservation.store';

export const ReservationSocketListener = () => {
  const { data: session, status } = useSession();
  const connectSocket = useReservationStore(state => state.connectSocket);
  const isConnected = useReservationStore(state => state.isConnected);

  useEffect(() => {
    if (status === 'authenticated' && session?.accessToken) {
      connectSocket(session.accessToken);
    }
  }, [status, session?.accessToken, connectSocket]);

  useEffect(() => {
    if (isConnected) {
      console.log('✅ WebSocket conectado');
    } else {
      console.log('🔴 WebSocket no conectado');
    }
  }, [isConnected]);

  return null;
};
