import { hasPath, path, is } from "ramda";

import { getContextTypeAndPathByParam } from "./contextParamParser";

export function insertContext(data: any, context: any) {
  if (is(Object, data)) {
    return JSON.parse(insertContextData(JSON.stringify(data), context));
  }
  if (is(String, data)) {
    return insertContextData(data, context);
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
