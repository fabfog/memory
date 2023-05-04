import { useCallback, useMemo, useState } from "react";
import { useInterval } from "react-use";

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(-1);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      setTimeLeft((time) => Math.max(time - 1, 0));
    },
    isRunning ? 1000 : null
  );

  const start = useCallback((seconds: number) => {
    setTimeLeft(seconds);
    setIsRunning(true);
  }, []);

  return useMemo(
    () => ({
      start,
      timeLeft,
      isRunning,
    }),
    [timeLeft, isRunning, start]
  );
}
