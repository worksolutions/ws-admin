import { useLocalStore } from "mobx-react-lite";

import { isArray } from "libs/is";
import { ProgressContainer } from "libs/ProgressContainer";

import { AppContextInterface } from "modules/context/hooks/useAppContext";

import { actionFunctionsByActionType } from "./libs/actionFunctionsByActionType";
import { connectActionFunctionAndAppContext } from "./libs/stateContextConnectors/connectActionFunctionAndAppContext";
import { connectMultiActionFunctionAndAppContext } from "./libs/stateContextConnectors/connectMultiActionFunctionAndAppContent";

import { LoadingContainer } from "state/loadingContainer";

import { AnyRawAction } from "types/Actions";

export function useActions<T extends Record<string, AnyRawAction>>(
  actions: T,
  appContext: AppContextInterface,
): Record<
  keyof T,
  {
    loadingContainer: LoadingContainer;
    type: string;
    progressContainer: ProgressContainer;
    run: (inputData?: any) => Promise<any>;
    discard: () => void;
  }
> {
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
