import React, { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { once } from "ramda";

export function useBoolean(initial: boolean | (() => boolean)): [boolean, () => void, () => void] {
  const [state, setState] = useState(initial);
  return [state, () => setState(true), () => setState(false)];
}

export function useToggle(initial: boolean | (() => boolean)): [boolean, () => void] {
  const [state, setState] = useState(initial);
  return [state, () => setState(!state)];
}

export const useOnce = (cb: (data?: any) => any, delay = 0) => {
  const [func] = useState(() => once(delay ? (data?: any) => setTimeout(() => cb(data), delay) : cb));
  return func;
};

export function useForceUpdate() {
  const [, updateState] = useState();
  return useCallback(() => updateState({}), []);
}

export function useDebounce(debounceTime: number, callback: (...args: any[]) => void) {
  const debounceRef = useRef<ReturnType<typeof debounce>>(null!);
  useEffect(() => {
    debounceRef.current = debounce(callback, debounceTime);
    return () => debounceRef.current.cancel();
  }, [callback]);

  return { run: (...args: any) => debounceRef.current(...args), debounceRef };
}

export const useEffectSkipFirst = (callback: React.EffectCallback, dependencies?: any[]) => {
  const wasChanged = useRef(false);

  useEffect(function () {
    if (wasChanged.current) {
      callback();
      return;
    }
    wasChanged.current = true;
  }, dependencies);
};

export function usePrevious<T>(value: T) {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
