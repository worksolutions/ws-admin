import { BaseError } from "libs/BaseError";
import { EventEmitter } from "libs/events";

import { AppContextInterface } from "modules/context/hooks/useAppContext";

import { ActionDiscardEventEmitterEvents, ActionInputDataInterface } from "../../types";

import { LoadingContainer } from "state/loadingContainer";

import { RealAnyRawAction } from "types/Actions";

export const connectActionFunctionAndAppContext = (
  action: RealAnyRawAction,
  actionFunction: (inputData: ActionInputDataInterface) => Promise<any>,
  appContext: AppContextInterface,
) => {
  const loadingContainer = new LoadingContainer();
  const discardEventEmitter = new EventEmitter<ActionDiscardEventEmitterEvents>();

  const run = (inputData: any, previousActionOutput?: any) => {
    loadingContainer.clearErrors();
    loadingContainer.startLoading();
    return actionFunction({ inputData, previousActionOutput, discardEventEmitter })
      .then((actionOutputData) => {
        loadingContainer.stopLoading();
        if (action.context) appContext.updateState({ path: action.context, data: actionOutputData });
        return actionOutputData;
      })
      .catch((baseError: BaseError) => {
        console.log("Action error", baseError);
        const { error } = baseError;
        loadingContainer.setErrors(error.errors);
        loadingContainer.setDefaultError(error.message);
        loadingContainer.stopLoading();
        throw baseError;
      });
  };

  const discard = () => {
    discardEventEmitter.emit("DISCARD", null);
  };

  return {
    loadingContainer,
    run,
    discard,
    type: action.type,
  };
};
