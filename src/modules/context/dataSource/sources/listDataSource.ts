import { DataSourceInterface, DataSourceType } from "types/DataSource";

export default function listDataSource(dataSource: DataSourceInterface<DataSourceType.LIST>): Promise<any> {
  return Promise.resolve(dataSource.options);
}
