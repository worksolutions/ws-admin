import { hasPath, path, is, isNil } from "ramda";

import { getContextTypeAndPathByParam } from "./contextParamParser";

export function insertContext(data: any, appContext: any, localContext = {}) {
  const resultContext = Object.assign({}, appContext, { local: localContext });
  if (is(Object, data)) {
    const { value, dependencies } = insertContextData(JSON.stringify(data), resultContext);
    return { dependencies, value: JSON.parse(value) };
  }
  if (is(String, data)) {
    return insertContextData(data, resultContext);
  }
  return { dependencies: [], value: data };
}

function getFromContext(resultMatch: string, context: object) {
  const { type, path: pathWithoutType } = getContextTypeAndPathByParam(resultMatch);
  // @ts-ignore
  const typeContext = context[type];
  const arrPath = pathWithoutType.split(".");
  const value = path(arrPath, typeContext) as string;
  const pathExists = hasPath(arrPath, typeContext);
  return {
    path: arrPath,
    value: pathExists ? (isNil(value) ? "" : value) : "",
    contextType: type,
  };
}

const rawDataSymbols = "{{{";

export type InsertContextResult = ReturnType<typeof insertContextData>;

function insertContextData(
  text: string,
  context: object,
): { value: string; dependencies: { contextType: string; path: string[] }[] } {
  if (text.includes(rawDataSymbols)) {
    const result = getFromContext(text.slice(rawDataSymbols.length, -rawDataSymbols.length), context);
    return {
      value: result.value,
      dependencies: [{ contextType: result.contextType, path: result.path }],
    };
  }

  const result: InsertContextResult = { value: "", dependencies: [] };

  result.value = text.replace(/{{(.+?)}}/gm, (_stringWithBrackets: any, resultMatch) => {
    const match = getFromContext(resultMatch, context);
    result.dependencies.push({ contextType: match.contextType, path: match.path });
    return match.value;
  });

  return result;
}
