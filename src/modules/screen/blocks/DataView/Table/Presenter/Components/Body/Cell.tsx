import React from "react";
import { TableCellProps } from "react-table";
import { duration160 } from "layout/durations";
import { zIndex_table_cell } from "layout/zIndexes";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import {
  bottom,
  horizontalPadding,
  left,
  position,
  right,
  top,
  transition,
  verticalAlign,
  verticalPadding,
  width,
} from "libs/styles";
import { withPerformance } from "libs/CB/changeDetectionStrategy/withPerformance";

import { TableSizes, TableViewColumn, TableViewDataType, TableViewItemInterface, TableViewOptions } from "../../types";
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
  if (!getComponentData) return <Typography>unknown type: {columnType}</Typography>;

  const { component, cellWidth } = getComponentData({ column, item });

  const componentVerticalPadding =
    cellVerticalPaddingBySize[tableViewOptions?.rowsConfig?.paddingConfig || TableSizes.MEDIUM];

  return (
    <Wrapper
      as="td"
      {...tableCellProps}
      styles={[
        verticalAlign("top"),
        verticalPadding(componentVerticalPadding),
        horizontalPadding(halfOfCellDefaultHorizontalPadding),
        width(cellWidth),
        position("relative"),
        styles,
      ]}
    >
      <Wrapper
        className="table-cell-back"
        styles={[
          transition(`background-color ${duration160}`),
          position("absolute"),
          left(0),
          top(0),
          right(0),
          bottom(0),
          zIndex_table_cell,
        ]}
      />
      {component}
    </Wrapper>
  );
}

export default withPerformance(["tableViewOptions", "column", "tableCellProps"])(Cell);
