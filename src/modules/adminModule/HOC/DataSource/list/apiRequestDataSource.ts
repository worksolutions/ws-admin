import { DataSourceInterface, DataSourceType } from "../DataSourceHOC";
import { createRequest, METHODS } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";
import { insertContext } from "../../../context";

export default function (
  dataSource: DataSourceInterface<DataSourceType.API_REQUEST>,
  state: any,
): Promise<any> {
  const { method = METHODS.GET, params, url } = dataSource.options;
  return createRequest(
    url,
    method,
    identityValueDecoder,
  )({ body: insertContext(params, state) });
}
