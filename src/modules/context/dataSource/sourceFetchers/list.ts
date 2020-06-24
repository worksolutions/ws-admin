import listDataSource from "../sources/listDataSource";

import { AnyDataSource, DataSourceType } from "types/DataSource";

export function runListDataSourceFetcher(dataSource: AnyDataSource, onDataReceived: (data: any) => void) {
  if (dataSource.type !== DataSourceType.LIST) return;
  listDataSource(dataSource).then(onDataReceived);
}
