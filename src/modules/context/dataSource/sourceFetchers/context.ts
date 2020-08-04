import { isNil } from "ramda";

import { AppContextStateInterface } from "modules/context/hooks/useAppContext";

import fromContextDataSource from "../sources/fromContextDataSource";

import { AnyDataSource, DataSourceType } from "types/DataSource";

export function runContextDataSourceFetcher(
  dataSource: AnyDataSource,
  context: AppContextStateInterface,
  onDataReceived: (data: any) => void,
) {
  if (dataSource.type !== DataSourceType.CONTEXT) return () => null;

  fromContextDataSource(dataSource, context).then((value) => {
    if (isNil(value)) return;
    onDataReceived(value);
  });
}
