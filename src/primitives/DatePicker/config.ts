import { makeMask, MaskType } from "../Input/MaskedInput";

const dateMaskCharacters = [/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/];
const timeMaskCharacters = [/\d/, /\d/, ":", /\d/, /\d/];

export type ConfigByModeType = { mask: MaskType; placeholder: string; width: number; momentFormat: string };

export enum DatePickerMode {
  DATE,
  TIME,
  DATE_TIME,
}

export const configByMode: Record<DatePickerMode, ConfigByModeType> = {
  [DatePickerMode.DATE]: {
    width: 128,
    placeholder: "__.__.____",
    mask: makeMask(dateMaskCharacters),
    momentFormat: "DD.MM.YYYY",
  },
  [DatePickerMode.TIME]: {
    width: 92,
    placeholder: "__:__",
    mask: makeMask(timeMaskCharacters),
    momentFormat: "HH:mm",
  },
  [DatePickerMode.DATE_TIME]: {
    width: 172,
    placeholder: "__.__.____ __:__",
    mask: makeMask([...dateMaskCharacters, " ", ...timeMaskCharacters]),
    momentFormat: "DD.MM.YYYY HH:mm",
  },
};
