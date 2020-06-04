import { path } from "ramda";

import { DataSourceInterface, DataSourceType } from "types/DataSource";

export default function fromContextDataSource(
  dataSource: DataSourceInterface<DataSourceType.CONTEXT>,
  state: any,
): Promise<any> {
  return Promise.resolve(path(dataSource.options.key.split("."), state));
}
