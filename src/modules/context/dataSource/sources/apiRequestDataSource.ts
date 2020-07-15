import { Container } from "typedi";

import { RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";

import { insertContext } from "modules/context/insertContext";
import { AppContextStateInterface } from "modules/context/hooks/useAppContext";

import { DataSourceInterface, DataSourceType } from "types/DataSource";

const requestManager = Container.get(RequestManager);

export default function apiRequestDataSource(
  dataSource: DataSourceInterface<DataSourceType.API_REQUEST>,
  context: AppContextStateInterface,
): Promise<any> {
  const { method, params, reference } = dataSource.options;
  const makeRequest = requestManager.createRequest(insertContext(reference, context), method, identityValueDecoder);
  return makeRequest({ body: insertContext(params, context) });
}
