import React from "react";

import { useEffectSkipFirst } from "./common";

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
