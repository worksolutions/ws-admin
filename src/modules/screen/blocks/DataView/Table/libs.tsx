import React from "react";
import { Column } from "react-table";

import TableCell from "./Components/Body/Cell";
import { TableViewColumn, TableViewDataType, TableViewOptions } from "./types";

import { SortingDirection } from "types/Sorting";

export function prepareColumn(column: TableViewColumn, options: TableViewOptions) {
  return {
    Header: { sortable: column.sortable, title: column.title },
    accessor: column.field,
    Cell: ({ value: item, cell: { getCellProps } }) => {
      return <TableCell item={item} column={column} options={options} tableCellProps={getCellProps()} />;
    },
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
