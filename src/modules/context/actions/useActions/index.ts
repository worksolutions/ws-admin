import { useLocalStore } from "mobx-react-lite";
import { prop } from "ramda";

import { isArray } from "libs/is";
import { BaseError } from "libs/BaseError";

import { AppContextInterface } from "modules/context/hooks/useAppContext";

import apiRequestAction from "./actions/apiRequest";
import redirectAction from "./actions/redirect";
import updateContext from "./actions/updateContext";
import { ActionInputDataInterface } from "./types";

import { LoadingContainer } from "state/loadingContainer";

import { RawActionInterface, ActionType, AnyRawAction, RealAnyRawAction } from "types/Actions";

const actionFunctionsByActionType = {
  [ActionType.API_REQUEST]: (
    appContext: AppContextInterface,
    { options }: RawActionInterface<ActionType.API_REQUEST>,
  ) => (input: ActionInputDataInterface) => {
    return apiRequestAction(appContext.context, options, input);
  },

  [ActionType.REDIRECT]: (appContext: AppContextInterface, { options }: RawActionInterface<ActionType.REDIRECT>) => (
    input: ActionInputDataInterface,
  ) => {
    return redirectAction(appContext.context, options, input);
  },

  [ActionType.UPDATE_CONTEXT]: (
    appContext: AppContextInterface,
    { options }: RawActionInterface<ActionType.REDIRECT>,
  ) => (input: ActionInputDataInterface) => {
    return updateContext(appContext.context, options, input);
  },
};

const connectActionFunctionAndAppContext = (
  action: RealAnyRawAction,
  actionFunction: (inputData: ActionInputDataInterface) => Promise<any>,
  appContext: AppContextInterface,
) => {
  const loadingContainer = new LoadingContainer();
  const run = (inputData: any, previousActionOutput?: any) => {
    loadingContainer.clearErrors();
    loadingContainer.setLoading(true);
    return actionFunction({ inputData, previousActionOutput })
      .then((actionOutputData) => {
        loadingContainer.setLoading(false);
        if (action.context) appContext.updateState({ path: action.context, data: actionOutputData });
        return actionOutputData;
      })
      .catch((baseError: BaseError) => {
        console.log("Action error", baseError);
        const { error } = baseError;
        loadingContainer.setErrors(error.errors);
        loadingContainer.setDefaultError(error.message);
        loadingContainer.setLoading(false);
        throw baseError;
      });
  };

  return {
    loadingContainer,
    run,
    type: action.type,
  };
};

const connectMultiActionFunctionAndAppContext = (actions: RealAnyRawAction[], appContext: AppContextInterface) => {
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
    loadingContainer.setLoading(true);
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
      loadingContainer.setLoading(false);
      resolve(previousActionOutput);
    }).catch((baseError: BaseError) => {
      const { error } = baseError;
      loadingContainer.setErrors(error.errors);
      loadingContainer.setDefaultError(error.message);
      loadingContainer.setLoading(false);
      throw baseError;
    });
  };

  return {
    loadingContainer,
    run,
    type: `Multi actions: [${patchedActions.map(prop("type")).join(", ")}]`,
  };
};

export function useActions<T extends Record<string, AnyRawAction>>(
  actions: T,
  appContext: AppContextInterface,
): Record<keyof T, { run: (inputData?: any) => Promise<any>; loadingContainer: LoadingContainer; type: string }> {
  return useLocalStore(() => {
    if (!actions) return {};

    const result: any = {};
    Object.entries(actions).forEach(([actionName, action]) => {
      if (isArray(action)) {
        result[actionName] = connectMultiActionFunctionAndAppContext(action, appContext);
        return;
      }
      result[actionName] = connectActionFunctionAndAppContext(
        action,
        actionFunctionsByActionType[action.type](appContext, action as any),
        appContext,
      );
    });

    return result;
  });
}

export type ActionInterface = ReturnType<typeof useActions>[any];

export function mergeActions<F extends Record<string, AnyRawAction>, S extends Record<string, AnyRawAction>>(
  firstActions: F,
  secondsActions: S,
) {
  return { ...firstActions, ...secondsActions };
}
