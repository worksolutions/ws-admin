import React from "react";
import { observer } from "mobx-react-lite";

import Input, { InputSize } from "primitives/Input/Input";
import Wrapper from "primitives/Wrapper";

import { useEffectSkipFirst } from "libs/hooks/common";
import { flex, fullWidth, marginRight, maxWidth, minWidth, width } from "libs/styles";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { useStateContextModel } from "modules/model";

import { defaultWidths, DefaultWidths } from "../widths";

import InfoBar from "./InfoBar";

import { BlockInterface } from "state/globalState";

export interface InputOptionsInterface {
  width?: DefaultWidths;
  debounce?: number;
  valueContext: string;
  confirmationContext: string;
  size?: InputSize;
}

type ActionPasswordInterface = BlockInterface<InputOptionsInterface, "valueChange" | "confirmationChange"> & {
  styles?: any;
};

function PasswordAction({ actions, options, styles }: ActionPasswordInterface) {
  if (!actions?.valueChange) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);

  const {
    value,
    model: { disabled, error },
    setValue,
  } = useStateContextModel(options!.valueContext, appContext);

  const {
    value: confirmation,
    model: { disabled: confirmationDisabled, error: confirmationError },
    setValue: setConfirmation,
  } = useStateContextModel(options!.confirmationContext, appContext);

  useEffectSkipFirst(() => {
    resultActions.valueChange.run(value);
  }, [value]);

  useEffectSkipFirst(() => {
    resultActions.confirmationChange.run(confirmation);
  }, [confirmation]);

  const widthValue = defaultWidths[options?.width || DefaultWidths.SMALL];

  const inputWidthStyle = width("calc(50% - 8px)");

  return (
    <Wrapper styles={[flex, minWidth(widthValue), maxWidth(widthValue), styles]}>
      <Wrapper styles={[inputWidthStyle, marginRight(16)]}>
        <Input
          outerStyles={fullWidth}
          size={options?.size}
          value={value || ""}
          placeholder="Пароль"
          debounce={options?.debounce || 1}
          disabled={disabled}
          error={!!error}
          tip={error}
          type="password"
          onChange={setValue}
        />
        <InfoBar password={value} />
      </Wrapper>
      <Wrapper styles={inputWidthStyle}>
        <Input
          outerStyles={fullWidth}
          size={options?.size}
          value={confirmation}
          placeholder="Подтвердите пароль"
          debounce={100}
          disabled={confirmationDisabled}
          error={!!confirmationError}
          tip={confirmationError}
          type="password"
          onChange={setConfirmation}
        />
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(observer(PasswordAction));
