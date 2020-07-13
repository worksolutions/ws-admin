import React from "react";
import { useMeasure } from "react-use";

import {
  border,
  child,
  flex,
  flexValue,
  flexWrap,
  marginBottom,
  marginLeft,
  marginRight,
  minWidth,
  nthChild,
  paddingRight,
  width,
} from "libs/styles";

import Wrapper from "../Wrapper";

const widthForCount: Record<number, string> = {
  1: "100%",
  2: "50%",
  3: "33.3333%",
  4: "25%",
  5: "20%",
  6: "16.6666%",
};

function getElementsCountInRow(rowWidth: number, minWidth: number) {
  const count = Math.floor(rowWidth / minWidth);
  if (count in widthForCount) return count;
  return 4;
}

interface LayoutGridInterface {
  styles?: any;
  minWidth: number;
  marginRight: number;
  marginBottom: number;
  children: React.ReactNode;
}

function LayoutGrid({
  styles,
  marginBottom: marginBottomProp,
  marginRight: marginRightProp,
  minWidth: minWidthProp,
  children,
}: LayoutGridInterface) {
  const [measureRef, measures] = useMeasure();
  const elementsCountInRow = getElementsCountInRow(measures.width, minWidthProp);
  const newWidth = widthForCount[elementsCountInRow];
  const marginHalf = marginRightProp / 2;
  return (
    <Wrapper
      ref={measureRef}
      styles={[
        flex,
        flexValue(1),
        flexWrap,
        child([
          width(`calc(${newWidth} - ${marginRightProp}px)`),
          marginBottom(marginBottomProp),
          marginLeft(marginHalf),
          marginRight(marginHalf),
        ]),
        styles,
      ]}
    >
      {children}
    </Wrapper>
  );
}

export default LayoutGrid;
