import React from "react";
import { TableCellProps } from "react-table";
import { useMeasure } from "react-use";

import Typography from "primitives/Typography";
import ImageWithDefault from "primitives/ImageWithDefault";
import Wrapper from "primitives/Wrapper";
import { TypographyLink } from "primitives/Typography/TypographyLink";

import { border, borderRadius, paddingLeft, verticalAlign, verticalPadding, width } from "libs/styles";
import { getLinkIsNative } from "libs/linkIsNative";

import {
  TableViewColumn,
  TableViewDataType,
  TableViewItemInterface,
  TableViewOptions,
  TableViewSizes,
} from "../../types";

interface ColumnInterface {
  column: TableViewColumn;
  options: TableViewOptions;
  item: TableViewItemInterface;
}

const ComponentsForColumnType: Record<
  TableViewDataType,
  (props: {
    item: TableViewItemInterface;
    width: number;
    linkWrapper?: (child: React.ReactNode) => JSX.Element;
    options: TableViewOptions;
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
  [TableViewDataType.IMAGE]: ({ item, width, options }) => (
    <ImageWithDefault
      src={item.value as string}
      width="100%"
      height={width / options.imageConfig!.aspectRatio}
      styles={[border(1, "gray-blue/02"), borderRadius(4)]}
    />
  ),
};

const verticalPaddingForSize: Record<TableViewSizes, number> = {
  [TableViewSizes.LARGE]: 16,
  [TableViewSizes.MEDIUM]: 12,
  [TableViewSizes.SMALL]: 8,
};

const widthForType: Record<TableViewDataType, (padding: number) => string | number> = {
  [TableViewDataType.STRING]: () => "initial",
  [TableViewDataType.IMAGE]: (padding) => padding + 76,
};

function Cell({ options, item, column, tableCellProps }: ColumnInterface & { tableCellProps: TableCellProps }) {
  const [ref, bounds] = useMeasure();
  const type = column.type || TableViewDataType.STRING;
  const Component = ComponentsForColumnType[type];
  if (!Component) return null;
  const componentVerticalPadding = verticalPaddingForSize[options.rowsConfig.size];

  return (
    <Wrapper
      as="td"
      {...tableCellProps}
      ref={ref}
      styles={[
        verticalAlign("top"),
        verticalPadding(componentVerticalPadding),
        paddingLeft(16),
        width(widthForType[type](16)),
      ]}
    >
      <Component
        width={bounds.width}
        item={item}
        options={options}
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
    </Wrapper>
  );
}

export default React.memo(Cell);
