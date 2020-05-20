import { DataSourceInterface, DataSourceType } from "../DataSourceHOC";

export default function (
  dataSource: DataSourceInterface<DataSourceType.LIST>,
): Promise<any> {
  return Promise.resolve(dataSource.options.data);
}
