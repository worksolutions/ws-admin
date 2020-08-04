import { useEffect } from "react";
import { isNil, last } from "ramda";
import { useLocalStore } from "mobx-react-lite";
import { Lambda, observe, toJS } from "mobx";

import { RequestError } from "libs/request";
import { path } from "libs/path";

import { useAppContext } from "../hooks/useAppContext";
import { InsertContextResult } from "../insertContext";

import { runContextDataSourceFetcher } from "./sourceFetchers/context";
import { runStaticListDataSourceFetcher } from "./sourceFetchers/static";
import { runApiRequestDataSourceFetcher } from "./sourceFetchers/apiRequest";

import { LoadingContainer } from "state/loadingContainer";

import { AnyDataSource } from "types/DataSource";

export interface DataSourceResultInterface<RESULT = any> {
  data: RESULT | null;
  loadingContainer: LoadingContainer;
  reload: () => void;
}

export function useDataSource<RESULT = any>(dataSource: AnyDataSource) {
  const localStore = useLocalStore<DataSourceResultInterface<RESULT>>(() => ({
    data: null,
    loadingContainer: new LoadingContainer(true),
    reload: runDataSourceFetcher,
  }));

  const { context, updateState } = useAppContext();

  function onDataReceived(data: any) {
    localStore.data = data;
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
    return runApiRequestDataSourceFetcher(dataSource, context, {
      onDataReceived,
      onReceiveDataError: onApiRequestReceiveDataError,
    });
  }

  function runDataSourceFetcher() {
    if (!dataSource) return () => {};
    runStaticListDataSourceFetcher(dataSource, onDataReceived);
    runContextDataSourceFetcher(dataSource, context, onDataReceived);
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
