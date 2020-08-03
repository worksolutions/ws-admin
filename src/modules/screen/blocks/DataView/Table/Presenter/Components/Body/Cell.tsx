import React from "react";
import { TableCellProps } from "react-table";
import { duration200 } from "layout/durations";

import Wrapper from "primitives/Wrapper";
import { TypographyLink } from "primitives/Typography/TypographyLink";

import {
  bottom,
  horizontalPadding,
  left,
  maxWidth,
  minWidth,
  position,
  right,
  top,
  transition,
  verticalAlign,
  verticalPadding,
  width,
} from "libs/styles";
import { withPerformance } from "libs/CB/changeDetectionStrategy/withPerformance";
import { tableZIndexes } from "libs/styles/zIndexes";

import { TableViewColumn, TableViewDataType, TableViewItemInterface, TableViewOptions } from "../../types";
import { cellVerticalPaddingBySize, halfOfCellDefaultHorizontalPadding } from "../../libs/paddings";

import { getComponentForColumnType } from "./CellTypes";

interface ColumnInterface {
  column: TableViewColumn;
  tableViewOptions: TableViewOptions;
  item: TableViewItemInterface;
}

type CellProps = ColumnInterface & { tableCellProps: TableCellProps; styles?: any };

function Cell({ tableViewOptions, item, column, tableCellProps, styles }: CellProps) {
  const columnType = column.type || TableViewDataType.STRING;
  const getComponentData = getComponentForColumnType[columnType];

  if (!getComponentData) return null;

  const { component, cellWidth } = getComponentData({
    column,
    item,
    linkWrapper: item.redirectReference
      ? (child, styles) => (
          <TypographyLink styles={styles} to={item.redirectReference!}>
            {child}
          </TypographyLink>
        )
      : undefined,
  });

  const componentVerticalPadding = cellVerticalPaddingBySize[tableViewOptions.rowsConfig.paddingConfig];

  return (
    <Wrapper
      as="td"
      {...tableCellProps}
      styles={[
        verticalAlign("top"),
        verticalPadding(componentVerticalPadding),
        horizontalPadding(halfOfCellDefaultHorizontalPadding),
        width(cellWidth),
        // maxWidth(cellWidth),
        // minWidth(cellWidth),
        position("relative"),
        styles,
      ]}
    >
      <Wrapper
        className="table-cell-back"
        styles={[
          transition(`background-color ${duration200}`),
          position("absolute"),
          left(0),
          top(0),
          right(0),
          bottom(0),
          tableZIndexes.cell,
        ]}
      />
      {component}
    </Wrapper>
  );
}

export default withPerformance(["tableViewOptions", "column", "tableCellProps"])(Cell);
