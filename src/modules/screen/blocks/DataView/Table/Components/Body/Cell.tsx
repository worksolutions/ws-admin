import React from "react";
import { TableCellProps } from "react-table";
import { useMeasure } from "react-use";

import Typography from "primitives/Typography";
import ImageWithDefault from "primitives/ImageWithDefault";
import Wrapper from "primitives/Wrapper";
import { TypographyLink } from "primitives/Typography/TypographyLink";

import {
  border,
  borderRadius,
  horizontalPadding,
  lastChild,
  paddingLeft,
  paddingRight,
  position,
  verticalAlign,
  verticalPadding,
  width,
} from "libs/styles";
import { getLinkIsNative } from "libs/linkIsNative";
import { withPerformance } from "libs/CB/changeDetectionStrategy/withPerformance";

import { TableSizes, TableViewColumn, TableViewDataType, TableViewItemInterface, TableViewOptions } from "../../types";
import { getSizeChangerLineStyles, SizeChangerTransparentLine } from "../SizeChangerLine";

const ComponentsForColumnType: Record<
  TableViewDataType,
  (props: {
    item: TableViewItemInterface;
    width: number;
    linkWrapper?: (child: React.ReactNode) => JSX.Element;
    column: TableViewColumn;
  }) => JSX.Element
> = {
  [TableViewDataType.STRING]: ({ item, linkWrapper }) => {
    if (linkWrapper)
      return linkWrapper(
        <Typography styles={[verticalPadding(2)]} type="body-semi-bold">
          {item.value}
        </Typography>,
      );

    return <Typography styles={[verticalPadding(2)]}>{item.value}</Typography>;
  },
  [TableViewDataType.IMAGE]: ({ item, width, column }) =>
    (
      <ImageWithDefault
        src={item.value as string}
        width="100%"
        height={Math.ceil(width / column.options!.imageConfig!.aspectRatio)}
        styles={[border(1, "gray-blue/02"), borderRadius(4)]}
        emptyIcon="16-no-image"
      />
    ) as any,
};

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
  [TableViewDataType.IMAGE]: (padding, options) => {
    const imageConfig = options!.imageConfig!;
    return padding + Math.ceil(imageHeightsForHeightConfig[imageConfig.heightConfig] * imageConfig.aspectRatio);
  },
};

const defaultPadding = 16;

interface ColumnInterface {
  column: TableViewColumn;
  tableViewOptions: TableViewOptions;
  item: TableViewItemInterface;
}

type CellProps = ColumnInterface & { tableCellProps: TableCellProps; styles?: any; showResize: boolean };

function Cell({ tableViewOptions, item, column, tableCellProps, showResize, styles }: CellProps) {
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
        horizontalPadding(0),
        paddingLeft(defaultPadding),
        width(widthForPaddingAndOptions[columnType](defaultPadding, column.options)),
        lastChild(paddingRight(defaultPadding), "&"),
        position("relative"),
        getSizeChangerLineStyles(showResize),
        styles,
      ]}
    >
      <Component
        width={bounds.width}
        item={item}
        column={column}
        linkWrapper={
          column.referenceRedirect
            ? (child) => (
                <TypographyLink to={column.referenceRedirect!} native={getLinkIsNative(column.referenceRedirect!)}>
                  {child}
                </TypographyLink>
              )
            : undefined
        }
      />
      {showResize && <SizeChangerTransparentLine />}
    </Wrapper>
  );
}

export default withPerformance(["tableViewOptions", "column", "tableCellProps"])(Cell);
