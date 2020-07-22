import React, { useEffect } from "react";
import { useHover } from "react-use";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Icon from "primitives/Icon";
import BackdropDisabler from "primitives/BackdropDisabler";

import {
  borderRight,
  display,
  flex,
  fullHeight,
  left,
  padding,
  pointer,
  position,
  right,
  textAlign,
  top,
  transform,
  transition,
  width,
  zIndex,
} from "libs/styles";
import stopPropagation from "libs/stopPropagation";

import { UseSortingType } from "../../libs";

import { HeaderGroupInterface } from "./index";

import { SortingDirection } from "types/Sorting";

function HeaderColumn({
  headerColumn,
  sorting,
  onResize,
}: {
  headerColumn: HeaderGroupInterface["headers"][0];
  sorting: UseSortingType;
  onResize: (hovered: boolean) => void;
}) {
  const { key, ...props } = headerColumn.getHeaderProps();
  const header = headerColumn.render("Header") as any;
  const resizerProps = headerColumn.getResizerProps();
  const [hoverable, hovered] = useHover(() => (
    <Wrapper
      styles={[
        width(10),
        fullHeight,
        display("inline-block"),
        position("absolute"),
        transform("translateX(50%)"),
        right(0),
        top(0),
        zIndex(1),
      ]}
      {...resizerProps}
      onClick={stopPropagation()}
    />
  ));

  useEffect(() => {
    onResize(hovered || headerColumn.isResizing);
  }, [hovered, headerColumn.isResizing]);

  return (
    <Wrapper
      as="th"
      key={key}
      {...props}
      styles={[
        textAlign("left"),
        padding("12px 16px"),
        header.sortable && pointer,
        position("relative"),
        borderRight(1, hovered || headerColumn.isResizing ? "gray-blue/02" : "transparent"),
      ]}
      onClick={() => header.sortable && sorting.nextSorting(headerColumn.id)}
    >
      <Typography type="caption-semi-bold" color="gray-blue/05" styles={position("relative")}>
        {header.title}
        {header.sortable && sorting.currentSortingField && sorting.currentSortingField.field === headerColumn.id && (
          <Wrapper
            styles={[
              transition("transform 0.2s"),
              position("absolute"),
              top("50%"),
              left("100%"),
              fullHeight,
              transform(
                `translateY(-50%) ${
                  sorting.currentSortingField.type === SortingDirection.DESC ? "rotateZ(180deg)" : "rotateZ(0deg)"
                }`,
              ),
            ]}
          >
            <Icon iconName="16-triangle-down-alt" width={16} height={16} />
          </Wrapper>
        )}
      </Typography>
      {headerColumn.canResize && hoverable}
      {headerColumn.isResizing && <BackdropDisabler />}
    </Wrapper>
  );
}

export default HeaderColumn;
