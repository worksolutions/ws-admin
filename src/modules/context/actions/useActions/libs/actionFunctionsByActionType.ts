import { AppContextInterface } from "modules/context/hooks/useAppContext";

import { ActionInputDataInterface } from "../types";
import apiRequestAction from "../actions/apiRequest";
import apiUploadFileAction from "../actions/apiUploadFile";
import redirectAction from "../actions/redirect";
import updateContext from "../actions/updateContext";

import { ActionType, RawActionInterface } from "types/Actions";

export const actionFunctionsByActionType = {
  [ActionType.API_REQUEST]: (
    appContext: AppContextInterface,
    { options }: RawActionInterface<ActionType.API_REQUEST>,
  ) => (actionInputData: ActionInputDataInterface) => {
    return apiRequestAction(appContext.context, options, actionInputData);
  },

  [ActionType.API_UPLOAD_FILE]: (
    appContext: AppContextInterface,
    { options }: RawActionInterface<ActionType.API_UPLOAD_FILE>,
  ) => (actionInputData: ActionInputDataInterface) => {
    return apiUploadFileAction(appContext.context, options, actionInputData);
  },

  [ActionType.REDIRECT]: (appContext: AppContextInterface, { options }: RawActionInterface<ActionType.REDIRECT>) => (
    actionInputData: ActionInputDataInterface,
  ) => {
    return redirectAction(appContext.context, options, actionInputData);
  },

  [ActionType.UPDATE_CONTEXT]: (
    appContext: AppContextInterface,
    { options }: RawActionInterface<ActionType.REDIRECT>,
  ) => (actionInputData: ActionInputDataInterface) => {
    return updateContext(appContext.context, options, actionInputData);
  },
};
