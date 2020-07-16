import { AppContextStateInterface } from "modules/context/hooks/useAppContext";

import apiRequestDataSource from "../sources/apiRequestDataSource";

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
  const apiRequest = apiRequestDataSource(dataSource, context);
  apiRequest.request.then(onDataReceived).catch(onReceiveDataError);
  return apiRequest;
}
