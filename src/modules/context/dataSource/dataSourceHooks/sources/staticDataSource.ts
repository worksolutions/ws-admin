import { DataSourceInterface, DataSourceType } from "types/DataSource";

export default function staticDataSource(dataSource: DataSourceInterface<DataSourceType.STATIC>) {
  return dataSource.options;
}
