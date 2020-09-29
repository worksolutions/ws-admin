import { isNil, path } from "ramda";

import { splitByPoint } from "libs/path";

import { AppContextStateInterface } from "modules/context/hooks/useAppContext";
import { getContextTypeAndPathByParam } from "modules/context/contextParamParser";

import { DataSourceInterface, DataSourceType } from "types/DataSource";

export default function contextDataSource(
  dataSource: DataSourceInterface<DataSourceType.CONTEXT>,
  context: AppContextStateInterface,
) {
  const dependency = getContextTypeAndPathByParam(dataSource.options.key);
  const value: any = path([dependency.type, ...splitByPoint(dependency.path)], context);
  return { dependency, value: isNil(value) ? null : value };
}
