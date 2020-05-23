import React, { FC, useState } from "react";
import listDataSource from "./list/listDataSource";
import apiRequestDataSource from "./list/apiRequestDataSource";
import { METHODS } from "libs/request";
import { AdminComponentInterface } from "../../types";

export enum DataSourceType {
  LIST = "list",
  API_REQUEST = "api",
}

type DataSourceOptions = {
  [DataSourceType.LIST]: { data: any[] };
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
