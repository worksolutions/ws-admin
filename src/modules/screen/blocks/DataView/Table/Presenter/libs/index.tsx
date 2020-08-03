import React from "react";
import { CellProps, Column } from "react-table";

import { ai, Aligns, flex, width } from "libs/styles";
import { useEffectSkipFirst } from "libs/hooks";

import { useActions } from "modules/context/actions/useActions";
import { useAppContext } from "modules/context/hooks/useAppContext";
import { insertContext } from "modules/context/insertContext";

import TableCell from "../Components/Body/Cell";
import { TableViewColumn, TableViewOptions } from "../types";

import { AnyAction } from "types/Actions";
import { SortingDirection } from "types/Sorting";

const createCell = (column: TableViewColumn, tableViewOptions: TableViewOptions) => ({
  value: item,
  cell: { getCellProps },
  fixedSizes,
  contentWidths,
  index,
}: CellProps<any> & {
  fixedSizes: boolean;
  contentWidths: number[];
  index: number;
}) => {
  return (
    <TableCell
      item={item}
      column={column}
      tableViewOptions={tableViewOptions}
      tableCellProps={getCellProps()}
      styles={fixedSizes && [flex, ai(Aligns.START), width(contentWidths[index])]}
    />
  );
};
export function prepareColumn(column: TableViewColumn, tableViewOptions: TableViewOptions) {
  return {
    Header: { sortable: column.sortable, title: column.title, sizes: column.sizes },
    accessor: column.field,
    Cell: createCell(column, tableViewOptions),
  } as Column<any>;
}

export function useSortingLogic(
  getSorting: () => {
    direction: SortingDirection;
    id: string;
  },
) {
  const [currentSortingField, setCurrentSortingField] = React.useState(getSorting);

  const nextSorting = React.useCallback(
    (id: string) => {
      if (currentSortingField.id !== id) {
        setCurrentSortingField({ id, direction: SortingDirection.ASC });
        return;
      }

      setCurrentSortingField({
        id,
        direction:
          currentSortingField.direction === SortingDirection.ASC ? SortingDirection.DESC : SortingDirection.ASC,
      });
    },
    [currentSortingField],
  );

  return {
    currentSortingField,
    nextSorting,
  };
}
export function useSorting(initialValue: string, changeAction?: AnyAction) {
  if (!changeAction) {
    return { currentSortingField: { id: null, direction: SortingDirection.DESC }, nextSorting: () => null };
  }
  const appContext = useAppContext();

  const { currentSortingField, nextSorting } = useSortingLogic(
    () => insertContext(initialValue, appContext.context).value,
  );
  const { change } = useActions({ change: changeAction }, appContext);

  useEffectSkipFirst(() => {
    if (!currentSortingField) return;
    change.run(currentSortingField);
  }, [currentSortingField]);

  return { currentSortingField, nextSorting };
}

export type UseSortingType = ReturnType<typeof useSorting>;
