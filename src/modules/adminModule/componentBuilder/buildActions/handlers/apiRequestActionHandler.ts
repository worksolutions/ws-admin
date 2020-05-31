import { createRequest, METHODS } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";

import {
  ActionHandlerOptions,
  ActionHandlerType,
  ActionInterface,
} from "../../../types";
import { insertContext } from "../../../context";

export default function (
  options: ActionHandlerOptions[ActionHandlerType.API_REQUEST],
  context: any,
): ActionInterface {
  return (localContext) =>
    createRequest(
      options.url,
      options.method ? options.method : METHODS.GET,
      identityValueDecoder,
    )({
      body: insertContext(options.params, { ...context, ...localContext }),
    });
}
