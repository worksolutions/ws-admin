import {
  ActionHandlerOptions,
  ActionHandlerType,
  ActionInterface,
} from "../../../types";
import { insertContext } from "../../../context";
import { createRequest, METHODS } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";

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
    }).catch(console.error);
}
