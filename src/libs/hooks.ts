import React, { useState, useCallback, useRef, useEffect } from "react";
import debounce from "lodash/debounce";
import queryString from "query-string";
import { once, is } from "ramda";

export function useToggle(initial: boolean): [boolean, (data?) => void] {
  const [toggle, setToggle] = useState(initial);
  return [
    toggle,
    (value: boolean) => {
      if (!is(Boolean, value)) {
        return setToggle(!toggle);
      }
      setToggle(value);
    },
  ];
}

export function useBoolean(
  initial: boolean | (() => boolean),
): [boolean, () => void, () => void] {
  const [state, setState] = useState(initial);
  return [state, () => setState(true), () => setState(false)];
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
  const [func] = useState(() =>
    once(delay ? (data?: any) => setTimeout(() => cb(data), delay) : cb),
  );
  return func;
};

export function useForceUpdate() {
  const [, updateState] = useState();
  return useCallback(() => updateState({}), []);
}

export function useDebouncedInput<T>(
  value: string,
  debounceTime: number,
  onChange: (value: string, additionalData?: T) => void,
  charCountThreshold = 3,
) {
  const [inputValue, setInputValue] = useState(value);
  const debounceRef = useRef<ReturnType<typeof debounce>>();
  useEffect(() => {
    debounceRef.current = debounce(onChange, debounceTime);
    return () => debounceRef.current.cancel();
  }, [debounceTime, onChange]);

  React.useEffect(() => setInputValue(value), [value]);

  return {
    inputValue,
    clear: () => {
      setInputValue("");
      debounceRef.current("");
    },
    onInputChange: (value, additionalData?: T) => {
      setInputValue(value);
      if (value.length >= charCountThreshold || value.length === 0)
        debounceRef.current(value, additionalData);
    },
  };
}

export const useTabRouter = <TABS, RESULT extends TABS[keyof TABS]>(
  query: string,
  initialTab: string,
  tabs: TABS,
): {
  currentTab: string;
  TabComponent: RESULT;
  setCurrentTab: (tab: string) => void;
} => {
  const [currentTab, setCurrentTab] = useState<string>("");
  const searchParams = queryString.parse(query);
  useEffect(() => {
    if (!searchParams.tab) {
      setCurrentTab(initialTab);
      return;
    }
    setCurrentTab(searchParams.tab as string);
  }, [initialTab, searchParams.tab]);

  return {
    currentTab,
    setCurrentTab,
    TabComponent: tabs[currentTab] || (() => null),
  };
};

export const useSetDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export const useEffectSkipFirst = (
  callback: React.EffectCallback,
  dependencies: any[],
) => {
  const wasChanged = useRef(false);

  useEffect(function () {
    if (wasChanged.current) {
      callback();
      return;
    }
    wasChanged.current = true;
    // eslint-disable-next-line
  }, dependencies);
};
