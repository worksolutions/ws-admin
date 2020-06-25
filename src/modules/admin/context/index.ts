import { assocPath, hasPath, path, prop, is } from "ramda";

import { ContextTypeAndPath, getContextTypeAndPathByParam } from "../../context/contextParamParser";

// import { AppContextInterface } from "../../context/hooks/useAppContext";

export function insertContext(data: any, context: any) {
  if (is(Object, data)) {
    return JSON.parse(insertContextData(JSON.stringify(data), context));
  }
  if (is(String, data)) {
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
  contextDependsParam: ContextTypeAndPath[],
  context: {
    global: object;
    screen: object;
  },
) {
  const result = Object.entries(context).map(([contextType, context]) => {
    const dependsParams = contextDependsParam.filter((info) => info.type === contextType).map(prop("path"));
    return [contextType, pickContextByParams(dependsParams, context)];
  });

  return Object.fromEntries(result);
}

function insertContextData(text: string, context: object): string {
  return text.replace(/{{(.+?)}}/gm, (match: any, p1) => {
    const { type, path: pathWithoutType } = getContextTypeAndPathByParam(p1);
    // @ts-ignore
    const typeContext = context[type];
    const arrPath = pathWithoutType.split(".");
    return hasPath(arrPath, typeContext) ? path(arrPath, typeContext) : match;
  });
}
