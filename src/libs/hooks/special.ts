import React, { useEffect } from "react";
import { useLocalStorage as useLocalStorageOriginal } from "react-use";

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

export function useLocalStorage<T>(
  key: string,
  initialValue?: T | (() => T),
  options?: Parameters<typeof useLocalStorageOriginal>[2],
): [T, (arg: T) => void] {
  const [value] = React.useState(initialValue!);
  return useLocalStorageOriginal(key, value, options) as any;
}
