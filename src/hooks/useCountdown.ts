import { useEffect, useState } from 'react';

export const useCountdown = (targetTime: string) => {
  const [left, setLeft] = useState(() => {
    const diff = new Date(targetTime).getTime() - Date.now();
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLeft(() => {
        const diff = new Date(targetTime).getTime() - Date.now();
        return diff > 0 ? diff : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return left;
};
