import { Container } from "typedi";

import { REQUEST_CANCELLED, RequestError, RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";

import { insertContext } from "modules/context/insertContext";
import { AppContextStateInterface } from "modules/context/hooks/useAppContext";
import { prepareApiRequestBody } from "modules/context/requestLibs";

import { DataSourceInterface, DataSourceType } from "types/DataSource";

const requestManager = Container.get(RequestManager);

function apiRequestDataSource(
  dataSource: DataSourceInterface<DataSourceType.API_REQUEST>,
  context: AppContextStateInterface,
) {
  const {
    method,
    body,
    reference,
    removeEmptyString = true,
    removeNullableFields = true,
    cancellable = true,
  } = dataSource.options;
  const referenceWithContext = insertContext(reference, context);
  const bodyWithContext = insertContext(body, context);
  const makeRequest = requestManager.createRequest(referenceWithContext.value, method, identityValueDecoder);

  const preparedBody = prepareApiRequestBody({ removeEmptyString, removeNullableFields }, bodyWithContext.value);
  return {
    referenceWithContext,
    bodyWithContext,
    request: new Promise((resolve, reject) => {
      makeRequest({
        body: preparedBody,
        options: {
          cancelName: cancellable ? requestManager.makeCancelName(referenceWithContext.value, method) : undefined,
        },
      })
        .then(resolve)
        .catch((err: RequestError) => {
          if (err.getMessage() === REQUEST_CANCELLED) return;
          reject(err);
        });
    }),
  };
}

export default function apiRequestDataSourceFetcher(
  dataSource: DataSourceInterface<DataSourceType.API_REQUEST>,
  context: AppContextStateInterface,
  {
    onDataReceived,
    onReceiveDataError,
  }: { onDataReceived: (data: any) => void; onReceiveDataError: (data: any) => void },
) {
  const apiRequest = apiRequestDataSource(dataSource, context);
  apiRequest.request.then(onDataReceived).catch(onReceiveDataError);
  return apiRequest;
}
