// components/TimeRemaining.tsx
'use client';
import { useEffect, useState } from 'react';

interface TimeRemainingProps {
  finalDate: string;
}

const calculateTimeRemaining = (finalDate: string) => {
  const auctionEndTime = new Date(finalDate).getTime();
  const now = Date.now();
  return Math.max(0, auctionEndTime - now);
};

const formatTimeRemaining = (ms: number) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const TimeRemaining: React.FC<TimeRemainingProps> = ({ finalDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(finalDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="block text-lg font-bold text-white">
      Tiempo restante: {formatTimeRemaining(timeRemaining)}
    </span>
  );
};

export default TimeRemaining;
