import React from "react";

import Typography from "primitives/Typography";
import Wrapper from "primitives/Wrapper";

import {
  fullWidth,
  marginBottom,
  padding,
  backgroundColor,
  border,
  borderRadius,
  hover,
  borderColor,
  transition,
  focus,
  disableOutline,
  color,
  child,
} from "libs/styles";

export enum InputSize {
  MEDIUM,
  LARGE,
}

export interface BaseInputWrapperInterface {
  outerStyles?: any;
  fullWidth?: boolean;
  multiline?: boolean;
  leftIconButton?: any;
  rightIconButton?: any;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  title?: string;
  tip?: string;
  size?: InputSize;
}

const stylesForSize = {
  [InputSize.LARGE]: {
    base: [padding("10px 12px")],
    focused: [padding("9px 11px")],
  },
  [InputSize.MEDIUM]: {
    base: [padding("6px 12px")],
    focused: [padding("5px 11px")],
  },
};

interface InputWrapperInterface extends BaseInputWrapperInterface {
  children: (styles: any) => JSX.Element;
}

function InputWrapper({
  outerStyles,
  children,
  fullWidth: fullWidthProp,
  title,
  size = InputSize.LARGE,
}: InputWrapperInterface) {
  return (
    <Wrapper styles={[fullWidthProp && fullWidth, outerStyles]}>
      {title && <Typography styles={[marginBottom(8)]}>{title}</Typography>}
      <Wrapper styles={[fullWidth, backgroundColor("gray-blue/01")]}>
        {children([
          transition("all 0.2s"),
          border(1, "gray-blue/02"),
          borderRadius(4),
          fullWidth,
          disableOutline,
          backgroundColor("transparent"),
          color("gray-blue/09"),
          child(color("gray-blue/04"), "::placeholder"),
          stylesForSize[size].base,
          hover([borderColor("gray-blue/04")]),
          focus([border(2, "blue/05"), stylesForSize[size].focused]),
        ])}
      </Wrapper>
    </Wrapper>
  );
}

export default InputWrapper;
