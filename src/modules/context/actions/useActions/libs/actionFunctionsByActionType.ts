import { AppContextInterface } from "modules/context/hooks/useAppContext";

import { ActionInputDataInterface } from "../types";
import apiRequestAction from "../actions/apiRequest";
import apiUploadFileAction from "../actions/apiUploadFile";
import redirectAction from "../actions/redirect";
import updateContext from "../actions/updateContext";
import openModal from "../actions/openModal";
import closeModal from "../actions/closeModal";
import appendContext from "../actions/appendContext";
import notify from "../actions/notify";

import { ActionType, RawActionInterface } from "types/Actions";

export const actionFunctionsByActionType = {
  [ActionType.API_REQUEST]: (
    appContext: AppContextInterface,
    { options }: RawActionInterface<ActionType.API_REQUEST>,
  ) => (actionInputData: ActionInputDataInterface) => {
    return apiRequestAction(appContext, options, actionInputData);
  },

  [ActionType.API_UPLOAD_FILE]: (
    appContext: AppContextInterface,
    { options }: RawActionInterface<ActionType.API_UPLOAD_FILE>,
  ) => (actionInputData: ActionInputDataInterface) => {
    return apiUploadFileAction(appContext, options, actionInputData);
  },

  [ActionType.REDIRECT]: (appContext: AppContextInterface, { options }: RawActionInterface<ActionType.REDIRECT>) => (
    actionInputData: ActionInputDataInterface,
  ) => {
    return redirectAction(appContext.context, options, actionInputData);
  },

  [ActionType.UPDATE_CONTEXT]: (
    appContext: AppContextInterface,
    { options }: RawActionInterface<ActionType.UPDATE_CONTEXT>,
  ) => (actionInputData: ActionInputDataInterface) => {
    return updateContext(appContext, options, actionInputData);
  },

  [ActionType.APPEND_CONTEXT]: (
    appContext: AppContextInterface,
    { options }: RawActionInterface<ActionType.APPEND_CONTEXT>,
  ) => (actionInputData: ActionInputDataInterface) => {
    return appendContext(appContext, options, actionInputData);
  },

  [ActionType.OPEN_MODAL]: (
    appContext: AppContextInterface,
    { options }: RawActionInterface<ActionType.OPEN_MODAL>,
  ) => (actionInputData: ActionInputDataInterface) => {
    return openModal(appContext.context, options, actionInputData);
  },

  [ActionType.CLOSE_MODAL]: (
    appContext: AppContextInterface,
    { options }: RawActionInterface<ActionType.CLOSE_MODAL>,
  ) => (actionInputData: ActionInputDataInterface) => {
    return closeModal(appContext.context, options, actionInputData);
  },

  [ActionType.NOTIFY]: (appContext: AppContextInterface, { options }: RawActionInterface<ActionType.NOTIFY>) => (
    actionInputData: ActionInputDataInterface,
  ) => {
    return notify(appContext.context, options, actionInputData);
  },
};
