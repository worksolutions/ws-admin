import { ActionHandlerOptions, ActionHandlerType } from "../../../types";
import { insertContext } from "../../../context";
import { createRequest, METHODS } from "../../../../../libs/request";
import { identityValueDecoder } from "../../../../../libs/request/defaultDecoders";

export default function (
  options: ActionHandlerOptions[ActionHandlerType.API_REQUEST],
  _: any,
  state: any,
): () => Promise<any> {
  return () =>
    createRequest(
      options.url,
      options.method ? options.method : METHODS.GET,
      identityValueDecoder,
    )({ body: insertContext(options.params, state) });
}
