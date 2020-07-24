import React from "react";
import { CellProps, Column } from "react-table";

import { flex, width } from "libs/styles";

import TableCell from "../Components/Body/Cell";
import { TableViewColumn, TableViewOptions } from "../types";
import { AnyAction } from "../../../../../../types/Actions";
import { useEffectSkipFirst } from "../../../../../../libs/hooks";
import { useActions } from "../../../../../context/actions/useActions";
import { useAppContext } from "../../../../../context/hooks/useAppContext";
import { insertContext } from "../../../../../context/insertContext";

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
export function useSorting(initialValue: string, changeAction: AnyAction) {
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
