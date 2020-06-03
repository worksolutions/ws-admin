import { path } from "ramda";

import { DataSourceInterface, DataSourceType } from "../DataSourceHOC";

export default function (dataSource: DataSourceInterface<DataSourceType.CONTEXT>, state: any): Promise<any> {
  return Promise.resolve(path(dataSource.options.key.split("."), state));
}
