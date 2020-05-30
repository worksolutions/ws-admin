import { createRequest, METHODS } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";

import { DataSourceInterface, DataSourceType } from "../DataSourceHOC";
import { insertContext } from "../../../context";

export default function (
  dataSource: DataSourceInterface<DataSourceType.API_REQUEST>,
  state: any,
): Promise<any> {
  const { method = METHODS.GET, params, url } = dataSource.options;
  return createRequest(
    insertContext(url, state),
    method,
    identityValueDecoder,
  )({ body: insertContext(params, state) }).catch(console.error);
}
