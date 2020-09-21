import { Container } from "typedi";

import { METHODS, REQUEST_CANCELLED, RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";

import { insertContext } from "modules/context/insertContext";
import { AppContextStateInterface } from "modules/context/hooks/useAppContext";

import { ActionInputDataInterface } from "../types";

import { ActionType, RawActionOptions } from "types/Actions";

const requestManager = Container.get(RequestManager);

export default function apiUploadFile(
  appContext: AppContextStateInterface,
  actionOptions: RawActionOptions[ActionType.API_UPLOAD_FILE],
  { inputData, discardEventEmitter }: ActionInputDataInterface,
): Promise<any> {
  const { reference } = actionOptions;

  const url = insertContext(reference, appContext).value;
  const cancelToken = RequestManager.makeCancelToken();

  const makeRequest = requestManager.createRequest(url, METHODS.POST, identityValueDecoder);

  const discardHandler = () => {
    cancelToken.cancel(REQUEST_CANCELLED);
  };

  discardEventEmitter.on("DISCARD", discardHandler);

  const body = new FormData();
  body.append("file", inputData.rawFile);

  return makeRequest({ body, options: { cancelToken } }).finally(() => {
    discardEventEmitter.removeListener("DISCARD", discardHandler);
  });
}
