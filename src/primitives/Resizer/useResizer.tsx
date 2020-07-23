import { useLocalStorage } from "react-use";
import React from "react";
import { useGesture } from "react-with-gesture";
import { useSpring } from "react-spring";

import BackdropDisabler from "primitives/BackdropDisabler";

import { useEffectSkipFirst } from "libs/hooks";
import { cursor } from "libs/styles";

function calculateStyleParams(
  down: boolean,
  data: { delta: number[]; currentWidth: number; minWidthToAutoClose: number; minResizerWidth: number },
) {
  const newWidth = down ? data.delta[0] + data.currentWidth : data.currentWidth;
  const childWidth = Math.max(data.minResizerWidth, newWidth);
  const childOpacity = childWidth < data.minWidthToAutoClose ? 0 : 1;

  return { newWidth, child: { childWidth, childOpacity } };
}

export interface UseResizerOptions {
  localStorageKey?: string;
  initialWidth: number;
  minWidthToAutoClose: number;
  minResizerWidth: number;
}

export function useResizer({ localStorageKey, initialWidth, minWidthToAutoClose, minResizerWidth }: UseResizerOptions) {
  const [currentWidth, setCurrentWidth] = localStorageKey
    ? useLocalStorage(localStorageKey, initialWidth)
    : React.useState(initialWidth);

  useEffectSkipFirst(() => {
    setCurrentWidth(initialWidth);
  }, [initialWidth]);

  const [bind, { delta, down }] = useGesture();
  const styleParams = calculateStyleParams(down, {
    currentWidth: currentWidth!,
    delta,
    minWidthToAutoClose,
    minResizerWidth,
  }).child;

  const { childWidth, childOpacity } = useSpring({
    config: { duration: 1 },
    ...styleParams,
  });

  React.useEffect(() => {
    if (down) return;
    const { newWidth, child } = calculateStyleParams(true, {
      currentWidth: currentWidth!,
      delta,
      minWidthToAutoClose,
      minResizerWidth,
    });
    setCurrentWidth(child.childOpacity === 1 ? newWidth : minResizerWidth);
  }, [down]);

  function showClosedContent() {
    setCurrentWidth(initialWidth);
  }

  return {
    getResizingLineProps: bind,
    styleParams,
    childContentStyles: { width: childWidth, opacity: childOpacity },
    down,
    showClosedContent,
    backdropDisabler: down && <BackdropDisabler styles={cursor("ew-resize")} />,
  };
}
