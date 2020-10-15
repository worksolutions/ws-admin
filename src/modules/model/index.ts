import React from "react";
import { identity, memoizeWith } from "ramda";

import { useStateFromContext } from "../context/insertContext";
import { AppContextInterface } from "../context/hooks/useAppContext";

export interface ContextModelInterface {
  disabled: boolean;
  error: string | undefined;
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
  const [modelValue, setModelValue] = useStateFromContext(makeModelContextPath(contextPath), appContext) as [
    ContextModelInterface,
    (model: ContextModelInterface) => void,
  ];

  React.useEffect(() => {
    if (!initialize) return;
    setModelValue({ disabled: false, error: undefined });
  }, []);

  return React.useMemo(() => {
    return {
      value: stateValue,
      model: modelValue,
      setModel: setModelValue,
      setValue: (newValue) => {
        setStateValue(newValue);
        setModelValue({ disabled: modelValue.disabled, error: undefined });
      },
    };
  }, [stateValue, modelValue]);
}

export const modelContextPathPostfix = "--model";

export const makeModelContextPath = memoizeWith(
  identity,
  (baseContextPath: string) => baseContextPath + modelContextPathPostfix,
);
