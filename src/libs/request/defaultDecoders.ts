import Decoder, { field, succeed, string, maybe, array } from "jsonous";
import { ok, err } from "resulty";
import { isNil } from "ramda";
import moment, { Moment } from "moment";
import { isNothing } from "maybeasy";

import { DateMode } from "libs/date";
import { isString } from "libs/is";

import SuggestInterface from "types/SuggestInterface";

export const identityValueDecoder = new Decoder(ok);

export const valueDecoder = <T>(inputValue: T) =>
  new Decoder<T>(function (value) {
    return value === inputValue
      ? ok<string, T>(value)
      : err(`Пришло: "${value}"; Ожидалось "${inputValue}"`);
  });

export const fieldWithDefaultDecoder = <A>(
  key: string,
  decoder: Decoder<A>,
  defaultValue: A = null,
) =>
  new Decoder((value: Record<string, any>) => {
    if (isNil(value[key])) {
      return ok(defaultValue);
    }
    return decoder.decodeAny(value[key]).cata({
      Ok: (value) => ok<string, A>(value),
      Err: (error) => err<string, A>(error),
    });
  });

export enum NumberFieldNumChecker {
  EMPTY_STRING,
  NULL,
  NULL_AND_EMPTY_STRING,
}

const numberFieldNumCheckers = {
  [NumberFieldNumChecker.EMPTY_STRING]: (value: any, defaultValue: number) =>
    value === "" ? defaultValue : value,
  [NumberFieldNumChecker.NULL]: (value: any, defaultValue: number) =>
    isNil(value) ? defaultValue : value,
  [NumberFieldNumChecker.NULL_AND_EMPTY_STRING]: (
    value: any,
    defaultValue: number,
  ) => (isNil(value) || value === "" ? defaultValue : value),
};

export const numberFieldDecoder = (
  key: string,
  data: {
    nullEmptyChecker?: NumberFieldNumChecker;
    defaultValue?: number;
  } = {},
) => {
  return new Decoder<number>((inputData) => {
    const value = field(key, identityValueDecoder)
      .decodeAny(inputData)
      .getOrElseValue(null);
    const newValue = numberFieldNumCheckers[
      data.nullEmptyChecker || NumberFieldNumChecker.NULL_AND_EMPTY_STRING
    ](value, "defaultValue" in data ? data.defaultValue : 0);

    return ok(
      isNil(newValue)
        ? null
        : parseFloat(newValue.toString().replace(",", ".")),
    );
  });
};

export const booleanFieldDecoder = (key: string) => {
  return new Decoder<boolean>((inputData) => {
    const value = numberFieldDecoder(key, { defaultValue: 0 })
      .decodeAny(inputData)
      .getOrElseValue(null);
    return ok(!!value);
  });
};

export function codeTitleFieldDecoder(
  code: string | Decoder<string>,
  title: string | Decoder<string>,
) {
  return succeed({})
    .assign(
      "code",
      isString(code) ? fieldWithDefaultDecoder(code, string, "") : code,
    )
    .assign(
      "title",
      isString(title) ? fieldWithDefaultDecoder(title, string, "") : title,
    );
}
export function defaultCodeAndTitle({
  code = "error",
  title = "Ошибка. Невалидные данные",
} = {}) {
  return function (val: SuggestInterface) {
    return { code: val.code || code, title: val.title || title };
  };
}

export function enumDecoder<T>(
  key: string,
  map: { [key: string]: T },
  defaultValue?: T,
) {
  return new Decoder((value) => {
    const fieldValue = value[key];
    const valueInMap = map[fieldValue];

    if (valueInMap === undefined) {
      const availableTypesString = JSON.stringify(Object.keys(map));
      return defaultValue !== undefined
        ? ok<string, T>(defaultValue)
        : err<string, T>(
            `Переданное значение "${fieldValue}" не соответствует ни одному из позволенных [${availableTypesString}].`,
          );
    }
    return ok<string, T>(valueInMap);
  });
}

export function momentFieldDecoder(
  key: string,
  mode = DateMode.DATE,
  defaultValue?: Moment,
) {
  return maybe(field(key, string)).map((maybeValue) => {
    defaultValue = defaultValue || moment.invalid();
    if (isNothing(maybeValue)) return defaultValue;
    const value = maybeValue.getOrElseValue(null);
    return !value.length ? defaultValue : moment(value, mode);
  });
}

export function constValueDecoder<T = any>(value) {
  return new Decoder<T>(() => ok(value));
}

export const serverFilesDecoder = array(
  succeed({})
    .assign("name", field("name", string))
    .assign("link", field("link", string))
    .assign("bytes", numberFieldDecoder("size")),
);
