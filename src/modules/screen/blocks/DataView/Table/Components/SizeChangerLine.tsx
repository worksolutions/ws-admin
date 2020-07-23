import React from "react";

import Wrapper from "primitives/Wrapper";

import { withPerformance } from "libs/CB/changeDetectionStrategy/withPerformance";
import { borderRight, display, fullHeight, position, right, top, transform, width, zIndex } from "libs/styles";
import stopPropagation from "libs/stopPropagation";

interface SizeChangerLineInterface {
  style?: Record<string, any>;
  onMouseDown?: (event: MouseEvent) => void;
  onTouchStart?: (event: MouseEvent) => void;
}

const resizeLineStyles = [
  width(10),
  fullHeight,
  display("inline-block"),
  position("absolute"),
  transform("translateX(50%)"),
  right(0),
  top(0),
  zIndex(1),
];

const stopPropagationFunc = stopPropagation();

function SizeChangerTransparentLineComponent({ style, onMouseDown, onTouchStart, ...other }: SizeChangerLineInterface) {
  return (
    <Wrapper
      style={style}
      draggable={false}
      styles={resizeLineStyles}
      role="separator"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onClick={stopPropagationFunc}
      {...other}
    />
  );
}

export const SizeChangerTransparentLine = withPerformance([
  "style",
  "onMouseDown",
  "onTouchStart",
  "onMouseEnter",
  "onMouseLeave",
])(SizeChangerTransparentLineComponent);

export const getSizeChangerLineStyles = (show: boolean) => borderRight(1, show ? "gray-blue/02" : "transparent");
