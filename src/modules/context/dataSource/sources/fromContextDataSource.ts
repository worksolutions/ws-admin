import { isNil, path } from "ramda";

import { getConfigPartDependencies } from "../../configPartDependencies";
import { AppContextStateInterface } from "../../hooks/useAppContext";

import { DataSourceInterface, DataSourceType } from "types/DataSource";

export default function fromContextDataSource(
  dataSource: DataSourceInterface<DataSourceType.CONTEXT>,
  context: AppContextStateInterface,
): Promise<any> {
  const [dependency] = getConfigPartDependencies(dataSource);
  const value = path([dependency.type, ...dependency.path.split(".")], context);
  return Promise.resolve(isNil(value) ? null : value);
}
