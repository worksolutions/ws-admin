import { prop } from "ramda";

import { BaseError } from "libs/BaseError";
import { ProgressContainer } from "libs/ProgressContainer";

import { AppContextInterface } from "modules/context/hooks/useAppContext";

import { actionFunctionsByActionType } from "../actionFunctionsByActionType";

import { connectActionFunctionAndAppContext } from "./connectActionFunctionAndAppContext";

import { LoadingContainer } from "state/loadingContainer";

import { RealAnyRawAction } from "types/Actions";

export const connectMultiActionFunctionAndAppContext = (
  actions: RealAnyRawAction[],
  appContext: AppContextInterface,
) => {
  const loadingContainer = new LoadingContainer();
  const progressContainer = new ProgressContainer();
  const patchedActions = actions.map((action) =>
    connectActionFunctionAndAppContext(action, actionFunctionsByActionType[action.type](appContext, action as any)),
  );

  const run = (inputData: any) => {
    loadingContainer.clearErrors();
    loadingContainer.startLoading();
    return new Promise(async (resolve, reject) => {
      let previousActionOutput = inputData;
      for (let i = 0; i < patchedActions.length; i++) {
        try {
          previousActionOutput = await patchedActions[i].run(previousActionOutput, inputData);
        } catch (e) {
          reject(e);
          return;
        }
      }
      loadingContainer.stopLoading();
      resolve(previousActionOutput);
    }).catch((baseError: BaseError) => {
      const { error } = baseError;
      loadingContainer.setErrors(error.errors);
      loadingContainer.setDefaultError(error.message);
      loadingContainer.stopLoading();
      throw baseError;
    });
  };

  return {
    loadingContainer,
    run,
    progressContainer,
    discard: () => {
      throw BaseError.make("Метод отмены множественных действий не реализован!");
    },
    type: `Multi actions: [${patchedActions.map(prop("type")).join(", ")}]`,
  };
};
