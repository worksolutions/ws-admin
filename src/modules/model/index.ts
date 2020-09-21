import React from "react";

import { useStateFromContext } from "../context/insertContext";
import { AppContextInterface } from "../context/hooks/useAppContext";

export interface ContextModelInterface {
  disabled?: boolean;
  error?: string;
}

export function useStateContextModel(
  contextPath: string,
  appContext: AppContextInterface,
  initialize = false,
): {
  value: any;
  model: ContextModelInterface;
  setModel: (newModel: ContextModelInterface) => void;
  setValue: (data: any) => void;
} {
  const [stateValue, setStateValue] = useStateFromContext(contextPath, appContext);
  const [modelValue, setModelValue] = useStateFromContext(createModelContextPath(contextPath), appContext);

  React.useEffect(() => {
    if (!initialize) return;
    setModelValue({ disabled: false } as ContextModelInterface);
  }, []);

  return React.useMemo(() => {
    return {
      value: stateValue,
      model: modelValue,
      setModel: setModelValue,
      setValue: (newValue) => {
        setStateValue(newValue);
        setModelValue({ disabled: modelValue.disabled } as ContextModelInterface);
      },
    };
  }, [stateValue, modelValue]);
}

export function createModelContextPath(baseContextPath: string) {
  return baseContextPath + "--model";
}
