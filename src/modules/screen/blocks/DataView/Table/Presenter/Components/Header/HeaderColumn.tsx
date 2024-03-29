import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";
import { useResizer } from "primitives/Resizer/useResizer";

import {
  backgroundColor,
  borderRadius,
  child,
  firstChild,
  height,
  horizontalPadding,
  lastChild,
  marginLeft,
  marginRight,
  opacity,
  padding,
  paddingLeft,
  paddingRight,
  pointer,
  position,
  textAlign,
  top,
  verticalPadding,
  width,
  zIndex,
} from "libs/styles";

import { UseSortingType } from "../../libs";
import { SizeChangerLine } from "../SizeChangerLine";
import { cellDefaultHorizontalPadding, halfOfCellDefaultHorizontalPadding } from "../../libs/paddings";

import { HeaderGroupInterface } from "./index";
import HeaderColumnText from "./HeaderColumnText";

interface HeaderColumnInterface {
  headerColumn: HeaderGroupInterface["headers"][0];
  sorting: UseSortingType;
  width: number;
  fixedSizes: boolean;
  tableHeight: number;
  zIndex: number;
}

function getCellWidth(fixedSizes: boolean, widthProp: number, minWidthValue: number | undefined) {
  if (fixedSizes) return widthProp;

  if (minWidthValue && minWidthValue > widthProp && widthProp !== 0) {
    return minWidthValue;
  }

  return widthProp;
}

function HeaderColumn({
  headerColumn,
  fixedSizes,
  sorting,
  width: widthProp,
  tableHeight,
  zIndex: zIndexProp,
}: HeaderColumnInterface) {
  const header = headerColumn.render("Header") as any;
  const tableResizerProps: any = headerColumn.getResizerProps();

  const minWidthValue = header.sizes?.minWidth;
  const resultCellWidth = getCellWidth(fixedSizes, widthProp, minWidthValue);

  const { backdropDisabler, childContentStyles, getResizingLineProps, down } = useResizer({
    minResizerWidth: minWidthValue ?? 24,
    minWidthToAutoClose: 0,
    initialWidth: resultCellWidth,
    resizeDuration: 0,
  });

  const resizerLineProps = getResizingLineProps();

  return (
    <Wrapper
      as="th"
      styles={[
        zIndex(zIndexProp),
        backgroundColor("white"),
        textAlign("left"),
        verticalPadding(12),
        horizontalPadding(halfOfCellDefaultHorizontalPadding),
        firstChild(paddingLeft(cellDefaultHorizontalPadding), "&"),
        lastChild(paddingRight(cellDefaultHorizontalPadding), "&"),
        position("sticky"),
        top(0),
        header.sortable && pointer,
        width(resultCellWidth || "initial"),
      ]}
      onClick={() => header.sortable && sorting.nextSorting(headerColumn.id)}
    >
      <HeaderColumnText
        title={header.title}
        sortable={header.sortable}
        currentSortingField={sorting.currentSortingField}
        headerColumnId={headerColumn.id}
      />
      {headerColumn.canResize && (
        <SizeChangerLine
          style={{ left: childContentStyles.width }}
          styles={[height(tableHeight), down && opacity(1)]}
          onMouseDown={(event: any) => {
            resizerLineProps.onMouseDown!(event);
            tableResizerProps.onMouseDown && tableResizerProps.onMouseDown(event);
          }}
          onTouchStart={(event: any) => {
            resizerLineProps.onTouchStart!(event);
            tableResizerProps.onTouchStart && tableResizerProps.onTouchStart(event);
          }}
        />
      )}
      {backdropDisabler}
    </Wrapper>
  );
}

export default observer(HeaderColumn);
