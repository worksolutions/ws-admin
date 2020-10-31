import React from "react";
import { observer } from "mobx-react-lite";

import Input, { InputSize } from "primitives/Input/Input";
import { Icons } from "primitives/Icon";
import ClearInputWrapper from "primitives/Input/ClearInputWrapper";

import { useEffectSkipFirst } from "libs/hooks/common";
import { fullWidth, maxWidth, minWidth } from "libs/styles";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { useStateContextModel } from "modules/model";

import { defaultWidths, DefaultWidths } from "../widths";

import { BlockInterface } from "state/globalState";

export interface InputOptionsInterface {
  cleanable?: boolean;
  width?: DefaultWidths;
  multiline?: boolean;
  placeholder?: string;
  iconLeft?: Icons;
  debounce?: number;
  contextPath: string;
  size?: InputSize;
}

type ActionInputInterface = BlockInterface<InputOptionsInterface, "change"> & {
  styles?: any;
  onChange?: (text: string) => void;
};

function ActionInput({ actions, options, styles, onChange }: ActionInputInterface) {
  if (!actions?.change) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);
  const {
    value,
    model: { disabled, error },
    setValue,
  } = useStateContextModel(options!.contextPath, appContext);

  useEffectSkipFirst(() => {
    if (onChange) onChange(value);
    resultActions.change.run(value);
  }, [value]);

  const widthValue = defaultWidths[options?.width || DefaultWidths.SMALL];
  const widthStyles = [minWidth(widthValue), maxWidth(widthValue)];

  return (
    <ClearInputWrapper styles={widthStyles} needShow={!!value && options?.cleanable} clear={() => setValue("")}>
      <Input
        outerStyles={[styles, fullWidth]}
        styles={[fullWidth, minWidth("100%"), maxWidth("100%")]}
        size={options?.size}
        value={value || ""}
        placeholder={options?.placeholder || "Не заполнено"}
        iconLeft={options?.iconLeft}
        debounce={options?.debounce}
        multiline={options?.multiline}
        disabled={disabled}
        error={!!error}
        tip={error}
        onChange={setValue}
      />
    </ClearInputWrapper>
  );
}

export default React.memo(observer(ActionInput));
