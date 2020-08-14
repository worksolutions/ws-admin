import { Container } from "typedi";

import { REQUEST_CANCELLED, RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";
import { prepareApiRequestBody } from "libs/requestLibs";

import { insertContext } from "modules/context/insertContext";
import { AppContextStateInterface } from "modules/context/hooks/useAppContext";

import { DataSourceInterface, DataSourceType } from "types/DataSource";

const requestManager = Container.get(RequestManager);

export default function apiRequestDataSource(
  dataSource: DataSourceInterface<DataSourceType.API_REQUEST>,
  context: AppContextStateInterface,
) {
  const { method, params, reference, removeEmptyString = true } = dataSource.options;
  const referenceWithContext = insertContext(reference, context);
  const bodyWithContext = insertContext(params, context);
  const makeRequest = requestManager.createRequest(referenceWithContext.value, method, identityValueDecoder);

  const body = prepareApiRequestBody({ removeEmptyString }, bodyWithContext.value);
  return {
    referenceWithContext,
    bodyWithContext,
    request: new Promise((resolve, reject) => {
      makeRequest({
        body,
        options: { cancelName: requestManager.makeCancelName(referenceWithContext.value, method) },
      })
        .then(resolve)
        .catch((err) => {
          if (err === REQUEST_CANCELLED) return;
          reject(err);
        });
    }),
  };
}
