import { Container } from "typedi";

import { RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";

import { insertContext } from "../../../admin/context";

import { DataSourceInterface, DataSourceType } from "types/DataSource";

const requestManager = Container.get(RequestManager);

export default function apiRequestDataSource(
  dataSource: DataSourceInterface<DataSourceType.API_REQUEST>,
  state: any,
): Promise<any> {
  const { method, params, url } = dataSource.options;
  const makeRequest = requestManager.createRequest(insertContext(url, state), method, identityValueDecoder);
  return makeRequest({ body: insertContext(params, state) }).catch(console.error);
}
