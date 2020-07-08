import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useTable, useResizeColumns, useBlockLayout } from "react-table";

import { HeaderGroupInterface, TableViewDataSource, TableViewOptionsInterface } from "./types";
import TableComponent from "./TableComponents/Table";
import BodyComponent from "./TableComponents/Body";
import HeaderComponent from "./TableComponents/Header";
import RowComponent from "./TableComponents/Row";
import { useColumns, useSorting } from "./libs";

interface TableInterface extends TableViewDataSource {
  options?: TableViewOptionsInterface;
}

function Table({ columns, data, options }: TableInterface) {
  const preparedColumns = useColumns(columns);
  const sorting = useSorting();
  const [resizeColumnIndex, setResizeColumnIndex] = useState(-1);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns: preparedColumns,
      data,
      defaultColumn: options?.tableViewDefaultSizes,
    },
    useBlockLayout,
    useResizeColumns,
  );

  const [headerGroup] = headerGroups as HeaderGroupInterface[];
  return (
    <TableComponent {...getTableProps()}>
      <HeaderComponent trHeaderGroup={headerGroup} sorting={sorting} onResize={setResizeColumnIndex} />
      <BodyComponent {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { key } = row.getRowProps();
          return <RowComponent key={key} row={row} resizingColumnIndex={resizeColumnIndex} />;
        })}
      </BodyComponent>
    </TableComponent>
  );
}

export default React.memo(observer(Table));
