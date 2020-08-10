import React from "react";
import { sum } from "ramda";

import Wrapper from "primitives/Wrapper";

import {
  backgroundColor,
  borderRadius,
  boxShadow,
  createAlphaColor,
  fullHeight,
  height,
  left,
  marginBottom,
  marginLeft,
  marginTop,
  position,
  transition,
  width,
} from "libs/styles";

interface ActiveBackplateInterface {
  activeIndex: number;
  activeIndexInWidthsArray: number;
  widths: number[] | null;
}

function getLeft(widths: number[], index: number) {
  return sum(widths.slice(0, index));
}

function ActiveBackplate({ activeIndex, activeIndexInWidthsArray, widths }: ActiveBackplateInterface) {
  if (!widths) return null;
  if (activeIndex === -1) return null;
  return (
    <Wrapper
      styles={[
        marginLeft(1),
        transition("left 0.2s, width 0.2s"),
        position("absolute"),
        width(widths[activeIndexInWidthsArray]),
        left(getLeft(widths, activeIndexInWidthsArray)),
        height("calc(100% - 2px)"),
        borderRadius(50),
        backgroundColor("white"),
        boxShadow([0, 0, 1, 0, "gray-blue/03"], [0, 2, 8, 0, createAlphaColor("black", 41)]),
      ]}
    />
  );
}

export default React.memo(ActiveBackplate);
