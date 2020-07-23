import React from "react";
import { CellProps, Column } from "react-table";

import { flex, width } from "libs/styles";

import TableCell from "./Components/Body/Cell";
import { TableViewColumn, TableViewOptions } from "./types";

import { SortingDirection } from "types/Sorting";

const createCell = (column: TableViewColumn, tableViewOptions: TableViewOptions) => ({
  value: item,
  cell: { getCellProps },
  fixedSizes,
  contentWidths,
  index,
  resizeHoverColumnIndex,
}: CellProps<any> & {
  fixedSizes: boolean;
  contentWidths: number[];
  index: number;
  resizeHoverColumnIndex: number;
}) => {
  return (
    <TableCell
      item={item}
      column={column}
      tableViewOptions={tableViewOptions}
      tableCellProps={getCellProps()}
      showResize={resizeHoverColumnIndex === index}
      styles={fixedSizes && [flex, width(contentWidths[index])]}
    />
  );
};
export function prepareColumn(column: TableViewColumn, tableViewOptions: TableViewOptions) {
  return {
    Header: { sortable: column.sortable, title: column.title },
    accessor: column.field,
    Cell: createCell(column, tableViewOptions),
  } as Column<any>;
}

export function useSorting() {
  const [currentSortingField, setCurrentSortingField] = React.useState<{
    type: SortingDirection;
    field: string;
  } | null>(null);

  const nextSorting = React.useCallback(
    (field: string) => {
      if (!currentSortingField) {
        setCurrentSortingField({ type: SortingDirection.ASC, field });
        return;
      }

      if (currentSortingField.field !== field) {
        setCurrentSortingField({ field, type: SortingDirection.ASC });
        return;
      }

      if (currentSortingField.type === SortingDirection.DESC) {
        setCurrentSortingField(null);
        return;
      }

      setCurrentSortingField({ field, type: SortingDirection.DESC });
    },
    [currentSortingField],
  );

  return {
    currentSortingField,
    nextSorting,
  };
}

export type UseSortingType = ReturnType<typeof useSorting>;
