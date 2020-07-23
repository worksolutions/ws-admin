import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useTable, useResizeColumns, Hooks } from "react-table";
import { isNil, last } from "ramda";
import { toJS } from "mobx";

import { TableViewColumn, TableViewDataSource, TableViewOptions } from "./types";
import TableComponent from "./Components/HTMLTable";
import BodyComponent from "./Components/Body/Body";
import HeaderComponent, { HeaderGroupInterface } from "./Components/Header";
import { prepareColumn, useSorting } from "./libs";

const createResizeHook = (columns: TableViewColumn[]) => (hooks: Hooks) => {
  hooks.useInstanceBeforeDimensions.push(({ headers }) => {
    columns.forEach((column, index) => {
      if (isNil(column.resizable) || column.resizable) return;
      (headers[index] as any).canResize = false;
    });
    (last(headers) as any).canResize = false;
  });
};

function Table({ list, options }: { list: TableViewDataSource["list"]; options: TableViewOptions }) {
  const { id, columns } = options;

  const preparedColumns = React.useMemo(() => columns.map((column) => prepareColumn(column, options)), []);
  const sorting = useSorting();
  const [resizeHoverColumnIndex, setResizeHoverColumnIndex] = useState(-1);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns: preparedColumns,
      data: list,
    },
    useResizeColumns,
    createResizeHook(columns),
  );

  const [headerGroup] = headerGroups as HeaderGroupInterface[];

  return (
    <TableComponent {...getTableProps()}>
      <HeaderComponent
        id={id}
        trHeaderGroup={headerGroup}
        sorting={sorting}
        onResizeHover={setResizeHoverColumnIndex}
      />
      <BodyComponent
        id={id}
        trHeaderGroup={headerGroup}
        prepareRow={prepareRow}
        rows={rows}
        resizeHoverColumnIndex={resizeHoverColumnIndex}
        {...getTableBodyProps()}
      />
    </TableComponent>
  );
}

export default React.memo(observer(Table));
