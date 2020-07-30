import React from "react";
import { animated } from "react-spring";
import { duration120 } from "layout/durations";

import Wrapper from "primitives/Wrapper";

import { withPerformance } from "libs/CB/changeDetectionStrategy/withPerformance";
import {
  backgroundColor,
  cursor,
  display,
  fullHeight,
  hover,
  marginLeft,
  opacity,
  position,
  top,
  transform,
  transition,
  width,
  zIndex,
} from "libs/styles";
import stopPropagation from "libs/stopPropagation";

interface SizeChangerLineInterface {
  style?: any;
  styles?: any;
  onMouseDown?: (event: MouseEvent) => void;
  onTouchStart?: (event: MouseEvent) => void;
}

const resizeLinePlaceWidth = 20;
const resizeLineWidth = 1;

const resizeLineStyles = [
  cursor("ew-resize"),
  width(resizeLinePlaceWidth),
  display("inline-block"),
  position("absolute"),
  top(0),
  transform("translateX(-50%)"),
  zIndex(1),
  opacity(0),
  transition(`opacity ${duration120}`),
  hover(opacity(1)),
];

const stopPropagationFunc = stopPropagation();

function SizeChangerLineComponent({ style, styles, onMouseDown, onTouchStart, ...other }: SizeChangerLineInterface) {
  return (
    <Wrapper
      className="resize-line"
      style={style}
      as={animated.div}
      draggable={false}
      styles={[resizeLineStyles, styles]}
      role="separator"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onClick={stopPropagationFunc}
      {...other}
    >
      <Wrapper
        styles={[
          marginLeft(resizeLinePlaceWidth / 2 - resizeLineWidth / 2),
          width(resizeLineWidth),
          fullHeight,
          backgroundColor("blue/05"),
        ]}
      />
    </Wrapper>
  );
}

export const SizeChangerLine = withPerformance([
  "style",
  "onMouseDown",
  "onTouchStart",
  "onMouseEnter",
  "onMouseLeave",
])(SizeChangerLineComponent);
