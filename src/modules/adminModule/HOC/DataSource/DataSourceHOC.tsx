import React, { FC, useEffect, useState } from "react";

import { METHODS } from "libs/request";

import { AdminComponentInterface } from "../../types";

import listDataSource from "./list/listDataSource";
import apiRequestDataSource from "./list/apiRequestDataSource";
import fromContextDataSource from "./list/fromContextDataSource";

export enum DataSourceType {
  LIST = "list",
  API_REQUEST = "api",
  CONTEXT = "context",
}

type DataSourceOptions = {
  [DataSourceType.LIST]: { data: any[] };
  [DataSourceType.CONTEXT]: { key: string };
  [DataSourceType.API_REQUEST]: {
    url: string;
    method?: METHODS;
    params?: {
      [key: string]: string | number;
    };
  };
};

export interface DataSourceInterface<T extends DataSourceType> {
  type: T;
  options: DataSourceOptions[T];
}

export default function <P>(Cmp: FC<P & AdminComponentInterface>, state: any) {
  return function (props: P & { dataSource: DataSourceInterface<any> }) {
    const { dataSource } = props;

    const [data, setData] = useState(undefined);

    switch (dataSource.type) {
      case DataSourceType.LIST:
        listDataSource(dataSource).then(setData);
        break;
      case DataSourceType.API_REQUEST:
        apiRequestDataSource(dataSource, state).then(setData);
        break;
      case DataSourceType.CONTEXT:
        fromContextDataSource(dataSource, state).then(setData);
        break;
      default:
        console.error(
          `Указан неизвестный тип источника данных. [${dataSource.type}]`,
        );
        break;
    }

    if (data === undefined) {
      return null;
    }
    return <Cmp {...(props as P)} data={data} />;
  };
}

export const useDataSource = (
  dataSource,
  {
    context,
    updatePageState,
  }: {
    context: any;
    updatePageState: ({ path: string, data: any }) => void;
  },
) => {
  const [data, setData] = useState();

  function onDataReceived(data: any) {
    setData(data);
    if (dataSource && dataSource.context) {
      updatePageState({
        path: dataSource.context,
        data,
      });
    }
  }

  useEffect(() => {
    if (!dataSource) return undefined;
    switch (dataSource.type) {
      case DataSourceType.LIST:
        listDataSource(dataSource).then(onDataReceived);
        break;
      case DataSourceType.API_REQUEST:
        apiRequestDataSource(dataSource, context).then(onDataReceived);
        break;
      default:
        console.error(
          `Указан неизвестный тип источника данных. [${dataSource.type}]`,
        );
        break;
    }
    // eslint-disable-next-line
  }, []);

  return data;
};
