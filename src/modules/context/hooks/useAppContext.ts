import { assocPath } from "ramda";
import { useCallback } from "react";
import { Container } from "typedi";

import { splitByPoint } from "libs/path";

import { getContextTypeAndPathByParam } from "../contextParamParser";
import { ContextDependencyInterface } from "../insertContext";

import { ScreenState } from "state/screenState";
import { GlobalState } from "state/globalState";

interface UpdateStatePayload {
  path: string;
  data: any;
}

const screenState = Container.get(ScreenState);
const globalState = Container.get(GlobalState);

export function useAppContext() {
  const updateContext = (rawPayload: UpdateStatePayload, override = false) => {
    const { payload, contextType } = getUpdateStateInfoFromPayload(rawPayload);
    const data = assocPath(splitByPoint(payload.path), payload.data, {});
    switch (contextType) {
      case "screen":
        screenState.stateContainer.mergeStates(data, override);
        break;
      default:
        globalState.stateContainer.mergeStates(data, override);
        break;
    }
  };

  return {
    updateState: useCallback(updateContext, []),
    context: { screen: screenState.stateContainer.state, global: globalState.stateContainer.state },
  };
}

export type AppContextInterface = ReturnType<typeof useAppContext>;

export type AppContextStateInterface = AppContextInterface["context"];

const getUpdateStateInfoFromPayload = (payload: UpdateStatePayload) => {
  const { type, path } = getContextTypeAndPathByParam(payload.path);
  return {
    contextType: type,
    payload: {
      ...payload,
      path,
    },
  };
};

export function convertContextDependencyToUpdateStatePayload(resultData: any) {
  return function ({ path, contextType }: ContextDependencyInterface): UpdateStatePayload {
    return { path: `${contextType}:${path.join(".")}`, data: resultData };
  };
}
