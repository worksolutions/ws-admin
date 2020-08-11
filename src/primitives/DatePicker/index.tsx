import React from "react";
import moment from "moment";

import MaskedInput, { makeMask, MaskType } from "primitives/Input/MaskedInput";

import { width } from "libs/styles";
import { useEffectSkipFirst } from "libs/hooks/common";

import { InputInterface } from "../Input/Input";

export enum DatePickerMode {
  DATE,
  TIME,
  DATE_TIME,
}

interface DatePickerInterface extends Omit<InputInterface, "value" | "onChange"> {
  initialValue?: string | null;
  allowEmpty?: boolean;
  mode?: DatePickerMode;
  onChange: (value: string | null) => void;
}

const dateMaskCharacters = [/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/];
const timeMaskCharacters = [/\d/, /\d/, ":", /\d/, /\d/];

const configByMode: Record<
  DatePickerMode,
  { mask: MaskType; placeholder: string; width: number; momentRawFormat: string }
> = {
  [DatePickerMode.DATE]: {
    width: 128,
    placeholder: "__.__.____",
    mask: makeMask(dateMaskCharacters),
    momentRawFormat: "DD.MM.YYYY",
  },
  [DatePickerMode.TIME]: {
    width: 92,
    placeholder: "__:__",
    mask: makeMask(timeMaskCharacters),
    momentRawFormat: "HH:mm",
  },
  [DatePickerMode.DATE_TIME]: {
    width: 172,
    placeholder: "__.__.____ __:__",
    mask: makeMask([...dateMaskCharacters, " ", ...timeMaskCharacters]),
    momentRawFormat: "DD.MM.YYYY HH:mm",
  },
};

const maskCharacter = "_";

function DatePicker({
  placeholder,
  mode = DatePickerMode.DATE,
  initialValue,
  outerStyles,
  allowEmpty = true,
  onChange,
}: DatePickerInterface) {
  const [innerValue, setInnerValue] = React.useState(initialValue || "");
  const config = configByMode[mode];
  const [error, setError] = React.useState(false);
  const innerValueIsEmpty = innerValue.length === 0;

  useEffectSkipFirst(() => {
    if (innerValueIsEmpty) {
      if (allowEmpty) {
        setError(false);
        onChange(null);
        return;
      }
      setError(true);
      return;
    }

    const rawValue = innerValue.replace(new RegExp(maskCharacter, "g"), "");

    if (rawValue.length === config.momentRawFormat.length) {
      if (moment(rawValue, config.momentRawFormat).isValid()) {
        setError(false);
        onChange(innerValue);
        return;
      }
      setError(true);
      return;
    }
  }, [innerValue]);

  return (
    <MaskedInput
      error={error}
      value={innerValue}
      mask={config.mask}
      guide
      maskCharacter={maskCharacter}
      placeholder={placeholder || config.placeholder}
      outerStyles={[width(config.width), outerStyles]}
      iconRight="calendar"
      onChange={setInnerValue}
    />
  );
}

export default React.memo(DatePicker);
