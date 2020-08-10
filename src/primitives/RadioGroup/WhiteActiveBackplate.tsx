import React from "react";
import { sum } from "ramda";

import Wrapper from "primitives/Wrapper";

import {
  backgroundColor,
  borderRadius,
  boxShadow,
  createAlphaColor,
  fullHeight,
  left,
  position,
  transition,
  width,
} from "libs/styles";

interface WhiteActiveBackplateInterface {
  activeIndex: number;
  activeIndexInWidthsArray: number;
  widths: number[] | null;
}

function getLeft(widths: number[], index: number) {
  return sum(widths.slice(0, index));
}

function WhiteActiveBackplate({ activeIndex, activeIndexInWidthsArray, widths }: WhiteActiveBackplateInterface) {
  if (!widths) return null;
  if (activeIndex === -1) return null;
  return (
    <Wrapper
      styles={[
        transition("left 0.2s, width 0.2s"),
        position("absolute"),
        width(widths[activeIndexInWidthsArray]),
        left(getLeft(widths, activeIndexInWidthsArray)),
        fullHeight,
        borderRadius(50),
        backgroundColor("white"),
        boxShadow([0, 0, 1, 0, "gray-blue/03"], [0, 2, 8, 0, createAlphaColor("black", 41)]),
      ]}
    />
  );
}

export default React.memo(WhiteActiveBackplate);
