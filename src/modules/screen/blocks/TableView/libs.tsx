import React from "react";
import { complement, filter, isNil } from "ramda";
import { Column } from "react-table";

import { TypographyLink } from "primitives/Typography/TypographyLink";
import Typography from "primitives/Typography";

import { isObject } from "libs/is";
import { getLinkIsNative } from "libs/linkIsNative";

import { TableSortingType, TableViewDataSource } from "./types";

function prepareColumn(column: TableViewDataSource["columns"][0]) {
  const sizes = filter(complement(isNil), {
    width: column.width,
    minWidth: column.minWidth,
    maxWidth: column.maxWidth,
  });

  return {
    Header: { sortable: column.sortable, title: column.title },
    accessor: column.field,
    ...sizes,
    Cell: ({ value }) => {
      if (isObject(value)) {
        const native = getLinkIsNative(value.reference);
        return (
          <TypographyLink to={value.reference} native={native} target={native ? "_blank" : "_self"}>
            {value.value}
          </TypographyLink>
        );
      }
      return <Typography>{value}</Typography>;
    },
  } as Column<any>;
}

export function useColumns(columns: TableViewDataSource["columns"]) {
  return React.useMemo(() => columns.map(prepareColumn), []);
}

export function useSorting() {
  const [currentSortingField, setCurrentSortingField] = React.useState<{
    type: TableSortingType;
    field: string;
  } | null>(null);

  const nextSorting = React.useCallback(
    (field: string) => {
      if (!currentSortingField) {
        setCurrentSortingField({ type: TableSortingType.ASC, field });
        return;
      }

      if (currentSortingField.field !== field) {
        setCurrentSortingField({ field, type: TableSortingType.ASC });
        return;
      }

      if (currentSortingField.type === TableSortingType.DESC) {
        setCurrentSortingField(null);
        return;
      }

      setCurrentSortingField({ field, type: TableSortingType.DESC });
    },
    [currentSortingField],
  );

  return {
    currentSortingField,
    nextSorting,
  };
}

export type UseSortingType = ReturnType<typeof useSorting>;
