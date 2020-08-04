import { useLocalStorage } from "react-use";
import React from "react";
import { useGesture } from "react-with-gesture";
import { useSpring } from "react-spring";

import BackdropDisabler from "primitives/BackdropDisabler";

import { cursor } from "libs/styles";
import { useEffectSkipFirst, usePrevious } from "libs/hooks/common";

function calculateStyleParams(
  down: boolean,
  data: { delta: number[]; currentWidth: number; minWidthToAutoClose: number; minResizerWidth: number },
) {
  const childWidth = Math.max(data.minResizerWidth, down ? data.delta[0] + data.currentWidth : data.currentWidth);
  const childOpacity = childWidth < data.minWidthToAutoClose ? 0 : 1;
  return { childWidth, childOpacity };
}

export interface UseResizerOptions {
  localStorageKey?: string;
  initialWidth: number;
  minWidthToAutoClose: number;
  minResizerWidth: number;
  opacityDuration?: number;
  resizeDuration?: number;
}

export function useResizer({
  localStorageKey,
  initialWidth,
  minWidthToAutoClose,
  minResizerWidth,
  opacityDuration = 200,
  resizeDuration = 100,
}: UseResizerOptions) {
  const [currentWidth, setCurrentWidth] = localStorageKey
    ? useLocalStorage(localStorageKey, initialWidth)
    : React.useState(initialWidth);

  useEffectSkipFirst(() => {
    setCurrentWidth(initialWidth);
  }, [initialWidth]);

  const [bind, { delta, down }] = useGesture();

  const prevDown = usePrevious(down);

  const styleParams = calculateStyleParams(prevDown, {
    currentWidth: currentWidth!,
    delta,
    minWidthToAutoClose,
    minResizerWidth,
  });

  const { childWidth } = useSpring({
    config: { duration: resizeDuration },
    childWidth: styleParams.childWidth,
  });

  const { childOpacity } = useSpring({
    config: { duration: opacityDuration },
    childOpacity: styleParams.childOpacity,
  });

  React.useEffect(() => {
    if (down) return;
    const { childWidth, childOpacity } = calculateStyleParams(true, {
      currentWidth: currentWidth!,
      delta,
      minWidthToAutoClose,
      minResizerWidth,
    });
    setCurrentWidth(childOpacity === 1 ? childWidth : minResizerWidth);
  }, [down]);

  function showContent() {
    setCurrentWidth(initialWidth);
  }

  function hideContent() {
    setCurrentWidth(minResizerWidth);
  }

  return {
    getResizingLineProps: bind,
    styleParams,
    childContentStyles: { width: childWidth, opacity: childOpacity },
    down,
    contentIsClosed: currentWidth === minResizerWidth,
    showContent,
    hideContent,
    backdropDisabler: down && <BackdropDisabler styles={cursor("ew-resize")} />,
  };
}
