import { useEffect } from "react";
import { isNil } from "ramda";
import { useLocalStore } from "mobx-react-lite";

import { RequestError } from "libs/request";

import { useAppContext } from "../hooks/useAppContext";

import { runContextDataSourceFetcher } from "./sourceFetchers/context";
import { runStaticListDataSourceFetcher } from "./sourceFetchers/static";
import { runApiRequestDataSourceFetcher } from "./sourceFetchers/apiRequest";

import { LoadingContainer } from "state/loadingContainer";

import { AnyDataSource } from "types/DataSource";

interface DataInterface<RESULT = any> {
  data: RESULT | null;
  loadingContainer: LoadingContainer;
  reload: () => void;
}

export function useDataSource<RESULT = any>(dataSource: AnyDataSource) {
  const localStore = useLocalStore<DataInterface<RESULT>>(() => ({
    data: null,
    loadingContainer: new LoadingContainer(true),
    reload: runDataSourceFetcher,
  }));

  if (!dataSource) return localStore;

  const { context, updateState } = useAppContext();

  function onDataReceived(data: any) {
    localStore.data = data;
    localStore.loadingContainer.stopLoading();
    localStore.loadingContainer.clearErrors();

    if (isNil(data)) return;

    if (dataSource.context) {
      updateState({
        path: dataSource.context,
        data,
      });
    }
  }

  function onApiRequestReceiveDataError(requestError: RequestError) {
    localStore.data = null;
    localStore.loadingContainer.stopLoading();
    localStore.loadingContainer.setErrors(requestError.error.errors);
    localStore.loadingContainer.setDefaultError(requestError.error.message);
    if (!dataSource.context) return;
    updateState({
      path: dataSource.context + "_error",
      data: requestError.error.message,
    });
  }

  function runDataSourceFetcher() {
    runStaticListDataSourceFetcher(dataSource, onDataReceived);
    runContextDataSourceFetcher(dataSource, context, onDataReceived);
    runApiRequestDataSourceFetcher(dataSource, context, {
      onDataReceived,
      onReceiveDataError: onApiRequestReceiveDataError,
    });
  }

  useEffect(runDataSourceFetcher, []);

  return localStore;
}
