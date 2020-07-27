import React from "react";
import { action, observable } from "mobx";

import { htmlCollectionToArray } from "libs/htmlCollectionToArray";
import { useEffectSkipFirst, usePrevious } from "libs/hooks";
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

function calculateWidths(parent: HTMLElement) {
  return htmlCollectionToArray(parent.children).map((element) => element.getBoundingClientRect().width);
}

export function useResizeTableHead(id: string, cells: { isResizing: boolean }[]) {
  const savedWidths = storageInstance.get(id);
  const resizeColumnIndex = cells.findIndex((cell) => cell.isResizing);
  const previousResizeColumnIndex = usePrevious(resizeColumnIndex);
  const headerRef = React.useRef<HTMLElement>();

  const [headerWidths, setHeaderWidths] = React.useState(() => new Array(cells.length).fill(0));

  React.useEffect(() => {
    storageInstance.initialize(id);
    const savedWidths = storageInstance.get(id);
    if (savedWidths) {
      setHeaderWidths(savedWidths);
      return;
    }
    setTimeout(() => {
      setHeaderWidths(calculateWidths(headerRef.current!));
    }, 100);
  }, []);

  useEffectSkipFirst(() => {
    if (resizeColumnIndex !== -1) return;
    const [resizeLine] = htmlCollectionToArray(
      headerRef.current!.children[previousResizeColumnIndex].getElementsByClassName("resize-line"),
    );
    const widths = calculateWidths(headerRef.current!);
    widths[previousResizeColumnIndex] = parseFloat(resizeLine.style.left);
    setHeaderWidths(widths);
    storageInstance.set(id, widths);
  }, [resizeColumnIndex]);

  return {
    headerRef,
    fixedSizes: !!savedWidths,
    headerWidths,
  };
}

export function useResizeTableContent(id: string) {
  const savedWidths = storageInstance.get(id);
  return {
    fixedSizes: !!savedWidths,
    contentWidths: savedWidths,
  };
}
