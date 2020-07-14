import { Container } from "typedi";

import { RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";

import { insertContext } from "modules/context/insertContext";
import { AppContextStateInterface } from "modules/context/hooks/useAppContext";

import { ActionInputDataInterface } from "../types";

import { ActionOptions, ActionType } from "types/Actions";

const requestManager = Container.get(RequestManager);

export default function apiRequest(
  appContext: AppContextStateInterface,
  actionOptions: ActionOptions[ActionType.API_REQUEST],
  inputData: ActionInputDataInterface,
): Promise<any> {
  const { method, body, url } = actionOptions;
  const makeRequest = requestManager.createRequest(
    insertContext(url, appContext, inputData),
    method,
    identityValueDecoder,
  );
  return makeRequest({ body: insertContext({ ...body, ...inputData }, appContext, inputData) });
}
