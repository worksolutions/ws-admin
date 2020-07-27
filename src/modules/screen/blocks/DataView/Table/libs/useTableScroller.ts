import React, { MutableRefObject } from "react";
import throttle from "lodash/throttle";

export function useTableScroller(enabled: boolean, ref: MutableRefObject<HTMLElement | undefined>) {
  React.useEffect(() => {
    if (!ref.current) return;
    if (!enabled) return;
    const el = ref.current;
    const header = el.getElementsByTagName("thead")[0];
    header.style.position = "absolute";
    ref.current!.addEventListener(
      "scroll",
      throttle(
        () => {
          header.style.left = -el.scrollLeft + "px";
        },
        10,
        { trailing: true },
      ),
    );
  }, [enabled]);

  return ref;
}
