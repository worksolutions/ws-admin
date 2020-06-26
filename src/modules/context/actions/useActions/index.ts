import { useLocalStore } from "mobx-react-lite";

import { AppContextInterface } from "../../hooks/useAppContext";
import { LoadingContainer } from "../../../../state/loadingContainer";
import { RequestError } from "../../../../libs/request";

import apiRequestAction from "./actions/apiRequest";
import redirectAction from "./actions/redirect";

import { ActionInterface, ActionType, AnyAction } from "types/Actions";

type InputData = Record<string, string | number>;

const actionFunctionsByActionType = {
  [ActionType.API_REQUEST]: (appContext: AppContextInterface, { options }: ActionInterface<ActionType.API_REQUEST>) => (
    inputData: InputData,
  ) => apiRequestAction({ ...options, body: { ...options.body, ...inputData } }, appContext.context),
  [ActionType.REDIRECT]: (_appContext: AppContextInterface, { options }: ActionInterface<ActionType.REDIRECT>) => () =>
    redirectAction(options),
};

const connectActionFunctionAndAppContext = (
  actionFunction: (inputData: InputData) => Promise<any>,
  appContext: AppContextInterface,
) => {
  const loadingContainer = new LoadingContainer();
  return {
    loadingContainer,
    run: (inputData: any) => {
      loadingContainer.clearErrors();
      loadingContainer.setLoading(true);
      return actionFunction(inputData || {})
        .then((actionOutputData) => {
          loadingContainer.setLoading(false);
          if (inputData.context) appContext.updateState({ path: inputData.context, data: actionOutputData });
          return actionOutputData;
        })
        .catch((requestError: RequestError) => {
          const { error } = requestError;
          loadingContainer.setFullErrors(error.message, error.errors);
          loadingContainer.setLoading(false);
          throw requestError;
        });
    },
  };
};

export function useActions<T extends Record<string, AnyAction>>(
  actions: T,
  appContext: AppContextInterface,
): Record<keyof T, { run: (inputData?: InputData) => Promise<any>; loadingContainer: LoadingContainer }> {
  return useLocalStore(() => {
    if (!actions) return {};

    const result: any = {};

    Object.entries(actions).forEach(([actionName, action]) => {
      result[actionName] = connectActionFunctionAndAppContext(
        actionFunctionsByActionType[action.type](appContext, action as any), // TODO - избавиться от any
        appContext,
      ) as any;
    });

    return result;
  });
}
