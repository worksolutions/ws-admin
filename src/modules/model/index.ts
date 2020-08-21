import React from "react";

import { useStateFromContext } from "../context/insertContext";
import { AppContextInterface } from "../context/hooks/useAppContext";

export class ContextModel {
  constructor(public disabled?: boolean, public error?: string) {}
}

export function useStateContextModel(
  contextPath: string,
  appContext: AppContextInterface,
  initialize = false,
): { value: any; model: ContextModel; setModel: (newModel: ContextModel) => void; setValue: (data: any) => void } {
  const [stateValue, setStateValue] = useStateFromContext(contextPath, appContext);
  const [modelValue, setModelValue] = useStateFromContext(createModelContextPath(contextPath), appContext);

  React.useEffect(() => {
    if (!initialize) return;
    setModelValue(new ContextModel(false));
  }, []);

  return React.useMemo(
    () => ({
      value: stateValue,
      model: new ContextModel(modelValue.disabled, modelValue.error),
      setModel: setModelValue,
      setValue: (newValue) => {
        setStateValue(newValue);
        setModelValue(new ContextModel(modelValue.disabled, undefined));
      },
    }),
    [stateValue, modelValue],
  );
}

export function createModelContextPath(baseContextPath: string) {
  return baseContextPath + "--model";
}
