import { Lambda, observe } from "mobx";
import { clone, isNil, last } from "ramda";
import { useLocalStore } from "mobx-react-lite";
import { useEffect } from "react";

import { path } from "libs/path";
import { RequestError } from "libs/request";

import { InsertContextResult } from "modules/context/insertContext";
import { useAppContext } from "modules/context/hooks/useAppContext";

import apiRequestDataSourceFetcher from "./sources/apiRequestDataSourceFetcher";
import { DataSourceResultInterface } from "./common";

import { LoadingContainer } from "state/loadingContainer";

import { DataSourceInterface, DataSourceType } from "types/DataSource";

export default function useApiRequestDataSource<RESULT = any>(
  dataSource: DataSourceInterface<DataSourceType.API_REQUEST>,
  initialData: RESULT,
) {
  const localStore = useLocalStore<DataSourceResultInterface<RESULT>>(() => ({
    data: initialData,
    initialData,
    loadingContainer: new LoadingContainer(true),
    reload: runDataSourceFetcher,
    updateInitial: () => undefined,
  }));

  const { context, updateState } = useAppContext();

  function onDataReceived(data: any) {
    localStore.data = data;
    if (!localStore.initialData) {
      localStore.initialData = clone(data);
    }
    localStore.loadingContainer.stopLoading();
    localStore.loadingContainer.clearErrors();

    if (isNil(data)) return;

    if (dataSource.context) {
      updateState({ path: dataSource.context, data });
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

  function runApiRequestLogic() {
    localStore.loadingContainer.startLoading();
    return apiRequestDataSourceFetcher(dataSource, context, {
      onDataReceived,
      onReceiveDataError: onApiRequestReceiveDataError,
    });
  }

  function runDataSourceFetcher() {
    if (!dataSource) return () => {};
    const apiRequestResult = runApiRequestLogic();

    const allApiDisposers: Lambda[] = [];
    if (apiRequestResult?.bodyWithContext.value) {
      allApiDisposers.push(
        ...makeOnDependencyChangeUpdater(apiRequestResult.bodyWithContext, context, runApiRequestLogic),
        ...makeOnDependencyChangeUpdater(apiRequestResult.referenceWithContext, context, runApiRequestLogic),
      );
    }

    return () => allApiDisposers.forEach((disposer) => disposer());
  }

  useEffect(runDataSourceFetcher, []);

  return localStore;
}

function makeOnDependencyChangeUpdater(insertContextResult: InsertContextResult, context: any, onUpdate: () => void) {
  return insertContextResult.dependencies.map((dependency) =>
    observe(path([dependency.contextType, ...dependency.path.slice(0, -1)], context), last(dependency.path), onUpdate),
  );
}
