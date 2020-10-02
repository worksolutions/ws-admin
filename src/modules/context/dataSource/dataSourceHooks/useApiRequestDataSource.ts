import { Lambda } from "mobx";
import { clone, isNil } from "ramda";
import { useLocalStore } from "mobx-react-lite";
import { useEffect } from "react";

import { RequestError } from "libs/request";
import { useEventEmitter } from "libs/events";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { insertContext } from "modules/context/insertContext";
import globalEventBus from "modules/globalEventBus";

import apiRequestDataSourceFetcher from "./sources/apiRequestDataSourceFetcher";
import { DataSourceResultInterface, makeOnDependencyChangeUpdater } from "./common";

import { LoadingContainer } from "state/loadingContainer";

import { DataSourceInterface, DataSourceType } from "types/DataSource";

export default function useApiRequestDataSource<RESULT = any>(
  dataSource: DataSourceInterface<DataSourceType.API_REQUEST>,
  initialData: RESULT,
) {
  const { context, updateState } = useAppContext();

  const disposers: Lambda[] = [];

  useEffect(() => () => disposers.forEach((disposer) => disposer()), []);

  function runDataSourceContextObserver() {
    const { dependencies } = insertContext(`=${dataSource.context}`, context);

    dependencies.forEach((dependency) => {
      const disposer = makeOnDependencyChangeUpdater(
        context,
        () => {
          localStore.data = insertContext(`=${dataSource.context}`, context).value;
        },
        true,
      )(dependency);
      disposers.push(disposer);
    });
  }
  const localStore = useLocalStore<DataSourceResultInterface<RESULT>>(() => {
    if (dataSource.context) runDataSourceContextObserver();

    return {
      data: initialData,
      initialData,
      loadingContainer: new LoadingContainer(true),
      reload: runDataSourceFetcher,
      updateInitial: () => undefined,
    };
  });

  useEventEmitter(globalEventBus, "FORCE_DATA_SOURCE_RELOAD", (id) => {
    if (isNil(dataSource.options.id)) return;
    if (id !== dataSource.options.id) return;
    localStore.reload();
  });

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
        ...apiRequestResult.bodyWithContext.dependencies.map(
          makeOnDependencyChangeUpdater(context, runApiRequestLogic),
        ),
        ...apiRequestResult.referenceWithContext.dependencies.map(
          makeOnDependencyChangeUpdater(context, runApiRequestLogic),
        ),
      );
    }

    return () => allApiDisposers.forEach((disposer) => disposer());
  }

  useEffect(runDataSourceFetcher, []);

  return localStore;
}
