import { Container } from "typedi";

import { RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";
import { isPureObject } from "libs/is";

import { insertContext } from "modules/context/insertContext";
import { AppContextStateInterface } from "modules/context/hooks/useAppContext";
import { prepareApiRequestBody } from "modules/context/requestLibs";

import { ActionInputDataInterface } from "../types";

import { RawActionOptions, ActionType } from "types/Actions";

const requestManager = Container.get(RequestManager);

export default function apiRequest(
  appContext: AppContextStateInterface,
  actionOptions: RawActionOptions[ActionType.API_REQUEST],
  { inputData }: ActionInputDataInterface,
): Promise<any> {
  const { method, body, reference, removeEmptyString = true } = actionOptions;

  const makeRequest = requestManager.createRequest(
    insertContext(reference, appContext, inputData).value,
    method,
    identityValueDecoder,
  );

  const preparedBody = prepareApiRequestBody({ removeEmptyString }, body);

  if (isPureObject(inputData)) {
    return makeRequest({
      body: insertContext(Object.assign({}, preparedBody, inputData), appContext, inputData).value,
    });
  }

  return makeRequest({
    body: insertContext(preparedBody, appContext, inputData).value,
  });
}
