import React from "react";
import { observer } from "mobx-react-lite";
import { useTable } from "react-table";

import { TableViewDataSource } from "./types";
import TableComponent from "./TableComponents/Table";
import BodyComponent from "./TableComponents/Body";
import HeaderComponent from "./TableComponents/Header";
import RowComponent from "./TableComponents/Row";
import { useColumns, useSorting } from "./libs";

interface TableInterface {
  data: TableViewDataSource;
}

function Table({ data: { columns, data } }: TableInterface) {
  const preparedColumns = useColumns(columns);
  const sorting = useSorting();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: preparedColumns,
    data,
  });

  const [headerGroup] = headerGroups;

  return (
    <TableComponent {...getTableProps()}>
      <HeaderComponent trHeaderGroup={headerGroup} sorting={sorting} />
      <BodyComponent {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { key } = row.getRowProps();
          return <RowComponent key={key} row={row} />;
        })}
      </BodyComponent>
    </TableComponent>
  );
}

export default React.memo(observer(Table));
