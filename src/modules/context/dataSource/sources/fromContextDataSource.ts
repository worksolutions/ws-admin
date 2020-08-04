import { isNil, path } from "ramda";

import { AppContextStateInterface } from "modules/context/hooks/useAppContext";
import { getContextTypeAndPathByParam } from "modules/context/contextParamParser";

import { DataSourceInterface, DataSourceType } from "types/DataSource";

export default function fromContextDataSource(
  dataSource: DataSourceInterface<DataSourceType.CONTEXT>,
  context: AppContextStateInterface,
): Promise<any> {
  const dependency = getContextTypeAndPathByParam(dataSource.options.key);
  const value = path([dependency.type, ...dependency.path.split(".")], context);
  return Promise.resolve(isNil(value) ? null : value);
}
