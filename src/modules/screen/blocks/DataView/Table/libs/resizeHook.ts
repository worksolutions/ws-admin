import React from "react";
import { action, observable } from "mobx";

import { htmlCollectionToArray } from "libs/htmlCollectionToArray";
import { useEffectSkipFirst } from "libs/hooks";
import isEqual from "libs/CB/changeDetectionStrategy/performance/isEqual";

class Storage {
  @observable
  values: Record<string, number[] | null> = {};

  @action.bound
  set(key: string, value: number[] | null) {
    if (isEqual(value, this.values[key])) return;
    localStorage.setItem(key, JSON.stringify(value));
    this.values[key] = value;
  }

  get(key: string) {
    return this.values[key];
  }

  @action.bound
  initialize(key: string) {
    const value = localStorage.getItem(key);
    if (!value) return;
    try {
      const parsedValue = JSON.parse(value);
      if (!Array.isArray(parsedValue)) return;
      this.set(key, parsedValue);
    } catch (e) {}
  }
}

const storageInstance = new Storage();

export function useResizeTableHead(id: string, cells: { isResizing: boolean }[]) {
  const savedWidths = storageInstance.get(id);

  function getInitialHeaderWidths(savedWidths: number[] | null) {
    if (savedWidths) return cells.map((_, index) => savedWidths[index]);
    return new Array(cells.length).fill(0);
  }

  const [headerWidths, setHeaderWidths] = React.useState<number[]>([]);
  React.useEffect(() => {
    storageInstance.initialize(id);
    const savedValue = storageInstance.get(id);
    setHeaderWidths(getInitialHeaderWidths(savedValue));
  }, []);

  const headerRef = React.useRef<HTMLElement>();

  const isResize = !!cells.find((cell) => cell.isResizing);

  function calculateWidths() {
    return htmlCollectionToArray(headerRef.current!.children).map((element) => element.getBoundingClientRect().width);
  }

  useEffectSkipFirst(() => {
    const widths = calculateWidths();
    setHeaderWidths(widths);
  }, [isResize]);

  useEffectSkipFirst(() => {
    if (!isResize) return;
    setTimeout(() => {
      const widths = calculateWidths();
      storageInstance.set(id, widths);
    }, 1);
  });

  return {
    headerRef,
    fixedSizes: !!savedWidths,
    headerWidths: headerWidths,
  };
}

export function useResizeTableContent(id: string) {
  const savedWidths = storageInstance.get(id);
  return {
    fixedSizes: !!savedWidths,
    contentWidths: savedWidths,
  };
}
