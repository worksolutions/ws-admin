import { assocPath } from "ramda";
import { useCallback } from "react";
import { Container } from "typedi";

import { getContextTypeAndPathByParam } from "../contextParamParser";

import { PageState } from "state/pageState";
import { GlobalState } from "state/globalState";

interface UpdateStatePayload {
  path: string;
  data: any;
}

const pageState = Container.get(PageState);
const globalState = Container.get(GlobalState);

export function useAppContext() {
  const updateContext = (rawPayload: UpdateStatePayload) => {
    const { payload, contextType } = getUpdateStateInfoFromPayload(rawPayload);
    const data = assocPath(payload.path.split("."), payload.data, {});
    switch (contextType) {
      case "page":
        pageState.stateContainer.mergeStates(data);
        break;
      case "global":
        globalState.stateContainer.mergeStates(data);
        break;
      default:
        globalState.stateContainer.mergeStates(data);
        break;
    }
  };

  return {
    updateState: useCallback(updateContext, []),
    context: { page: pageState.stateContainer.state, global: globalState.stateContainer.state },
  };
}

export interface AppContextInterface {
  page: Record<string, any>;
  global: Record<string, any>;
}

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
