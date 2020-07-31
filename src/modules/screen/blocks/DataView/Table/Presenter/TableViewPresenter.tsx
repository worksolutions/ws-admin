import React, { Ref } from "react";
import { observer } from "mobx-react-lite";
import { Hooks, useResizeColumns, useTable } from "react-table";
import { isNil, last } from "ramda";
import { useMeasure } from "react-use";
import { elevation8 } from "style/shadows";

import Wrapper from "primitives/Wrapper";

import { flex, fullHeight, fullWidth, height, left, overflow, position, right, top } from "libs/styles";
import { provideRef } from "libs/provideRef";
import { useScrollCallbackWasScrolledBoolean } from "libs/hooks";

import { TableViewDataSource } from "../types";

import TableComponent from "./Components/HTMLTable";
import BodyComponent from "./Components/Body/Body";
import HeaderComponent, { HeaderGroupInterface } from "./Components/Header";
import { prepareColumn, useSorting } from "./libs";
import { useTableScroller } from "./libs/useTableScroller";
import { useResizeTableContent } from "./Components/Header/resizeHook";
import { TableViewColumn, TableViewOptions } from "./types";

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

interface TableInterface {
  list: TableViewDataSource;
  options: TableViewOptions;
  actions: { sorting: AnyAction };
}

function TableViewPresenter({ list, options, actions }: TableInterface) {
  const { id, columns } = options;

  const preparedColumns = React.useMemo(() => columns.map((column) => prepareColumn(column, options)), []);
  const sorting = useSorting(options.sortingOptions.initialValue, actions.sorting);
  const wrapperRef = React.useRef<HTMLElement>();
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

  useTableScroller(fixedSizes, wrapperRef);

  const { scrolled, setScrollableElement } = useScrollCallbackWasScrolledBoolean();

  return (
    <Wrapper styles={[position("relative"), fullHeight, fullWidth]}>
      <Wrapper
        ref={provideRef(wrapperRef, setScrollableElement)}
        styles={[fullHeight, fullWidth, flex, overflow("scroll")]}
      >
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
      {scrolled && <Wrapper styles={[position("absolute"), top(0), left(0), right(0), height(40), elevation8]} />}
    </Wrapper>
  );
}

export default React.memo(observer(TableViewPresenter));
