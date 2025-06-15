'use client';
import { useEffect, useState } from 'react';

type Props = {
  seconds: number; 
};

export const CountdownTimerSeconds = ({ seconds }:Props) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId); 
    }
  }, [timeLeft]);

  return (
    <div>
      <h2>{timeLeft} s</h2>
    </div>
  );
};
