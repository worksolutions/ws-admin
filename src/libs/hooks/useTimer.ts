import { useEffect, useRef } from "react";
import { isNil } from "ramda";

import { useForceUpdate } from "./common";

export function useTimer(data: {
  interval: number;
  initialValue: () => number;
  handler: (value: number) => number;
  finisher: (value: number) => boolean;
  onSuccess?: () => void;
}) {
  const forceUpdate = useForceUpdate();
  const timerRef = useRef<number>();
  const valueRef = useRef(0);

  function start(seconds?: number) {
    clearInterval(timerRef.current);
    valueRef.current = isNil(seconds) ? data.initialValue() : seconds;
    forceUpdate();
    timerRef.current = setInterval(() => {
      valueRef.current = data.handler(valueRef.current);
      forceUpdate();
      if (data.finisher(valueRef.current)) {
        clearInterval(timerRef.current);
        if (data.onSuccess) data.onSuccess();
      }
    }, data.interval);
  }

  function stop() {
    if (data.onSuccess) data.onSuccess();
    clearInterval(timerRef.current);
  }

  useEffect(() => {
    valueRef.current = data.initialValue();
    return () => clearInterval(timerRef.current);
  }, []);

  return {
    value: valueRef.current,
    start,
    stop,
  };
}
