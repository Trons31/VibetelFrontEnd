'use client';

import { useEffect, useState } from 'react';
import { AddToReservationDeskTop } from './AddToReservationDeskTop';
import { RoomApi } from '@/interfaces';

interface Props {
  room: RoomApi;
  MotelConfig: any;
}

export const ConditionalDesktopAddToReservation = ({ room, MotelConfig }: Props) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    checkIsDesktop(); // initial check

    window.addEventListener('resize', checkIsDesktop);

    return () => {
      window.removeEventListener('resize', checkIsDesktop);
    };
  }, []);

  if (!isDesktop) return null;

  return <AddToReservationDeskTop room={room} MotelConfig={MotelConfig} />;
};
