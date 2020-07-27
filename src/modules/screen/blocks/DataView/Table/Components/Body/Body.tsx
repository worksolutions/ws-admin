import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-table";

import Wrapper from "primitives/Wrapper";

import { firstChild, flex, marginTop } from "libs/styles";

import { useResizeTableContent } from "../Header/resizeHook";
import { HeaderGroupInterface } from "../Header";

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
    <Wrapper as="tr" role={role} styles={rowStyles}>
      {row.cells.map((cell, index) => (
        <Fragment key={index}>{cell.render("Cell", { fixedSizes, contentWidths, index })}</Fragment>
      ))}
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
