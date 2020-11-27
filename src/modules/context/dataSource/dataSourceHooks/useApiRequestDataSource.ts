import { Lambda } from "mobx";
import { clone, isNil } from "ramda";
import { useLocalStore } from "mobx-react-lite";
import { useEffect } from "react";

import { RequestError } from "libs/request";

import { convertContextDependencyToUpdateStatePayload, useAppContext } from "modules/context/hooks/useAppContext";
import { insertContext } from "modules/context/insertContext";

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
    const contextPath = `=${dataSource.contextPath}`;
    const { dependencies } = insertContext(contextPath, context);

    dependencies.forEach((dependency) => {
      if (!isNil(initialData)) {
        updateState(convertContextDependencyToUpdateStatePayload(initialData)(dependency));
        //TODO: убрать и подписаться на изменения после получения данных
      }

      const disposer = makeOnDependencyChangeUpdater(
        context,
        () => {
          localStore.data = insertContext(contextPath, context).value;
        },
        true,
      )(dependency);
      disposers.push(disposer);
    });
  }

  const localStore = useLocalStore<DataSourceResultInterface<RESULT>>(() => {
    if (dataSource.contextPath) runDataSourceContextObserver();

    return {
      data: initialData,
      initialData,
      loadingContainer: new LoadingContainer(true),
      reload: runDataSourceFetcher,
      updateInitial: () => undefined,
      reset: () => onDataReceived(initialData, true),
    };
  });

  function onDataReceived(data: any, overridePrevious?: boolean) {
    localStore.data = data;
    if (!localStore.initialData) {
      localStore.initialData = clone(data);
    }
    localStore.loadingContainer.stopLoading();
    localStore.loadingContainer.clearErrors();

    if (isNil(data)) return;

    if (dataSource.contextPath) {
      updateState({ path: dataSource.contextPath, data }, overridePrevious);
    }
  }

  function onApiRequestReceiveDataError(requestError: RequestError) {
    localStore.data = null;
    localStore.loadingContainer.stopLoading();
    localStore.loadingContainer.setErrors(requestError.error.errors);
    localStore.loadingContainer.setDefaultError(requestError.error.message);
    if (!dataSource.contextPath) return;

    updateState({
      path: dataSource.contextPath + "_error",
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
