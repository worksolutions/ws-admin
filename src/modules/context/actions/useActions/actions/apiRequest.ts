import { Container } from "typedi";

import { RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";

import { insertContext } from "../../../../admin/context";
import { AppContextStateInterface } from "../../../hooks/useAppContext";

import { ActionOptions, ActionType } from "types/Actions";

const requestManager = Container.get(RequestManager);

export default function apiRequest(
  { method, body, url }: ActionOptions[ActionType.API_REQUEST],
  context: AppContextStateInterface,
): Promise<any> {
  const makeRequest = requestManager.createRequest(insertContext(url, context), method, identityValueDecoder);
  return makeRequest({ body: insertContext(body, context) });
}
