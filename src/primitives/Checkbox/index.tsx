import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Icon from "primitives/Icon";

import {
  Aligns,
  flex,
  jc,
  ai,
  padding,
  height,
  width,
  fullWidth,
  borderRadius,
  boxShadow,
  pointer,
  hover,
  backgroundColor,
  borderNone,
  disableOutline,
  transition,
  focus,
  active,
  cursor,
  marginLeft,
} from "libs/styles";

type CheckboxProprs = {
  text: string;
  isChecked: boolean;
  onChange: (value: boolean) => void;
  error?: boolean;
};

function getCheckboxStyles({ isChecked = false, error = false }) {
  return [
    !isChecked && boxShadow([0, 0, 0, 1, "gray-blue/03", true]),
    backgroundColor(isChecked ? "blue/05" : "transparent"),
    hover(backgroundColor(isChecked ? "blue/06" : "gray-blue/01")),
    active(backgroundColor(isChecked ? "blue/07" : "gray-blue/02")),
    error && boxShadow([0, 0, 0, 2, "red/05"]),
  ];
}

function Checkbox({ text, isChecked, error, onChange }: CheckboxProprs) {
  const styles = React.useMemo(() => getCheckboxStyles({ isChecked, error }), [isChecked, error]);
  return (
    <Wrapper
      styles={[fullWidth, height(24), padding(4), flex, jc(Aligns.START), ai(Aligns.CENTER)]}
      onClick={() => onChange(!isChecked)}
    >
      <Wrapper
        as="button"
        styles={[
          transition("box-shadow 0.2s"),
          padding(0),
          disableOutline,
          borderNone,
          width(16),
          height(16),
          borderRadius(4),
          pointer,
          focus(boxShadow([0, 0, 0, 2, "blue/04"])),
          styles,
        ]}
      >
        {isChecked && <Icon width={16} height={16} icon="check" color="white" />}
      </Wrapper>
      <Typography styles={[marginLeft(12), cursor("default")]}>{text}</Typography>
    </Wrapper>
  );
}

export default React.memo(Checkbox);
