'use client';

import { useEffect, useState } from 'react';
import { AddToReservationMovil } from './AddToReservationMovil';
import { RoomApi } from '@/interfaces';

interface Props {
  room: RoomApi;
  MotelConfig: any;
}

export const ConditionalMobileAddToReservation = ({ room, MotelConfig }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile(); // initial check

    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  if (!isMobile) return null;

  return <AddToReservationMovil room={room} MotelConfig={MotelConfig} />;
};
