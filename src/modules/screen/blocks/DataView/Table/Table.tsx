import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Hooks, useResizeColumns, useTable } from "react-table";
import { isNil, last, sort } from "ramda";
import { useMeasure } from "react-use";

import Wrapper from "primitives/Wrapper";

import {
  backgroundColor,
  child,
  display,
  flex,
  fullHeight,
  fullWidth,
  height,
  opacity,
  overflow,
  position,
  top,
} from "libs/styles";

import { useEffectSkipFirst } from "../../../../../libs/hooks";
import { AnyAction } from "../../../../../types/Actions";

import { TableViewColumn, TableViewDataSource, TableViewOptions } from "./types";
import TableComponent from "./Components/HTMLTable";
import BodyComponent from "./Components/Body/Body";
import HeaderComponent, { HeaderGroupInterface } from "./Components/Header";
import { prepareColumn, useSorting } from "./libs";
import { Scroller } from "./libs/Scroller";

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

  const scroller = React.useMemo(() => new Scroller(), []);

  React.useEffect(() => {
    setTimeout(() => scroller.run(ref.current!), 10);
    return () => scroller.destroy();
  }, []);

  return (
    <Wrapper ref={ref} styles={[fullHeight, fullWidth, flex, overflow("scroll"), position("relative")]}>
      <TableComponent {...getTableProps()} ref={tableRef}>
        <HeaderComponent
          className="table-header-original"
          id={id}
          trHeaderGroup={headerGroup}
          sorting={sorting}
          tableHeight={tableBounds.height}
        />
        <BodyComponent
          id={id}
          trHeaderGroup={headerGroup}
          prepareRow={prepareRow}
          rows={rows}
          {...getTableBodyProps()}
        />
      </TableComponent>
      {/*<TableComponent className="table-sticky-for-header" css={[position("absolute"), backgroundColor("white")]}>*/}
      {/*  <HeaderComponent*/}
      {/*    className="header-sticky"*/}
      {/*    id={id}*/}
      {/*    trHeaderGroup={headerGroup}*/}
      {/*    sorting={sorting}*/}
      {/*    onResizeHover={setResizeHoverColumnIndex}*/}
      {/*  />*/}
      {/*</TableComponent>*/}
    </Wrapper>
  );
}

export default React.memo(observer(Table));
