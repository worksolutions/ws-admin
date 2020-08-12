import moment, { Moment } from "moment";
import React from "react";

import { useEffectSkipFirst } from "libs/hooks/common";

import { ConfigByModeType } from "./config";

function getInitialMomentValueForRange(value: string | undefined, format: string, addYearsIfUndefined: number) {
  if (value) return moment(value, format);

  const newValue = moment(moment().format(format), format);
  return newValue.add(addYearsIfUndefined, "year");
}

type UseInnerValueChangerConfig = {
  min?: string;
  max?: string;
  maskCharacter: string;
  config: ConfigByModeType;
  onChange: (value: string | null) => void;
  setError: (error: boolean) => void;
};

function changeIfValueIsEmpty(
  allowEmpty: boolean,
  onChange: UseInnerValueChangerConfig["onChange"],
  setError: UseInnerValueChangerConfig["setError"],
) {
  if (allowEmpty) {
    setError(false);
    onChange(null);
    return;
  }
  setError(true);
}

function changeIfValueIsNotEmpty({
  min,
  max,
  setError,
  onChange,
  momentFormat,
  inputValueWithoutMask,
  originalInputValue,
}: {
  inputValueWithoutMask: string;
  onChange: UseInnerValueChangerConfig["onChange"];
  setError: UseInnerValueChangerConfig["setError"];
  min: Moment;
  max: Moment;
  momentFormat: string;
  originalInputValue: string;
}) {
  const momentValue = moment(inputValueWithoutMask, momentFormat);
  if (!momentValue.isValid()) {
    setError(true);
    return;
  }

  if (min && momentValue.isBefore(min)) {
    onChange(min.format(momentFormat));
    return;
  }

  if (max && momentValue.isAfter(max)) {
    onChange(max.format(momentFormat));
    return;
  }

  setError(false);
  onChange(originalInputValue);
}

export function useInnerValueChange(
  inputValue: string,
  allowEmpty: boolean,
  { min: minValue, max: maxValue, config, maskCharacter, onChange, setError }: UseInnerValueChangerConfig,
) {
  const min = React.useMemo(() => getInitialMomentValueForRange(minValue, config.momentFormat, -50), [minValue]);
  const max = React.useMemo(() => getInitialMomentValueForRange(maxValue, config.momentFormat, 50), [maxValue]);

  const innerValueIsEmpty = inputValue.length === 0;

  const inputValueChangeHandler = () => {
    if (innerValueIsEmpty) {
      changeIfValueIsEmpty(allowEmpty, onChange, setError);
      return;
    }

    const inputValueWithoutMask = inputValue.replace(new RegExp(maskCharacter, "g"), "");

    if (inputValueWithoutMask.length === config.momentFormat.length) {
      changeIfValueIsNotEmpty({
        originalInputValue: inputValue,
        momentFormat: config.momentFormat,
        onChange,
        setError,
        max,
        min,
        inputValueWithoutMask,
      });
    }
  };

  useEffectSkipFirst(inputValueChangeHandler, [inputValue]);

  return { min, max };
}
