import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-table";

import Wrapper from "primitives/Wrapper";

import {
  backgroundColor,
  borderRadius,
  child,
  firstChild,
  flex,
  hover,
  marginTop,
  maxWidth,
  nthChild,
  nthLastChild,
  width,
} from "libs/styles";

import { useResizeTableContent } from "../Header/resizeHook";
import { HeaderGroupInterface } from "../Header";
import { halfOfCellDefaultHorizontalPadding } from "../../libs/paddings";

type BodyInterface = {
  id: string;
  rows: Row[];
  prepareRow: (row: Row) => void;
  trHeaderGroup: HeaderGroupInterface;
} & Record<string, any>;

const RowComponent = observer(function ({ row, id }: { row: Row; id: string }) {
  const { role } = row.getRowProps();
  const { fixedSizes, contentWidths } = useResizeTableContent(id);
  const rowStyles = fixedSizes && flex;
  return (
    <Wrapper
      as="tr"
      role={role}
      styles={[
        rowStyles,
        nthChild("2", child(borderRadius("4px 0 0 4px"), ".table-cell-back")),
        nthLastChild("2", child(borderRadius("0 4px 4px 0"), ".table-cell-back")),
        hover(child(backgroundColor("gray-blue/01"), ".table-cell-back")),
      ]}
    >
      <Wrapper
        styles={[width(halfOfCellDefaultHorizontalPadding), maxWidth(halfOfCellDefaultHorizontalPadding)]}
        as="td"
      />
      {row.cells.map((cell, index) => (
        <Fragment key={index}>{cell.render("Cell", { fixedSizes, contentWidths, index })}</Fragment>
      ))}
      <Wrapper
        styles={[width(halfOfCellDefaultHorizontalPadding), maxWidth(halfOfCellDefaultHorizontalPadding)]}
        as="td"
      />
    </Wrapper>
  );
});

function Body({ id, rows, prepareRow, role }: BodyInterface) {
  return (
    <Wrapper as="tbody" role={role} styles={firstChild(marginTop(40))}>
      {rows.map((row) => {
        prepareRow(row);
        return <RowComponent key={row.getRowProps().key} row={row} id={id} />;
      })}
    </Wrapper>
  );
}

export default observer(Body);
