"use client"
import { useEffect } from 'react';
import { useReservationStatusStore } from '@/store/reservation/reservation-status';
import { subscribeToTokenChanges } from '@/utils/reservation-events';


export const ResponseReservationSocketListener = () => {
  const { setToken } = useReservationStatusStore();

  useEffect(() => {
    const getReservationToken = () => {
      if (typeof window !== 'undefined') {
        const encodedToken = localStorage.getItem('persist-token-reservation');
        if (encodedToken) {
          try {
            return atob(encodedToken);
          } catch (e) {
            console.error('Error decoding token:', e); // Mensaje más descriptivo
            return encodedToken;
          }
        }
      }
      return null;
    };

    const initialToken = getReservationToken();
    if (initialToken) {
      setToken(initialToken);
    }

    const unsubscribe = subscribeToTokenChanges((token) => {
      // setToken ya maneja la conexión/desconexión y evita conexiones duplicadas para el mismo token
      setToken(token);
    });

    return () => {
      unsubscribe();
    };
  }, [setToken]); // setToken es una dependencia del useEffect
  return null;
};