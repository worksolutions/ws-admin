import { isNil, path } from "ramda";

import { getConfigPartDependencies } from "../../configPartDependencies";

import { DataSourceInterface, DataSourceType } from "types/DataSource";

export default function fromContextDataSource(
  dataSource: DataSourceInterface<DataSourceType.CONTEXT>,
  context: any,
): Promise<any> {
  const [dependency] = getConfigPartDependencies(dataSource);
  const value = path([dependency.type, ...dependency.path.split(".")], context);
  return Promise.resolve(isNil(value) ? null : value);
}
