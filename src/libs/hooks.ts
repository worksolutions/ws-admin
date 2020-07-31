import React, { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { once } from "ramda";
import { useLocalStorage as useLocalStorageOriginal } from "react-use";

export function useBoolean(initial: boolean | (() => boolean)): [boolean, () => void, () => void] {
  const [state, setState] = useState(initial);
  return [state, () => setState(true), () => setState(false)];
}

export function useToggle(initial: boolean | (() => boolean)): [boolean, () => void] {
  const [state, setState] = useState(initial);
  return [state, () => setState(!state)];
}

export function usePromiseProcessing<T, ARG>(
  promiseFunc: (arg: ARG) => Promise<T>,
  config: {
    onSuccess?: (result: T) => void;
    onError?: (error: string) => void;
    onFinish?: () => void;
  } = {},
) {
  const [{ result, error, loading }, setPromiseInfo] = useState<{
    loading: boolean;
    error: string;
    result: T | null;
  }>({
    result: null,
    loading: false,
    error: "",
  });

  const start = (arg: ARG) => {
    setPromiseInfo({
      result: null,
      loading: true,
      error: "",
    });

    promiseFunc(arg)
      .then((data) => {
        setPromiseInfo({
          result: data,
          loading: false,
          error: "",
        });
        config.onSuccess && config.onSuccess(data);
      })
      .catch((error) => {
        setPromiseInfo({
          result: null,
          loading: false,
          error: error.errorMessage,
        });
        config.onError && config.onError(error.errorMessage);
      })
      .then(() => {
        config.onFinish && config.onFinish();
      });
  };

  return {
    result,
    loading,
    error,
    start,
  };
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

export function useDebouncedInput<T>(
  value: string,
  debounceTime: number,
  onChange: (value: string, additionalData?: T) => void,
) {
  const [inputValue, setInputValue] = useState(value);
  const { run } = useDebounce(debounceTime, onChange);

  React.useEffect(() => setInputValue(value), [value]);

  return {
    inputValue,
    clear: () => {
      setInputValue("");
      run("");
    },
    onInputChange: (value: string, additionalData?: T) => {
      setInputValue(value);
      run(value, additionalData);
    },
  };
}

export const useSetDocumentTitle = (title?: string, timeout = 0) => {
  useEffect(() => {
    if (!title) return;
    if (timeout === 0) {
      document.title = title;
      return;
    }
    setTimeout(() => (document.title = title), timeout);
  }, [title]);
};

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

export function useLocalStorage<T>(
  key: string,
  initialValue?: T | (() => T),
  options?: Parameters<typeof useLocalStorageOriginal>[2],
): [T, (arg: T) => void] {
  const [value] = React.useState(initialValue!);
  return useLocalStorageOriginal(key, value, options) as any;
}

export function useScrollCallback(callback: (y: number, x: number) => void, triggerOnElementChange = false) {
  const element = React.useRef<HTMLElement | null>();
  const run = () => {
    if (!element.current) return;
    if (triggerOnElementChange) callback(0, 0);
    element.current.addEventListener("scroll", () => {
      callback(element.current!.scrollTop, element.current!.scrollLeft);
    });
  };

  return (el: HTMLElement | null) => {
    element.current = el;
    run();
  };
}

export function useScrollCallbackWasScrolledBoolean() {
  const [scrolled, setScrolled] = React.useState(false);
  const setScrollableElement = useScrollCallback((y) => {
    if (y === 0) {
      setTimeout(setScrolled, 1, false);
      return;
    }
    if (scrolled) return;
    setTimeout(setScrolled, 1, true);
  });

  return { setScrollableElement, scrolled };
}

export function useMeasureCallback(callback: (size: DOMRectReadOnly) => void) {
  const [element, setElement] = React.useState<HTMLElement>();

  const observer = React.useMemo(() => new ResizeObserver(([entry]) => callback(entry.contentRect)), []);

  useEffectSkipFirst(() => {
    if (!element) return () => null;
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [element]);

  return setElement;
}
