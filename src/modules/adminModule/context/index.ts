import { assocPath, hasPath, path, prop } from "ramda";
import { Container } from "typedi";

import { UpdateStatePayload } from "../types";

import { PageState } from "state/pageState";
import { GlobalState } from "state/globalState";

const pageState = Container.get(PageState);
const globalState = Container.get(GlobalState);

export function useAppContext() {
  const updateContext = (rawPayload: UpdateStatePayload): void => {
    const { payload, stateType } = getUpdateStateInfoFromPayload(rawPayload);
    const data = assocPath(payload.path.split("."), payload.data, {});
    switch (stateType) {
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
    updateContext,
    context: { page: pageState.stateContainer.state, global: globalState.stateContainer.state },
  };
}

export function insertContext(data: any, context: any) {
  if (typeof data === "object") {
    return JSON.parse(insertContextData(JSON.stringify(data), context));
  }
  if (typeof data === "string") {
    return insertContextData(data, context);
  }
  return data;
}

function pickContextByParams(dependsParams: string[], context: object) {
  return dependsParams
    ? dependsParams.reduce((acc, dependPropPath) => {
        const dependPath = dependPropPath.split(".");
        return assocPath(dependPath, path(dependPath, context), acc);
      }, {} as object)
    : {};
}

export function buildDependsContext(
  contextDependsParam: string[],
  context: {
    global: object;
    page: object;
  },
): object {
  return Object.fromEntries(
    Object.entries(context).map(([type, context]) => {
      const dependsParams = contextDependsParam
        .map(getStateTypeAndPathByParam)
        .filter((info) => info.type === type)
        .map(prop("path"));
      return [type, pickContextByParams(dependsParams, context)];
    }),
  );
}

function getStateTypeAndPathByParam(
  param: string,
): {
  type: string;
  path: string;
} {
  if (!param.includes(":#")) {
    return {
      type: "",
      path: param,
    };
  }
  const [type, path] = param.split(":#");
  return {
    type,
    path,
  };
}

const getUpdateStateInfoFromPayload = (
  payload: UpdateStatePayload,
): {
  payload: UpdateStatePayload;
  stateType: string;
} => {
  const { type, path } = getStateTypeAndPathByParam(payload.path);
  return type
    ? {
        stateType: type,
        payload: {
          ...payload,
          path,
        },
      }
    : {
        stateType: "",
        payload,
      };
};

function insertContextData(text: string, context: object): string {
  return text.replace(/{{(.+?)}}/gm, (match: any, p1) => {
    const { type, path: pathWithoutType } = getStateTypeAndPathByParam(p1);
    // @ts-ignore
    const typeContext = context[type];
    const arrPath = pathWithoutType.split(".");
    return hasPath(arrPath, typeContext) ? path(arrPath, typeContext) : match;
  });
}
