import React from "react";

import { useStateFromContext } from "../context/insertContext";
import { AppContextInterface } from "../context/hooks/useAppContext";

export class ContextModel {
  constructor(public disabled?: boolean, public error?: string) {}
}

export function useStateContextModel(
  contextPath: string,
  appContext: AppContextInterface,
): [any, ContextModel, (data: any) => void] {
  const [stateValue, setStateValue] = useStateFromContext(contextPath, appContext);
  const [modelValue] = useStateFromContext(createModelContextPath(contextPath), appContext);
  return React.useMemo(() => [stateValue, new ContextModel(modelValue.disabled, modelValue.error), setStateValue], [
    stateValue,
  ]);
}

export function createModelContextPath(baseContextPath: string) {
  return baseContextPath + "--model";
}
