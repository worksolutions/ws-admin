import React from "react";

import { htmlCollectionToArray } from "libs/htmlCollectionToArray";

const defaultTimeout = 400;

export function useChildrenWidthDetector(timeout = defaultTimeout) {
  const [ref, setRef] = React.useState<HTMLElement>();
  const [widths, setWidth] = React.useState<number[] | null>(null);
  React.useLayoutEffect(() => {
    if (!ref) return;
    setTimeout(
      () => setWidth(htmlCollectionToArray(ref.children).map((element) => element.getBoundingClientRect().width)),
      timeout,
    );
  }, [ref]);

  return {
    ref: setRef,
    widths,
  };
}
