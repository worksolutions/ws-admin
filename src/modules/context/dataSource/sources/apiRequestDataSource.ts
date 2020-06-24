import { Container } from "typedi";

import { RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";

import { insertContext } from "../../../admin/context";

import { DataSourceInterface, DataSourceType } from "types/DataSource";

const requestManager = Container.get(RequestManager);

export default function apiRequestDataSource(
  dataSource: DataSourceInterface<DataSourceType.API_REQUEST>,
  context: any,
): Promise<any> {
  const { method, params, url } = dataSource.options;
  const makeRequest = requestManager.createRequest(insertContext(url, context), method, identityValueDecoder);
  return makeRequest({ body: insertContext(params, context) }).catch(console.error);
}
