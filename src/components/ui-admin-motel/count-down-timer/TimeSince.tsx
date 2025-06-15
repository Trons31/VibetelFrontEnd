'use client';
import React, { useState, useEffect, useRef } from 'react';

interface Props {
  time: Date;
}

export const TimeSince = ({ time }: Props) => {
  const [timeElapsed, setTimeElapsed] = useState<{ hours: number; minutes: number; days: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const [isNow, setIsNow] = useState(true);
  const requestRef = useRef<number>();

  const calculateTimeElapsed = () => {
    const now = new Date();
    const difference = now.getTime() - time.getTime();

    if (difference <= 0) {
      // Si el tiempo es exactamente igual al actual o aún no ha pasado, muestra "Ahora mismo"
      setIsNow(true);
      return { days: 0, hours: 0, minutes: 0 };
    } else {
      setIsNow(false);
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }
  };

  const updateTimer = () => {
    setTimeElapsed(calculateTimeElapsed());
    requestRef.current = requestAnimationFrame(updateTimer);
  };

  useEffect(() => {
    setTimeElapsed(calculateTimeElapsed());
    requestRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [time,updateTimer]);

  const { days, hours, minutes } = timeElapsed;

  if (isNow) {
    return <span>Ahora mismo</span>;
  }

  return (
    <div>
      {days > 0 && <span>Hace {days}d </span>}
      {hours > 0 && <span>Hace {hours}h </span>}
      {minutes > 0 && <span>Hace {minutes}m </span>}
    </div>
  );
};
