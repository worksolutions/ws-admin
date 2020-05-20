import { DataSourceInterface, DataSourceType } from "../DataSourceHOC";
import { createRequest, METHODS } from "libs/request";
import { identityValueDecoder } from "../../../../../libs/request/defaultDecoders";

export default function (
  dataSource: DataSourceInterface<DataSourceType.API_REQUEST>,
): Promise<any> {
  const { method = METHODS.GET, params, url } = dataSource.options;
  return createRequest(url, method, identityValueDecoder)({ body: params });
}
