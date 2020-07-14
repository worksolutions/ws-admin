import { useLocalStore } from "mobx-react-lite";

import { RequestError } from "libs/request";

import { AppContextInterface } from "modules/context/hooks/useAppContext";

import apiRequestAction from "./actions/apiRequest";
import redirectAction from "./actions/redirect";
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
};

const connectActionFunctionAndAppContext = (
  actionType: ActionType,
  actionFunction: (inputData: ActionInputDataInterface) => Promise<any>,
  appContext: AppContextInterface,
) => {
  const loadingContainer = new LoadingContainer();
  const run = (inputData: any) => {
    inputData = inputData || {};
    loadingContainer.clearErrors();
    loadingContainer.setLoading(true);

    return actionFunction(inputData)
      .then((actionOutputData) => {
        loadingContainer.setLoading(false);
        if (inputData.context) appContext.updateState({ path: inputData.context, data: actionOutputData });
        return actionOutputData;
      })
      .catch((requestError: RequestError) => {
        const { error } = requestError;
        loadingContainer.setErrors(error.errors);
        loadingContainer.setDefaultError(error.message);
        loadingContainer.setLoading(false);
        throw requestError;
      });
  };

  run.type = actionType;

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
        action.type,
        actionFunctionsByActionType[action.type](appContext, action as any), // TODO - избавиться от any
        appContext,
      ) as any;
    });

    return result;
  });
}
