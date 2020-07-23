import React, { useEffect } from "react";
import { useHover } from "react-use";
import { animated, to } from "react-spring";

import Wrapper from "primitives/Wrapper";
import { useResizer } from "primitives/Resizer/useResizer";

import { padding, pointer, position, textAlign } from "libs/styles";

import { UseSortingType } from "../../libs";
import { getSizeChangerLineStyles, SizeChangerTransparentLine } from "../SizeChangerLine";

import { HeaderGroupInterface } from "./index";
import HeaderColumnText from "./HeaderColumnText";

interface HeaderColumnInterface {
  headerColumn: HeaderGroupInterface["headers"][0];
  sorting: UseSortingType;
  width: number;
  fixedSizes: boolean;
  onResizeHover: (hovered: boolean) => void;
}

function HeaderColumn({ headerColumn, fixedSizes, sorting, width: widthProp, onResizeHover }: HeaderColumnInterface) {
  const header = headerColumn.render("Header") as any;
  const tableResizerProps: any = headerColumn.getResizerProps();

  const { backdropDisabler, childContentStyles, getResizingLineProps } = useResizer({
    minResizerWidth: 24,
    minWidthToAutoClose: 0,
    initialWidth: widthProp || 1,
  });

  const [hoverable, hovered] = useHover(() => {
    const resizerLineProps = getResizingLineProps();
    return (
      <SizeChangerTransparentLine
        style={tableResizerProps.style}
        onMouseDown={(event: any) => {
          resizerLineProps.onMouseDown!(event);
          tableResizerProps.onMouseDown && tableResizerProps.onMouseDown(event);
        }}
        onTouchStart={(event: any) => {
          resizerLineProps.onTouchStart!(event);
          tableResizerProps.onTouchStart && tableResizerProps.onTouchStart(event);
        }}
      />
    );
  });

  useEffect(() => {
    onResizeHover(hovered || headerColumn.isResizing);
  }, [hovered, headerColumn.isResizing]);

  return (
    <Wrapper
      as={animated.th}
      style={{ width: fixedSizes ? childContentStyles.width : undefined }}
      styles={[
        textAlign("left"),
        padding("12px 16px"),
        position("relative"),
        header.sortable && pointer,
        getSizeChangerLineStyles(hovered || headerColumn.isResizing),
      ]}
      onClick={() => header.sortable && sorting.nextSorting(headerColumn.id)}
    >
      <HeaderColumnText
        title={header.title}
        sortable={header.sortable}
        currentSortingField={sorting.currentSortingField}
        headerColumnId={headerColumn.id}
      />
      {headerColumn.canResize && hoverable}
      {backdropDisabler}
    </Wrapper>
  );
}

export default HeaderColumn;
