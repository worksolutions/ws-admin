import React from "react";
import { useMeasure } from "react-use";

import { child, flex, flexValue, flexWrap, marginBottom, marginLeft, marginRight, marginTop, width } from "libs/styles";

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
  elementsCount: number;
  minWidth: number;
  marginRight: number;
  marginTop?: number;
  marginBottom?: number;
  children: React.ReactNode;
}

function LayoutGrid({
  styles,
  elementsCount,
  marginTop: marginTopProp,
  marginBottom: marginBottomProp,
  marginRight: marginRightProp,
  minWidth: minWidthProp,
  children,
}: LayoutGridInterface) {
  const [measureRef, measures] = useMeasure();
  const elementsCountInRow = Math.min(elementsCount, getElementsCountInRow(measures.width, minWidthProp));
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
          marginBottomProp && marginBottom(marginBottomProp),
          marginTopProp && marginTop(marginTopProp),
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
