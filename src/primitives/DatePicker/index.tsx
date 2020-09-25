import React from "react";
import { animated } from "react-spring";
import { zIndex_popup } from "layout/zIndexes";

import MaskedInput from "primitives/Input/MaskedInput";
import { InputInterface } from "primitives/Input/Input";
import usePopper from "primitives/Popper/usePopper";
import Wrapper from "primitives/Wrapper";

import { opacity, width } from "libs/styles";
import { cb } from "libs/CB";
import { useEffectSkipFirst } from "libs/hooks/common";
import { provideRef } from "libs/provideRef";

import HandleClickOutside from "../HandleClickOutside";
import { useVisibilityAnimation } from "../Popper/useVisibilityAnimation";

import { configByMode, DatePickerMode } from "./config";
import { useInnerValueChange } from "./useInnerValueChange";
import Calendar from "./Calendar";

export { DatePickerMode } from "./config";

interface DatePickerInterface extends Omit<InputInterface, "value" | "onChange"> {
  initialValue?: string | null;
  allowEmpty?: boolean;
  mode?: DatePickerMode;
  min?: string;
  max?: string;
  hasCurrentDayButton?: boolean;
  onChange: (value: string | null) => void;
}

const maskCharacter = "_";

export default cb(
  {
    useStateBuilder: ({
      initialValue,
      mode = DatePickerMode.DATE,
      allowEmpty = true,
      min: minProp,
      max: maxProp,
      onChange,
    }: DatePickerInterface) => {
      const config = configByMode[mode];

      const [inputValue, setInputValue] = React.useState(() => initialValue || "");

      useEffectSkipFirst(() => {
        setInputValue(initialValue || "");
      }, [initialValue]);

      const [lastValidValue, setLastValidValue] = React.useState(() => inputValue || null);

      const [error, setError] = React.useState(false);

      const { min, max } = useInnerValueChange(inputValue, allowEmpty, {
        maskCharacter,
        config,
        min: minProp,
        max: maxProp,
        onChange: (value) => {
          setLastValidValue(value);
          onChange(value);
        },
        setError,
      });

      return { config, inputValue, setInputValue, lastValidValue, error, min, max };
    },
  },
  function DatePicker(
    { tip, error: errorProp, size, placeholder, outerStyles, hasCurrentDayButton },
    { state: { config, inputValue, min, max, setInputValue, error, lastValidValue } },
  ) {
    const { opened, style, close, open } = useVisibilityAnimation();
    const { initPopper, placement } = usePopper({ placement: "bottom-start" });

    function inputRef(input: HTMLInputElement | null) {
      if (!input) return;
      initPopper("parent")(input);
      input.addEventListener("focus", () => open());
    }

    function inputOuterRef(element: HTMLElement | null) {
      if (!element) return;
      element.addEventListener("click", () => open());
    }

    return (
      <HandleClickOutside enabled={opened} onClickOutside={close}>
        {(ref) => (
          <MaskedInput
            size={size}
            outerRef={provideRef(ref, inputOuterRef)}
            ref={inputRef}
            error={error || errorProp}
            tip={tip}
            value={inputValue}
            mask={config.mask}
            guide
            maskCharacter={maskCharacter}
            placeholder={placeholder || config.placeholder}
            outerStyles={[width(config.width), outerStyles]}
            iconRight="calendar"
            onChange={setInputValue}
          >
            <Wrapper
              as={animated.div}
              style={style}
              styles={[zIndex_popup, opacity(opened ? 1 : 0.6)]}
              ref={initPopper("child")}
            >
              <Calendar
                min={min}
                max={max}
                value={lastValidValue}
                placement={placement}
                momentFormat={config.momentFormat}
                hasCurrentDayButton={hasCurrentDayButton}
                onChange={setInputValue}
              />
            </Wrapper>
          </MaskedInput>
        )}
      </HandleClickOutside>
    );
  },
);
