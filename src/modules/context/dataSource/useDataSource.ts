import { useEffect, useState } from "react";

import calculateConfigPartDependencies from "../calculateConfigPartDependencies";
import { buildDependsContext, useAppContext } from "../../admin/context";

import listDataSource from "./sources/listDataSource";
import fromContextDataSource from "./sources/fromContextDataSource";
import apiRequestDataSource from "./sources/apiRequestDataSource";

import { AnyDataSource, DataSourceType } from "types/DataSource";

export const useDataSource = (dataSource: AnyDataSource) => {
  const { context, updateState } = useAppContext();
  const contextDependencies = calculateConfigPartDependencies(dataSource);
  const newContext = buildDependsContext(contextDependencies, context);
  const [data, setData] = useState<any>();

  function onDataReceived(data: any) {
    setData(data);
    if (dataSource.context) {
      updateState({
        path: dataSource.context,
        data,
      });
    }
  }

  useEffect(() => {
    if (!dataSource) return;
    switch (dataSource.type) {
      case DataSourceType.LIST:
        listDataSource(dataSource).then(onDataReceived);
        break;
      case DataSourceType.API_REQUEST:
        apiRequestDataSource(dataSource, newContext).then(onDataReceived);
        break;
      case DataSourceType.CONTEXT:
        fromContextDataSource(dataSource, newContext).then(setData);
      default:
        console.error(`Указан неизвестный тип источника данных. [${dataSource.type}]`);
        break;
    }
  }, [dataSource]);

  return data;
};
