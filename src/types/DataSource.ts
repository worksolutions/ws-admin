import { METHODS } from "libs/request";

export enum DataSourceType {
  LIST = "list",
  API_REQUEST = "api:request",
  CONTEXT = "context",
}

type DataSourceOptions = {
  [DataSourceType.LIST]: any;
  [DataSourceType.CONTEXT]: { key: string };
  [DataSourceType.API_REQUEST]: {
    url: string;
    method: METHODS;
    params?: {
      [key: string]: string | number;
    };
  };
};

export interface DataSourceInterface<T extends DataSourceType> {
  type: T;
  options: DataSourceOptions[T];
  context?: string;
}

export type ContainsDataSourceInterface<DataSource> = {
  dataSource: DataSource;
};

export type AnyDataSource =
  | DataSourceInterface<DataSourceType.API_REQUEST>
  | DataSourceInterface<DataSourceType.CONTEXT>
  | DataSourceInterface<DataSourceType.LIST>;
