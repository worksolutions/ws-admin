import { DataSourceInterface, DataSourceType } from "types/DataSource";

export default function staticDataSource(dataSource: DataSourceInterface<DataSourceType.STATIC>): Promise<any> {
  return Promise.resolve(dataSource.options);
}
