import apiRequestDataSource from "../sources/apiRequestDataSource";
import { AppContextStateInterface } from "../../hooks/useAppContext";

import { AnyDataSource, DataSourceType } from "types/DataSource";

export function runApiRequestDataSourceFetcher(
  dataSource: AnyDataSource,
  context: AppContextStateInterface,
  {
    onDataReceived,
    onReceiveDataError,
  }: { onDataReceived: (data: any) => void; onReceiveDataError: (data: any) => void },
) {
  if (dataSource.type !== DataSourceType.API_REQUEST) return;
  apiRequestDataSource(dataSource, context).then(onDataReceived).catch(onReceiveDataError);
}
