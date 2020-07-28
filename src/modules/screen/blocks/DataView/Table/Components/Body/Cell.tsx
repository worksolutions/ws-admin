import React from "react";
import { TableCellProps } from "react-table";
import { useMeasure } from "react-use";
import { duration200 } from "layout/durations";

import Wrapper from "primitives/Wrapper";
import { TypographyLink } from "primitives/Typography/TypographyLink";

import {
  firstChild,
  horizontalPadding,
  lastChild,
  left,
  paddingLeft,
  top,
  paddingRight,
  position,
  verticalAlign,
  verticalPadding,
  width,
  right,
  bottom,
  zIndex,
  child,
  marginLeft,
  marginRight,
  borderRadius,
  transition,
} from "libs/styles";
import { getLinkIsNative } from "libs/linkIsNative";
import { withPerformance } from "libs/CB/changeDetectionStrategy/withPerformance";

import { TableSizes, TableViewColumn, TableViewDataType, TableViewItemInterface, TableViewOptions } from "../../types";

import { ComponentsForColumnType } from "./CellTypes";

const verticalPaddingForSize: Record<TableSizes, number> = {
  [TableSizes.LARGE]: 16,
  [TableSizes.MEDIUM]: 12,
  [TableSizes.SMALL]: 8,
};

const imageHeightsForHeightConfig: Record<TableSizes, number> = {
  [TableSizes.LARGE]: 48,
  [TableSizes.MEDIUM]: 32,
  [TableSizes.SMALL]: 24,
};

const widthForPaddingAndOptions: Record<
  TableViewDataType,
  (padding: number, options: TableViewColumn["options"]) => string | number
> = {
  [TableViewDataType.STRING]: () => "initial",
  [TableViewDataType["STATUS-STRING"]]: () => "initial",
  [TableViewDataType.IMAGE]: (padding, options) => {
    const imageConfig = options!.imageConfig!;
    return padding + Math.ceil(imageHeightsForHeightConfig[imageConfig.heightConfig] * imageConfig.aspectRatio);
  },
  [TableViewDataType.DATE]: () => 133,
  [TableViewDataType.ACTIONS]: () => 40,
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
  const [ref, bounds] = useMeasure();
  const columnType = column.type || TableViewDataType.STRING;
  const Component = ComponentsForColumnType[columnType];
  if (!Component) return null;

  const componentVerticalPadding = verticalPaddingForSize[tableViewOptions.rowsConfig.paddingConfig];

  return (
    <Wrapper
      as="td"
      {...tableCellProps}
      ref={ref}
      styles={[
        verticalAlign("top"),
        verticalPadding(componentVerticalPadding),
        width(widthForPaddingAndOptions[columnType](defaultPadding, column.options)),
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
          zIndex(-1),
        ]}
      />
      <Component
        width={bounds.width}
        item={item}
        column={column}
        linkWrapper={
          column.referenceRedirect
            ? (child, styles) => (
                <TypographyLink
                  styles={styles}
                  type="body-semi-bold"
                  to={column.referenceRedirect!}
                  native={getLinkIsNative(column.referenceRedirect!)}
                >
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
