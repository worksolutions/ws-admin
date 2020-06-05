import React from "react";

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

function Input({ value, onChange, placeholder, debounce = 100, ...inputWrapperProps }: InputInterface) {
  const { onInputChange, inputValue } = useDebouncedInput(value, debounce, onChange);
  return (
    <InputWrapper {...inputWrapperProps}>
      {(inputStyles) => (
        <Wrapper
          as="input"
          styles={inputStyles}
          value={inputValue}
          placeholder={placeholder}
          onChange={eventValue(onInputChange)}
        />
      )}
    </InputWrapper>
  );
}

export default React.memo(Input);

export { InputSize } from "./InputWrapper";
