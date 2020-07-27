import React from "react";
import { observer } from "mobx-react-lite";
import { Hooks, useResizeColumns, useTable } from "react-table";
import { isNil, last } from "ramda";
import { useMeasure } from "react-use";

import Wrapper from "primitives/Wrapper";

import { flex, fullHeight, fullWidth, overflow } from "libs/styles";

import { TableViewColumn, TableViewDataSource, TableViewOptions } from "./types";
import TableComponent from "./Components/HTMLTable";
import BodyComponent from "./Components/Body/Body";
import HeaderComponent, { HeaderGroupInterface } from "./Components/Header";
import { prepareColumn, useSorting } from "./libs";
import { useTableScroller } from "./libs/useTableScroller";
import { useResizeTableContent } from "./Components/Header/resizeHook";

import { AnyAction } from "types/Actions";

const createResizeHook = (columns: TableViewColumn[]) => (hooks: Hooks) => {
  hooks.useInstanceBeforeDimensions.push(({ headers }) => {
    columns.forEach((column, index) => {
      if (isNil(column.resizable) || column.resizable) return;
      (headers[index] as any).canResize = false;
    });
    (last(headers) as any).canResize = false;
  });
};

function Table({
  list,
  options,
  actions,
}: {
  list: TableViewDataSource["list"];
  options: TableViewOptions;
  actions: { sorting: AnyAction };
}) {
  const { id, columns } = options;

  const preparedColumns = React.useMemo(() => columns.map((column) => prepareColumn(column, options)), []);
  const sorting = useSorting(options.sortingOptions.initialValue, actions.sorting);
  const ref = React.useRef<HTMLElement>();
  const [tableRef, tableBounds] = useMeasure();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns: preparedColumns,
      data: list,
    },
    useResizeColumns,
    createResizeHook(columns),
  );

  const [headerGroup] = headerGroups as HeaderGroupInterface[];

  const { fixedSizes } = useResizeTableContent(id);

  useTableScroller(fixedSizes, ref);

  return (
    <Wrapper ref={ref} styles={[fullHeight, fullWidth, flex, overflow("scroll")]}>
      <TableComponent {...getTableProps()} ref={tableRef}>
        <HeaderComponent id={id} trHeaderGroup={headerGroup} sorting={sorting} tableHeight={tableBounds.height} />
        <BodyComponent
          id={id}
          trHeaderGroup={headerGroup}
          prepareRow={prepareRow}
          rows={rows}
          {...getTableBodyProps()}
        />
      </TableComponent>
    </Wrapper>
  );
}

export default React.memo(observer(Table));
