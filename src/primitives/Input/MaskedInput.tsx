import React, { Ref } from "react";
import useMaskedInput from "@viewstools/use-masked-input";

import Wrapper from "primitives/Wrapper";

import eventValue from "libs/decorators/eventValue";
import { provideRef } from "libs/provideRef";
import { useDebouncedInput } from "libs/hooks/useDebouncedInput";

import InputWrapper from "./InputWrapper";
import { InputInterface } from "./Input";

interface MaskedInputInterface extends InputInterface {
  mask: MaskType;
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
    <InputWrapper
      {...inputWrapperProps}
      renderComponent={(inputStyles) => (
        <Wrapper
          ref={provideRef((element) => {
            if (element === ref.current) return;
            provideRef(innerRef)(element);
          }, ref)}
          as="input"
          disabled={inputWrapperProps.disabled}
          styles={[inputStyles, styles]}
          placeholder={placeholder}
          onChange={onChangeMasked}
        />
      )}
    />
  );
});

export default React.memo(MaskedInput);

export { InputSize } from "./InputWrapper";

export const makeMask = function (elements: (RegExp | string)[]) {
  return { elements, maxLength: elements.length };
};

export type MaskType = ReturnType<typeof makeMask>;
