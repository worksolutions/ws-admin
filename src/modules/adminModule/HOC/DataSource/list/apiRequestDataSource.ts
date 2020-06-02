import { Container } from "typedi";

import { RequestManager, METHODS } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";

import { DataSourceInterface, DataSourceType } from "../DataSourceHOC";
import { insertContext } from "../../../context";

const requestManager = Container.get(RequestManager);

export default function (dataSource: DataSourceInterface<DataSourceType.API_REQUEST>, state: any): Promise<any> {
  const { method = METHODS.GET, params, url } = dataSource.options;
  const makeRequest = requestManager.createRequest(insertContext(url, state), method, identityValueDecoder);
  return makeRequest({ body: insertContext(params, state) }).catch(console.error);
}
