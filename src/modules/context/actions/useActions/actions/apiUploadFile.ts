import { Container } from "typedi";

import { METHODS, REQUEST_CANCELLED, RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";

import { insertContext } from "modules/context/insertContext";
import { AppContextInterface } from "modules/context/hooks/useAppContext";

import { ActionInputDataInterface } from "../types";

import { ActionType, RawActionOptions } from "types/Actions";

const requestManager = Container.get(RequestManager);

export default async function apiUploadFile(
  appContext: AppContextInterface,
  actionOptions: RawActionOptions[ActionType.API_UPLOAD_FILE],
  { inputData, eventEmitter }: ActionInputDataInterface,
): Promise<any> {
  const { reference } = actionOptions;

  const url = insertContext(reference, appContext.context).value;
  const cancelToken = RequestManager.makeCancelToken();

  const makeRequest = requestManager.createRequest(url, METHODS.POST, identityValueDecoder);

  const discardHandler = () => {
    cancelToken.cancel(REQUEST_CANCELLED);
  };

  eventEmitter.on("DISCARD", discardHandler);

  const body = new FormData();
  body.append("file", inputData.rawFile);

  const response = makeRequest({
    body,
    options: {
      cancelToken,
      progressReceiver: (progress) => {
        eventEmitter.emit("PROGRESS", progress);
      },
    },
  }).finally(() => {
    eventEmitter.removeListener("DISCARD", discardHandler);
  });

  if (actionOptions.saveToContext) appContext.updateState({ path: actionOptions.saveToContext, data: response });

  return response;
}
