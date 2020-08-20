import { isNil, path } from "ramda";

import { AppContextStateInterface } from "modules/context/hooks/useAppContext";
import { getContextTypeAndPathByParam } from "modules/context/contextParamParser";

import { DataSourceInterface, DataSourceType } from "types/DataSource";

export default function contextDataSource(
  dataSource: DataSourceInterface<DataSourceType.CONTEXT>,
  context: AppContextStateInterface,
) {
  const dependency = getContextTypeAndPathByParam(dataSource.options.key);
  const value: any = path([dependency.type, ...dependency.path.split(".")], context);
  return isNil(value) ? null : value;
}
