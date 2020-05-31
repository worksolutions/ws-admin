import { assocPath, hasPath, path, prop } from "ramda";

import { UpdateStatePayload } from "../types";

import pageState from "state/page/state";
import globalState from "state/global/state";

export function useAppContext() {
  const pageContext = pageState.getState();
  const globalContext = globalState.getState();
  const updateContext = (rawPayload: UpdateStatePayload): void => {
    const { payload, stateType } = getUpdateStateInfoFromPayload(rawPayload);
    switch (stateType) {
      case "page":
        pageContext._updatePageState(payload);
        break;
      case "global":
        globalContext._updatePageState(payload);
        break;
      default:
        globalContext._updatePageState(payload);
        break;
    }
  };

  return {
    context: {
      page: pageContext,
      global: globalContext,
    },
    updateContext,
  };
}

export function insertContext(data: any, context) {
  if (typeof data === "object") {
    return JSON.parse(insertContextData(JSON.stringify(data), context));
  }
  if (typeof data === "string") {
    return insertContextData(data, context);
  }
  return data;
}

export function buildDependsContext(
  contextDependsParam: string[],
  context: {
    global: object;
    page: object;
  },
): object {
  function pickContextByParams(dependsParams: string[], context: object) {
    return dependsParams
      ? dependsParams.reduce((acc, dependPropPath) => {
          const dependPath = dependPropPath.split(".");
          return assocPath(dependPath, path(dependPath, context), acc);
        }, {} as object)
      : {};
  }
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
  return text.replace(/{{(.+?)}}/gm, (match, p1) => {
    const { type, path: pathWithoutType } = getStateTypeAndPathByParam(p1);
    const typeContext = context[type];
    const arrPath = pathWithoutType.split(".");
    return hasPath(arrPath, typeContext) ? path(arrPath, typeContext) : match;
  });
}
