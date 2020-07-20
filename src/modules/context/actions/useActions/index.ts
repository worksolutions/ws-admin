import { useLocalStore } from "mobx-react-lite";
import { has } from "ramda";

import { RequestError } from "libs/request";

import { AppContextInterface } from "modules/context/hooks/useAppContext";

import apiRequestAction from "./actions/apiRequest";
import redirectAction from "./actions/redirect";
import noneAction from "./actions/none";
import { ActionInputDataInterface } from "./types";

import { LoadingContainer } from "state/loadingContainer";

import { ActionInterface, ActionType, AnyAction } from "types/Actions";

const actionFunctionsByActionType = {
  [ActionType.API_REQUEST]: (appContext: AppContextInterface, { options }: ActionInterface<ActionType.API_REQUEST>) => (
    inputData: ActionInputDataInterface,
  ) => {
    return apiRequestAction(appContext.context, options, inputData);
  },

  [ActionType.REDIRECT]: (appContext: AppContextInterface, { options }: ActionInterface<ActionType.REDIRECT>) => (
    inputData: ActionInputDataInterface,
  ) => {
    return redirectAction(appContext.context, options, inputData);
  },

  [ActionType.NONE]: (appContext: AppContextInterface, { options }: ActionInterface<ActionType.REDIRECT>) => (
    inputData: ActionInputDataInterface,
  ) => {
    return noneAction(appContext.context, options, inputData);
  },
};

const connectActionFunctionAndAppContext = (
  action: AnyAction,
  actionFunction: (inputData: ActionInputDataInterface) => Promise<any>,
  appContext: AppContextInterface,
) => {
  const loadingContainer = new LoadingContainer();
  const run = (inputData: any) => {
    loadingContainer.clearErrors();
    loadingContainer.setLoading(true);

    return actionFunction(inputData)
      .then((actionOutputData) => {
        loadingContainer.setLoading(false);
        if (action.context) appContext.updateState({ path: action.context, data: actionOutputData });
        if (has("context", inputData)) appContext.updateState({ path: inputData.context, data: actionOutputData });
        return actionOutputData;
      })
      .catch((requestError: RequestError) => {
        console.log("Action error", requestError);
        const { error } = requestError;
        loadingContainer.setErrors(error.errors);
        loadingContainer.setDefaultError(error.message);
        loadingContainer.setLoading(false);
        throw requestError;
      });
  };

  run.type = action.type;

  return {
    loadingContainer,
    run,
  };
};

export function useActions<T extends Record<string, AnyAction>>(
  actions: T,
  appContext: AppContextInterface,
): Record<
  keyof T,
  { run: (inputData?: ActionInputDataInterface) => Promise<any>; loadingContainer: LoadingContainer }
> {
  return useLocalStore(() => {
    if (!actions) return {};

    const result: any = {};
    Object.entries(actions).forEach(([actionName, action]) => {
      result[actionName] = connectActionFunctionAndAppContext(
        action,
        actionFunctionsByActionType[action.type](appContext, action as any), // TODO - избавиться от any
        appContext,
      ) as any;
    });

    return result;
  });
}
