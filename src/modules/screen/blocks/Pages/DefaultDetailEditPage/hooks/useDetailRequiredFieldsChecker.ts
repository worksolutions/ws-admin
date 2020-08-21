import React from "react";
import { isNil, prop } from "ramda";

import { isArray, isString } from "libs/is";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { ContextModel, useStateContextModel } from "modules/model";

const emptyFieldError = "Поле обязательно для заполнения";

export function useDetailRequiredFieldsChecker(requiredContextFields: string[] = []) {
  const appContext = useAppContext();
  const requiredValues = requiredContextFields.map((field) => useStateContextModel(field, appContext, true));

  return React.useCallback(() => {
    let correct = true;
    requiredValues.forEach(({ value, model, setModel }) => {
      const setError = (error: boolean) => {
        setModel(new ContextModel(model.disabled, error ? emptyFieldError : undefined));
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
