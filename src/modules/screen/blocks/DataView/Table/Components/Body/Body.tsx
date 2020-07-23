import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-table";

import Wrapper from "primitives/Wrapper";

import { flex } from "libs/styles";

import { useResizeTableContent } from "../../resizeHook";
import { HeaderGroupInterface } from "../Header";

type BodyInterface = {
  resizeHoverColumnIndex: number;
  id: string;
  rows: Row[];
  prepareRow: (row: Row) => void;
  trHeaderGroup: HeaderGroupInterface;
} & Record<string, any>;

const RowComponent = observer(function ({
  row,
  resizeHoverColumnIndex,
  id,
}: {
  row: Row;
  resizeHoverColumnIndex: number;
  id: string;
}) {
  const { role } = row.getRowProps();
  const { fixedSizes, contentWidths } = useResizeTableContent(id);
  const rowStyles = fixedSizes && flex;
  return (
    <Wrapper as="tr" role={role} styles={rowStyles}>
      {row.cells.map((cell, index) => (
        <Fragment key={index}>
          {cell.render("Cell", { fixedSizes, contentWidths, index, resizeHoverColumnIndex })}
        </Fragment>
      ))}
    </Wrapper>
  );
});

function Body({ id, rows, prepareRow, role, resizeHoverColumnIndex }: BodyInterface) {
  return (
    <Wrapper as="tbody" role={role}>
      {rows.map((row) => {
        prepareRow(row);
        return (
          <RowComponent key={row.getRowProps().key} row={row} resizeHoverColumnIndex={resizeHoverColumnIndex} id={id} />
        );
      })}
    </Wrapper>
  );
}

export default observer(Body);
