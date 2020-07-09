import staticDataSource from "../sources/staticDataSource";

import { AnyDataSource, DataSourceType } from "types/DataSource";

export function runStaticListDataSourceFetcher(dataSource: AnyDataSource, onDataReceived: (data: any) => void) {
  if (dataSource.type !== DataSourceType.STATIC) return;
  staticDataSource(dataSource).then(onDataReceived);
}
