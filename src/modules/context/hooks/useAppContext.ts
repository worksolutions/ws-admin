import { assocPath } from "ramda";
import { useCallback } from "react";
import { Container } from "typedi";

import { getContextTypeAndPathByParam } from "../contextParamParser";

import { ScreenState } from "state/screenState";
import { SystemState } from "state/systemState";

interface UpdateStatePayload {
  path: string;
  data: any;
}

const screenState = Container.get(ScreenState);
const systemState = Container.get(SystemState);

export function useAppContext() {
  const updateContext = (rawPayload: UpdateStatePayload) => {
    const { payload, contextType } = getUpdateStateInfoFromPayload(rawPayload);
    const data = assocPath(payload.path.split("."), payload.data, {});
    switch (contextType) {
      case "screen":
        screenState.stateContainer.mergeStates(data);
        break;
      default:
        systemState.stateContainer.mergeStates(data);
        break;
    }
  };

  return {
    updateState: useCallback(updateContext, []),
    context: { screen: screenState.stateContainer.state, system: systemState.stateContainer.state },
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
