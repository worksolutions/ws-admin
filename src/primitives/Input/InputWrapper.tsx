import React from "react";

import Typography, { TypographyTypes } from "primitives/Typography";
import Wrapper from "primitives/Wrapper";
import Icon, { Icons } from "primitives/Icon";

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
  marginTop,
  position,
  top,
  left,
  transform,
  right,
} from "libs/styles";

export enum InputSize {
  MEDIUM,
  LARGE,
}

const stylesForSize = {
  [InputSize.LARGE]: {
    withIconLeft: {
      base: [padding("10px 12px 10px 40px")],
      focused: [padding("9px 11px 9px 39px")],
    },
    withIconRight: {
      base: [padding("10px 40px 10px 12px")],
      focused: [padding("9px 39px 9px 11px")],
    },
    withIcons: {
      base: [padding("10px 40px 10px 40px")],
      focused: [padding("9px 39px 9px 39px")],
    },
    withoutIcons: {
      base: [padding("10px 12px")],
      focused: [padding("9px 11px")],
    },
  },
  [InputSize.MEDIUM]: {
    withIconLeft: {
      base: [padding("6px 12px 6px 40px")],
      focused: [padding("5px 11px 5px 39px")],
    },
    withIconRight: {
      base: [padding("6px 40px 6px 12px")],
      focused: [padding("5px 39px 5px 11px")],
    },
    withIcons: {
      base: [padding("6px 40px 6px 40px")],
      focused: [padding("5px 39px 5px 39px")],
    },
    withoutIcons: {
      base: [padding("6px 12px")],
      focused: [padding("5px 11px")],
    },
  },
};

function getStylesNameOnIcons(hasLeftIcon: boolean, hasRightIcon: boolean): keyof typeof stylesForSize["0"] {
  if (hasLeftIcon && hasRightIcon) return "withIcons";
  if (hasLeftIcon) return "withIconLeft";
  if (hasRightIcon) return "withIconRight";
  return "withoutIcons";
}

export interface BaseInputWrapperInterface {
  outerStyles?: any;
  fullWidth?: boolean;
  iconLeft?: Icons;
  iconRight?: Icons;
  disabled?: boolean;
  title?: string;
  tip?: string;
  size?: InputSize;
}

interface InputWrapperInterface extends BaseInputWrapperInterface {
  children: (styles: any) => JSX.Element;
}

function InputWrapper({
  outerStyles,
  children,
  fullWidth: fullWidthProp,
  title,
  size = InputSize.LARGE,
  tip,
  iconLeft,
  iconRight,
}: InputWrapperInterface) {
  const stylesOnIcons = stylesForSize[size][getStylesNameOnIcons(!!iconLeft, !!iconRight)];
  const leftIconElement = iconLeft && (
    <Icon
      styles={[position("absolute"), top("50%"), left(8), transform("translateY(-50%)")]}
      color="gray-blue/05"
      iconName={iconLeft}
    />
  );
  const rightIconElement = iconRight && (
    <Icon
      styles={[position("absolute"), top("50%"), right(8), transform("translateY(-50%)")]}
      color="gray-blue/07"
      iconName={iconRight}
    />
  );

  return (
    <Wrapper styles={[fullWidthProp && fullWidth, outerStyles]}>
      {title && <Typography styles={[marginBottom(8)]}>{title}</Typography>}
      <Wrapper styles={[fullWidth, backgroundColor("gray-blue/01"), position("relative")]}>
        {children([
          TypographyTypes["body-regular"],
          transition("all 0.2s"),
          border(1, "gray-blue/02"),
          borderRadius(4),
          fullWidth,
          disableOutline,
          backgroundColor("transparent"),
          color("gray-blue/09"),
          child(color("gray-blue/04"), "::placeholder"),
          stylesOnIcons.base,
          hover([borderColor("gray-blue/04")]), // todo вынести в родителя
          focus([border(2, "blue/05"), stylesOnIcons.focused]),
        ])}
        {leftIconElement}
        {rightIconElement}
      </Wrapper>
      {tip && (
        <Typography type="caption-regular" color="gray-blue/07" styles={[marginTop(4)]}>
          {tip}
        </Typography>
      )}
    </Wrapper>
  );
}

export default InputWrapper;
