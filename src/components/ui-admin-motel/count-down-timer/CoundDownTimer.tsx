"use client";
import React, { useState, useEffect } from "react";

interface Props {
  time: Date;
  className?: string;
}

export const CountdownTimer = ({ time, className }: Props) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const targetTime = time.getTime();
    const difference = targetTime - now;

    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return { hours, minutes, seconds };
    }
    return null;
  };

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft());
    };

    updateTimer(); // Primera actualización inmediata

    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [time]); // Solo dependemos de "time"

  if (!timeLeft) {
    return <span className={className}>¡Tiempo completado!</span>;
  }

  const { hours, minutes, seconds } = timeLeft;

  return (
    <div className={className}>
      {hours > 0 && <span>{hours}h </span>}
      {(hours > 0 || minutes > 0) && <span>{minutes}m </span>}
      <span>{seconds}s</span>
    </div>
  );
};
