import React, { Ref } from "react";
import { useToggle } from "react-use";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import eventValue from "libs/decorators/eventValue";
import { useDebouncedInput } from "libs/hooks";
import { right } from "libs/styles";

import InputWrapper, { _defaultIconStyles } from "./InputWrapper";
import { InputInterface } from "./Input";

interface InputPasswordInterface extends Omit<InputInterface, "iconRight"> {}

const Password = React.forwardRef(function (
  { value, onChange, placeholder, debounce = 100, styles, ...inputWrapperProps }: InputPasswordInterface,
  ref: Ref<HTMLInputElement>,
) {
  const { onInputChange, inputValue } = useDebouncedInput(value, debounce, onChange);
  const [showPassword, toggleShowPassword] = useToggle(false);
  return (
    <InputWrapper
      {...inputWrapperProps}
      iconRight={
        <Button
          styles={[_defaultIconStyles, right(8)]}
          size={ButtonSize.SMALL}
          type={ButtonType.ICON}
          iconLeft={showPassword ? "eye-on" : "eye-off"}
          onClick={toggleShowPassword}
        />
      }
    >
      {(inputStyles) => (
        <Wrapper
          ref={ref}
          as="input"
          disabled={inputWrapperProps.disabled}
          type={showPassword ? "text" : "password"}
          styles={[inputStyles, styles]}
          value={inputValue}
          placeholder={placeholder}
          onChange={eventValue(onInputChange)}
        />
      )}
    </InputWrapper>
  );
});

export default React.memo(Password);

export { InputSize } from "./InputWrapper";
