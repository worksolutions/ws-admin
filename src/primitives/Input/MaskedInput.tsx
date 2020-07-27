import React, { Ref } from "react";
import useMaskedInput from "@viewstools/use-masked-input";

import Wrapper from "primitives/Wrapper";

import eventValue from "libs/decorators/eventValue";
import { useDebouncedInput } from "libs/hooks";
import { provideRef } from "libs/provideRef";

import InputWrapper from "./InputWrapper";
import { InputInterface } from "./Input";

interface MaskedInputInterface extends InputInterface {
  mask: ReturnType<typeof makeMask>;
  guide?: boolean;
  showMaskWhenEmpty?: boolean;
  maskCharacter?: string;
}

const MaskedInput = React.forwardRef(function (
  {
    value,
    placeholder,
    debounce = 100,
    styles,
    showMaskWhenEmpty,
    guide = false,
    maskCharacter,
    mask,
    onChange,
    ...inputWrapperProps
  }: MaskedInputInterface,
  innerRef: Ref<HTMLInputElement>,
) {
  const ref = React.useRef<HTMLInputElement>();

  const { onInputChange, inputValue } = useDebouncedInput(value, debounce, onChange);

  const onChangeMasked = useMaskedInput({
    value: inputValue,
    input: ref,
    mask: mask.elements,
    guide,
    placeholderChar: maskCharacter,
    showMask: showMaskWhenEmpty,
    onChange: eventValue(onInputChange),
  });

  return (
    <InputWrapper {...inputWrapperProps}>
      {(inputStyles) => (
        <Wrapper
          length={2}
          ref={provideRef(innerRef, ref)}
          as="input"
          disabled={inputWrapperProps.disabled}
          styles={[inputStyles, styles]}
          placeholder={placeholder}
          onChange={onChangeMasked}
        />
      )}
    </InputWrapper>
  );
});

export default React.memo(MaskedInput);

export { InputSize } from "./InputWrapper";

export const makeMask = function (elements: RegExp[]) {
  return { elements, maxLength: elements.length };
};
