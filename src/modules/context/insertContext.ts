import { flatten, hasPath, isNil, path } from "ramda";

import { splitByPoint } from "libs/path";
import { isPureObject, isString } from "libs/is";

import { getContextTypeAndPathByParam } from "./contextParamParser";
import { AppContextInterface } from "./hooks/useAppContext";

export function insertContext(data: any, appContext: AppContextInterface["context"], localContext = {}) {
  const resultContext = Object.assign({}, appContext, { local: localContext });
  if (isPureObject(data)) {
    const enhancedFields = Object.entries(data).map(([key, value]) => ({
      key,
      data: insertContextData(JSON.stringify(value), resultContext),
    }));
    const resultObject: Record<string, any> = {};
    enhancedFields.forEach((field) => {
      resultObject[field.key] = JSON.parse(field.data.value);
    });

    return {
      dependencies: flatten(enhancedFields.map((field) => field.data.dependencies)),
      value: resultObject as any,
    };
  }

  if (isString(data)) {
    return insertContextData(data, resultContext);
  }

  return { dependencies: [], value: data };
}

function getFromContext(resultMatch: string, context: object) {
  const { type, path: pathWithoutType } = getContextTypeAndPathByParam(resultMatch);
  // @ts-ignore
  const typeContext = context[type];
  const arrPath = splitByPoint(pathWithoutType);
  const value = path(arrPath, typeContext) as string;
  const pathExists = hasPath(arrPath, typeContext);
  return {
    path: arrPath,
    value: pathExists ? value : "",
    contextType: type,
  };
}

const rawDataSymbols = "=";

export interface ContextDependencyInterface {
  contextType: string;
  path: string[];
}

function insertContextData(
  text: string,
  context: object,
): { value: string; dependencies: ContextDependencyInterface[] } {
  if (text.includes(rawDataSymbols)) {
    const isStringifiedData = text.startsWith('"') && text.endsWith('"');
    const result = getFromContext((isStringifiedData ? text.slice(1, -1) : text).slice(rawDataSymbols.length), context);

    return {
      value: isStringifiedData ? JSON.stringify(result.value) : result.value,
      dependencies: [{ contextType: result.contextType, path: result.path }],
    };
  }

  const result: ReturnType<typeof insertContextData> = { value: "", dependencies: [] };

  result.value = text.replace(/{{(.+?)}}/gm, (_stringWithBrackets: any, resultMatch) => {
    const match = getFromContext(resultMatch, context);
    match.value = isNil(match.value) ? "" : match.value;
    result.dependencies.push({ contextType: match.contextType, path: match.path });
    return match.value;
  });

  return result;
}

export function useStateFromContext<RESULT = any>(
  contextPath: string,
  appContext: AppContextInterface,
  localContext = {},
): [RESULT, (data: any) => void] {
  const data = insertContext("=" + contextPath, appContext.context, localContext).value;
  return [
    data,
    (data) =>
      appContext.updateState({
        path: contextPath,
        data,
      }),
  ];
}
