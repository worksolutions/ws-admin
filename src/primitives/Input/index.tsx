import React, { Ref } from "react";

import Wrapper from "primitives/Wrapper";

import eventValue from "libs/decorators/eventValue";
import { useDebouncedInput } from "libs/hooks";

import InputWrapper, { BaseInputWrapperInterface } from "./InputWrapper";

interface InputInterface extends BaseInputWrapperInterface {
  value: string;
  placeholder?: string;
  debounce?: number;
  onChange: (value: string) => void;
}

const Input = React.forwardRef(function (
  { value, onChange, placeholder, debounce = 100, ...inputWrapperProps }: InputInterface,
  ref: Ref<HTMLInputElement>,
) {
  const { onInputChange, inputValue } = useDebouncedInput(value, debounce, onChange);
  return (
    <InputWrapper {...inputWrapperProps}>
      {(inputStyles) => (
        <Wrapper
          ref={ref}
          as="input"
          styles={inputStyles}
          value={inputValue}
          placeholder={placeholder}
          onChange={eventValue(onInputChange)}
        />
      )}
    </InputWrapper>
  );
});

export default React.memo(Input);

export { InputSize } from "./InputWrapper";
