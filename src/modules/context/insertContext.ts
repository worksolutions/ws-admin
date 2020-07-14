import { hasPath, path, is } from "ramda";

import { getContextTypeAndPathByParam } from "./contextParamParser";

export function insertContext(data: any, appContext: any, localContext = {}) {
  const resultContext = Object.assign({}, appContext, { local: localContext });
  if (is(Object, data)) {
    return JSON.parse(insertContextData(JSON.stringify(data), resultContext));
  }
  if (is(String, data)) {
    return insertContextData(data, resultContext);
  }
  return data;
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
