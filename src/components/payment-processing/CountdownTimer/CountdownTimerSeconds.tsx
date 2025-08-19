'use client';
import { useEffect, useState } from 'react';

type Props = {
  seconds: number;
  onComplete?: () => void;
};

export const CountdownTimerSeconds = ({ seconds,onComplete }: Props) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      // Cuando llega a 0, ejecuta la acción final
      onComplete?.();
    }
  }, [timeLeft, onComplete]);

  return (
    <div>
      <h2>{timeLeft} s</h2>
    </div>
  );
};
