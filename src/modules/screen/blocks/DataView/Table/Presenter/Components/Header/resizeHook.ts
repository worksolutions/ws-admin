import React from "react";
import { action, observable } from "mobx";

import { htmlCollectionToArray } from "libs/htmlCollectionToArray";
import isEqual from "libs/CB/changeDetectionStrategy/performance/isEqual";
import { useEffectSkipFirst, usePrevious } from "libs/hooks/common";

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

function calculateHeaderWidths(headerTR: HTMLElement) {
  return htmlCollectionToArray(headerTR.children)
    .slice(1, -1)
    .map((element) => element.getBoundingClientRect().width);
}

export function useResizeTableMain(id: string, cells: { isResizing: boolean }[], ignoreStartCellsCount = 0) {
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
    const timeout = setTimeout(() => {
      setHeaderWidths(calculateHeaderWidths(headerRef.current!));
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffectSkipFirst(() => {
    if (resizeColumnIndex !== -1) return;
    const [resizeLine] = htmlCollectionToArray(
      headerRef.current!.children[previousResizeColumnIndex + ignoreStartCellsCount].getElementsByClassName(
        "resize-line",
      ),
    );
    const widths = calculateHeaderWidths(headerRef.current!);
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
