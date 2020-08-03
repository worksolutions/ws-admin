import React from "react";
import { TableCellProps } from "react-table";
import { duration200 } from "layout/durations";

import Wrapper from "primitives/Wrapper";
import { TypographyLink } from "primitives/Typography/TypographyLink";

import {
  borderRadius,
  bottom,
  child,
  firstChild,
  horizontalPadding,
  lastChild,
  left,
  marginLeft,
  marginRight,
  maxWidth,
  minWidth,
  overflow,
  paddingLeft,
  paddingRight,
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

import { TableSizes, TableViewColumn, TableViewDataType, TableViewItemInterface, TableViewOptions } from "../../types";

import { ComponentsForColumnType } from "./CellTypes";

const verticalPaddingBySize: Record<TableSizes, number> = {
  [TableSizes.LARGE]: 16,
  [TableSizes.MEDIUM]: 12,
  [TableSizes.SMALL]: 8,
};

const imageHeightsForHeightConfigBySize: Record<TableSizes, number> = {
  [TableSizes.LARGE]: 48,
  [TableSizes.MEDIUM]: 32,
  [TableSizes.SMALL]: 24,
};

const widthForPaddingAndOptionsByType: Record<
  TableViewDataType,
  (padding: number, options: TableViewColumn["options"]) => string | number
> = {
  [TableViewDataType.STRING]: () => "initial",
  [TableViewDataType["STATUS-STRING"]]: () => "initial",
  [TableViewDataType.IMAGE]: (padding, options) => {
    const imageConfig = options!.imageConfig!;
    return padding + Math.ceil(imageHeightsForHeightConfigBySize[imageConfig.heightConfig] * imageConfig.aspectRatio);
  },
  [TableViewDataType.DATE]: () => 133,
  [TableViewDataType.ACTIONS]: () => 40,
};

const commonStylesForCellByType: Record<string, any> = {
  [TableViewDataType.STRING]: overflow("hidden"),
  [TableViewDataType.DATE]: overflow("hidden"),
  [TableViewDataType.IMAGE]: overflow("hidden"),
};

const defaultPadding = 16;
const halfOfDefaultPadding = defaultPadding / 2;

interface ColumnInterface {
  column: TableViewColumn;
  tableViewOptions: TableViewOptions;
  item: TableViewItemInterface;
}

type CellProps = ColumnInterface & { tableCellProps: TableCellProps; styles?: any };

function Cell({ tableViewOptions, item, column, tableCellProps, styles }: CellProps) {
  const columnType = column.type || TableViewDataType.STRING;
  const Component = ComponentsForColumnType[columnType];

  if (!Component) return null;

  const componentVerticalPadding = verticalPaddingBySize[tableViewOptions.rowsConfig.paddingConfig];

  const widthValue = widthForPaddingAndOptionsByType[columnType](defaultPadding, column.options);

  return (
    <Wrapper
      as="td"
      {...tableCellProps}
      styles={[
        verticalAlign("top"),
        verticalPadding(componentVerticalPadding),
        width(widthValue),
        maxWidth(widthValue),
        minWidth(widthValue),
        commonStylesForCellByType[columnType],
        horizontalPadding(halfOfDefaultPadding),
        firstChild(
          [
            paddingLeft(defaultPadding),
            child([marginLeft(halfOfDefaultPadding), borderRadius("4px 0 0 4px")], ".table-cell-back"),
          ],
          "&",
        ),
        lastChild(
          [
            paddingRight(defaultPadding),
            child([marginRight(halfOfDefaultPadding), borderRadius("0 4px 4px 0")], ".table-cell-back"),
          ],
          "&",
        ),
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
      <Component
        item={item}
        column={column}
        linkWrapper={
          item.redirectReference
            ? (child, styles) => (
                <TypographyLink styles={styles} to={item.redirectReference!}>
                  {child}
                </TypographyLink>
              )
            : undefined
        }
      />
    </Wrapper>
  );
}

export default withPerformance(["tableViewOptions", "column", "tableCellProps"])(Cell);
