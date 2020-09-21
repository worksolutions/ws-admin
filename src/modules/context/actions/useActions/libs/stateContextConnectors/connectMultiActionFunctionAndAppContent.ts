import { prop } from "ramda";

import { BaseError } from "libs/BaseError";

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
  const patchedActions = actions.map((action) =>
    connectActionFunctionAndAppContext(
      action,
      actionFunctionsByActionType[action.type](appContext, action as any),
      appContext,
    ),
  );

  const run = (inputData: any) => {
    loadingContainer.clearErrors();
    loadingContainer.startLoading();
    return new Promise(async (resolve, reject) => {
      let previousActionOutput: any = null;
      for (let i = 0; i < patchedActions.length; i++) {
        try {
          previousActionOutput = await patchedActions[i].run(inputData, previousActionOutput);
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
    discard: () => {
      throw new BaseError({ message: "Метод отмены множественных действий не реализован!", errors: {} });
    },
    type: `Multi actions: [${patchedActions.map(prop("type")).join(", ")}]`,
  };
};