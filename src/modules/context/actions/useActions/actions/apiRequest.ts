import { Container } from "typedi";

import { RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";
import { isPureObject } from "libs/is";

import { insertContext } from "modules/context/insertContext";
import { AppContextInterface } from "modules/context/hooks/useAppContext";
import { prepareApiRequestBody } from "modules/context/requestLibs";

import { ActionInputDataInterface } from "../types";

import { ActionType, RawActionOptions } from "types/Actions";

const requestManager = Container.get(RequestManager);

export default async function apiRequest(
  appContext: AppContextInterface,
  actionOptions: RawActionOptions[ActionType.API_REQUEST],
  { inputData: inputDataProp, previousActionOutput }: ActionInputDataInterface,
): Promise<any> {
  const inputData = actionOptions.takeIncomeDataFromPreviousAction ? previousActionOutput : inputDataProp;

  const { method, body, reference, removeEmptyString = true, removeNullableFields = true } = actionOptions;

  const makeRequest = requestManager.createRequest(
    insertContext(reference, appContext.context, inputData).value,
    method,
    identityValueDecoder,
  );

  const preparedBody = prepareApiRequestBody({ removeEmptyString, removeNullableFields }, body);
  const newBody = isPureObject(inputData)
    ? insertContext(Object.assign({}, preparedBody, inputData), appContext.context, inputData).value
    : insertContext(preparedBody, appContext.context, inputData).value;

  const response = await makeRequest({
    body: prepareApiRequestBody({ removeEmptyString, removeNullableFields }, newBody),
  });

  if (actionOptions.saveToContext) appContext.updateState({ path: actionOptions.saveToContext, data: response });

  return response;
}
