import React from "react";
import { useMeasure } from "react-use";

import {
  child,
  flex,
  flexValue,
  flexWrap,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  nthChild,
  width,
} from "libs/styles";

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
  eachChildStyles?: any;
  minWidth: number;
  marginBetweenElements: number;
  children: React.ReactNode[];
}

const elementSizeForRowCount = ["0", "100%", "50%", "33.333%", "25%", "20%", "16.6666%"];

function LayoutGrid({ className, styles, marginBetweenElements, eachChildStyles, children }: LayoutGridInterface) {
  const [measureRef, measures] = useMeasure();

  const { elementsCountInRow, width: newWidth } = React.useMemo(() => {
    const elementsCountInRow = getElementsCountInRow(measures.width);
    return { elementsCountInRow, width: elementSizeForRowCount[elementsCountInRow] };
  }, [measures.width]);

  const halfMarginBetweenElements = marginBetweenElements / 2;

  return (
    <Wrapper
      ref={measureRef}
      className={className}
      styles={[
        flex,
        flexValue(1),
        flexWrap,
        child([
          width(`calc(${newWidth} - ${marginBetweenElements}px + ${marginBetweenElements}px / ${elementsCountInRow})`),
          marginLeft(halfMarginBetweenElements),
          marginRight(halfMarginBetweenElements),
          eachChildStyles,
        ]),
        nthChild(`${elementsCountInRow}n + 1`, marginLeft(0)),
        nthChild(`${elementsCountInRow}n`, marginRight(0)),
        styles,
      ]}
    >
      {children}
    </Wrapper>
  );
}

export default LayoutGrid;
