import React, { Ref } from "react";

import Wrapper from "primitives/Wrapper";

import eventValue from "libs/decorators/eventValue";
import { useDebouncedInput } from "libs/hooks/useDebouncedInput";

import InputWrapper, { BaseInputWrapperInterface } from "./InputWrapper";

export interface InputInterface extends Omit<BaseInputWrapperInterface, "onClick"> {
  autofocus?: boolean;
  multiline?: boolean;
  styles?: any;
  value: string;
  placeholder?: string;
  debounce?: number;
  onChange: (value: string) => void;
}

const Input = React.forwardRef(function (
  { autofocus, value, onChange, placeholder, multiline, debounce = 100, styles, ...inputWrapperProps }: InputInterface,
  ref: Ref<HTMLInputElement>,
) {
  const { onInputChange, inputValue } = useDebouncedInput(value, debounce, onChange);
  return (
    <InputWrapper
      {...inputWrapperProps}
      renderComponent={(inputStyles) => (
        <>
          <Wrapper
            ref={ref}
            {...(multiline ? { as: "textarea" } : { as: "input" })}
            autoFocus={autofocus}
            disabled={inputWrapperProps.disabled}
            styles={[inputStyles, styles]}
            value={inputValue}
            placeholder={placeholder}
            onChange={eventValue(onInputChange)}
          />
        </>
      )}
    />
  );
});

export default React.memo(Input);

export { InputSize } from "./InputWrapper";
