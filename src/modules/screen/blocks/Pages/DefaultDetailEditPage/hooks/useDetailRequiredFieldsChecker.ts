import React from "react";
import { isNil, prop } from "ramda";

import { isArray, isString } from "libs/is";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { ContextModelInterface, useStateContextModel } from "modules/model";

const emptyFieldError = "Поле обязательно для заполнения";

export function useDetailRequiredFieldsChecker(requiredContextFields: string[] = []) {
  const appContext = useAppContext();
  const requiredValues = requiredContextFields.map((field) => useStateContextModel(field, appContext));

  return React.useCallback(() => {
    let correct = true;
    requiredValues.forEach(({ value, model, setModel }) => {
      const setError = (error: boolean) => {
        setModel({ disabled: model.disabled, error: error ? emptyFieldError : undefined } as ContextModelInterface);
        if (error) {
          correct = false;
        }
      };

      if (isNil(value)) return setError(true);
      if (isString(value) && value.length === 0) return setError(true);
      if (isArray(value) && value.length === 0) return setError(true);
    });

    return correct;
  }, requiredValues.map(prop("value")));
}
