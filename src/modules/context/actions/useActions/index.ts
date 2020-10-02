import { useLocalStore } from "mobx-react-lite";

import { isArray } from "libs/is";
import { ProgressContainer } from "libs/ProgressContainer";
import { useEffectSkipFirst } from "libs/hooks/common";

import { AppContextInterface } from "modules/context/hooks/useAppContext";

import { actionFunctionsByActionType } from "./libs/actionFunctionsByActionType";
import { connectActionFunctionAndAppContext } from "./libs/stateContextConnectors/connectActionFunctionAndAppContext";
import { connectMultiActionFunctionAndAppContext } from "./libs/stateContextConnectors/connectMultiActionFunctionAndAppContent";

import { LoadingContainer } from "state/loadingContainer";

import { AnyRawAction } from "types/Actions";

export interface UseActionResultAction {
  loadingContainer: LoadingContainer;
  type: string;
  progressContainer: ProgressContainer;
  run: (inputData?: any) => Promise<any>;
  discard: () => void;
}

export function useActions<T extends Record<string, AnyRawAction>>(
  actions: T,
  appContext: AppContextInterface,
): Record<keyof T, UseActionResultAction> {
  function prepareActionsForLocalStore() {
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
      );
    });

    return result;
  }

  const localStore = useLocalStore(() => prepareActionsForLocalStore());

  useEffectSkipFirst(() => {
    const newActions = prepareActionsForLocalStore();
    Object.entries(newActions).forEach(([name, action]) => {
      localStore[name] = action;
    });
  }, [actions]);

  return localStore;
}

export type ActionInterface = ReturnType<typeof useActions>[any];
