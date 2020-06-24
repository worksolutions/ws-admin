import apiRequestDataSource from "../sources/apiRequestDataSource";
import { AppContextInterface } from "../../hooks/useAppContext";

import { AnyDataSource, DataSourceType } from "types/DataSource";

export function runApiRequestDataSourceFetcher(
  dataSource: AnyDataSource,
  context: AppContextInterface,
  onDataReceived: (data: any) => void,
) {
  if (dataSource.type !== DataSourceType.API_REQUEST) return;
  apiRequestDataSource(dataSource, context).then(onDataReceived);
}
