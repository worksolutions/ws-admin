import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useTable, useResizeColumns } from "react-table";

import Wrapper from "primitives/Wrapper";

import { TableViewDataSource, TableViewOptions } from "./types";
import TableComponent from "./Components/HTMLTable";
import BodyComponent from "./Components/Body/Body";
import HeaderComponent, { HeaderGroupInterface } from "./Components/Header";
import { prepareColumn, useSorting } from "./libs";
import { useFlexLayout } from "./useFlexLayout";

function Table({ data, options }: { data: TableViewDataSource; options: TableViewOptions }) {
  const preparedColumns = React.useMemo(() => options.columns.map((column) => prepareColumn(column, options)), []);
  const sorting = useSorting();
  const [resizeColumnIndex, setResizeColumnIndex] = useState(-1);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns: preparedColumns,
      data: data.list,
    },
    // useFlexLayout,
    useResizeColumns,
    (hooks) => {
      // hooks.getHeaderProps.push((props, { column }) => {
      //   return [props, { style: { width: `${column.totalWidth}px` } }];
      // });
      hooks.useInstanceBeforeDimensions.push(({ headers }) => {
        (headers[0] as any).canResize = false;
      });
    },
  );

  const [headerGroup] = headerGroups as HeaderGroupInterface[];

  return (
    <TableComponent {...getTableProps()}>
      <HeaderComponent trHeaderGroup={headerGroup} sorting={sorting} onResize={setResizeColumnIndex} />
      <BodyComponent {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { key } = row.getRowProps();
          return (
            <Wrapper as="tr" {...row.getRowProps()} key={key}>
              {row.cells.map((cell) => cell.render("Cell"))}
            </Wrapper>
          );
        })}
      </BodyComponent>
    </TableComponent>
  );
}

export default React.memo(observer(Table));
