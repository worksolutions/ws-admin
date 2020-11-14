import React from "react";
import { identity, memoizeWith } from "ramda";

import { useStateFromContext } from "../context/insertContext";
import { AppContextInterface } from "../context/hooks/useAppContext";
import { isString } from "../../libs/is";

export interface ContextModelInterface {
  disabled: boolean;
  error: string | undefined;
}

type UseStateAndModelResult = {
  stateValue: any;
  setStateValue: (data: any) => void;
  modelValue: ContextModelInterface;
  setModelValue: (model: ContextModelInterface) => void;
};

function useStateAndModelSingle(contextPath: string, appContext: AppContextInterface): UseStateAndModelResult {
  const [stateValue, setStateValue] = useStateFromContext(contextPath, appContext);
  const [modelValue, setModelValue] = useStateFromContext(makeModelContextPath(contextPath), appContext);
  return { stateValue, setStateValue, modelValue, setModelValue };
}

function useStateAndModelMultiple(contextPaths: string[], appContext: AppContextInterface): UseStateAndModelResult {
  const state = contextPaths.map((contextPath) => useStateFromContext(contextPath, appContext));
  const model = contextPaths.map((contextPath) => useStateFromContext(makeModelContextPath(contextPath), appContext));

  const stateValue = state[0][0];
  const setStateValue = (data: any) => state.forEach(([, setState]) => setState(data));

  const modelValue = model[0][0];
  const setModelValue = (data: ContextModelInterface) => model.forEach(([, setModel]) => setModel(data));

  return { stateValue, setStateValue, modelValue, setModelValue };
}

export function useStateContextModel(
  contextPath: string | string[],
  appContext: AppContextInterface,
  initialize = false,
): {
  value: any;
  model: ContextModelInterface;
  setModel: (newModel: ContextModelInterface) => void;
  setValue: (data: any) => void;
} {
  const { modelValue, setModelValue, setStateValue, stateValue } = isString(contextPath)
    ? useStateAndModelSingle(contextPath, appContext)
    : useStateAndModelMultiple(contextPath, appContext);

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
