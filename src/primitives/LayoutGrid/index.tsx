import React from "react";
import { useMeasure } from "react-use";

import { child, flex, flexValue, flexWrap, marginBottom, marginLeft, marginRight, marginTop, width } from "libs/styles";

import Wrapper from "../Wrapper";

const sizeWindows = [
  { from: 0, to: 540, value: 1 },
  { from: 540, to: 768, value: 2 },
  { from: 768, to: 1024, value: 3 },
  { from: 1024, to: 1280, value: 4 },
  { from: 1280, to: 1440, value: 5 },
  { from: 1440, to: 100000000, value: 6 },
];

function getElementsCountInRow(rowWidth: number) {
  return sizeWindows.find((window) => rowWidth >= window.from && rowWidth < window.to)!.value;
}

interface LayoutGridInterface {
  className?: string;
  styles?: any;
  minWidth: number;
  marginRight: number;
  marginTop?: number;
  marginBottom?: number;
  children: React.ReactNode[];
}

const elementSizeForRowCount = ["0", "100%", "50%", "33.333%", "25%", "20%", "16.6666%"];

function LayoutGrid({
  className,
  styles,
  marginTop: marginTopProp,
  marginBottom: marginBottomProp,
  marginRight: marginRightProp,
  children,
}: LayoutGridInterface) {
  const [measureRef, measures] = useMeasure();
  const newWidth = React.useMemo(() => elementSizeForRowCount[getElementsCountInRow(measures.width)], [measures.width]);

  const marginHalf = marginRightProp / 2;

  return (
    <Wrapper
      ref={measureRef}
      className={className}
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
