import { METHODS, RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";

import { ActionHandlerOptions, ActionHandlerType, ActionInterface } from "../../../types";
import { insertContext } from "../../../context";
import { Container } from "typedi";

const requestManager = Container.get(RequestManager);

export default function (options: ActionHandlerOptions[ActionHandlerType.API_REQUEST], context: any): ActionInterface {
  return (localContext) => {
    const makeRequest = requestManager.createRequest(
      options.url,
      options.method ? options.method : METHODS.GET,
      identityValueDecoder,
    );

    return makeRequest({
      body: insertContext(options.params, { ...context, ...localContext }),
    });
  };
}
