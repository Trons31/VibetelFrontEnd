"use client"
import { useEffect } from 'react';
import { subscribeToTokenChanges } from '@/utils/reservation-events';
import { useReservationClientStore } from '@/store/reservation/clientWebsocket';

export const ResponseReservationSocketListener = () => {
  const { setToken } = useReservationClientStore();

  useEffect(() => {
    const getReservationToken = () => {
      if (typeof window !== 'undefined') {
        // 1. Intentamos obtener el token de la reserva en curso (prioridad)
        const encodedCurrentToken = localStorage.getItem('persist-token-reservation');
        if (encodedCurrentToken) {
          try {
            const decodedToken = atob(encodedCurrentToken);
            console.log("✅ Token de reserva en curso encontrado y decodificado.");
            return decodedToken;
          } catch (e) {
            console.error('❌ Error decodificando token de reserva en curso:', e);
            return encodedCurrentToken;
          }
        }

        // 2. Si no hay token de reserva en curso, buscamos el de la reserva anónima
        const encodedAnonymousToken = localStorage.getItem('persist-reservation-anonymous');
        if (encodedAnonymousToken) {
          try {
            const decodedToken = atob(encodedAnonymousToken);
            console.log("✅ Token de reserva anónima encontrado y decodificado.");
            return decodedToken;
          } catch (e) {
            console.error('❌ Error decodificando token de reserva anónima:', e);
            return encodedAnonymousToken;
          }
        }
      }
      // 3. Si no se encuentra ninguno, retornamos null
      return null;
    };

    const initialToken = getReservationToken();
    if (initialToken) {
      setToken(initialToken);
    }

    const unsubscribe = subscribeToTokenChanges((token) => {
      // Este callback se activará si el token cambia en localStorage
      setToken(token);
    });

    return () => {
      unsubscribe();
    };
  }, [setToken]);
  
  return null;
};