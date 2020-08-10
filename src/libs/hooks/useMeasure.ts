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

const emptyMeasure: DOMRectReadOnly = {
  height: 0,
  width: 0,
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  x: 0,
  y: 0,
  toJSON: () => "empty",
};

export function useMeasure(): [(element: HTMLElement) => void, DOMRectReadOnly] {
  const [measure, setMeasure] = React.useState<DOMRectReadOnly>(emptyMeasure);
  const setElement = useMeasureCallback(setMeasure);

  return [setElement, measure];
}
