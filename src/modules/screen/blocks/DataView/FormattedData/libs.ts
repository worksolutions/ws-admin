import React from "react";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { useDataSource } from "modules/context/dataSource/useDataSource";

import { ViewMetaData } from "../types";

import { FormattedDataViewPagination } from "./types";

import { LoadingContainer } from "state/loadingContainer";

import { PaginationInterface, PaginationMeta } from "types/Pagination";

export function useFormattedDataLoader(
  data: { pagination: PaginationMeta } | null,
  loadingContainer: LoadingContainer,
  onUpdateMeta: (data: ViewMetaData) => void,
) {
  React.useEffect(() => {
    if (!onUpdateMeta) return;
    onUpdateMeta({ loading: loadingContainer.loading });
  }, [loadingContainer.loading]);

  React.useEffect(() => {
    if (!onUpdateMeta) return;
    if (!data) return;
    onUpdateMeta({ pagination: data.pagination });
  }, [data]);
}

export const formattedDataLocalStorageInitialValue = { mode: "cards", perPage: 0 };

export function usePagination(paginationView: FormattedDataViewPagination) {
  const appContext = useAppContext();
  const actions = useActions(paginationView.actions!, appContext);

  const data = useDataSource<PaginationInterface>(paginationView.dataSource!);
  const show = data.data && actions.change;
  return { actions, data, show: !!show };
}
