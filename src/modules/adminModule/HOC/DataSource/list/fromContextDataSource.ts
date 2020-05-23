import { DataSourceInterface, DataSourceType } from "../DataSourceHOC";
import { path } from "ramda";

export default function (
  dataSource: DataSourceInterface<DataSourceType.CONTEXT>,
  state: any,
): Promise<any> {
  return Promise.resolve(path(dataSource.options.key.split("."), state));
}
