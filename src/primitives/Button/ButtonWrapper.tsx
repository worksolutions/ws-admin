import React from "react";

import { TypographyTypes } from "primitives/Typography";
import Icon, { Icons } from "primitives/Icon";
import Wrapper from "primitives/Wrapper";

import {
  padding,
  backgroundColor,
  border,
  borderRadius,
  hover,
  transition,
  focus,
  disableOutline,
  color,
  position,
  top,
  left,
  transform,
  right,
  createLinearGradientColor,
  display,
  fillColor,
  child,
  pointer,
} from "libs/styles";

export enum ButtonSize {
  LARGE,
  MEDIUM,
}

export enum ButtonType {
  PRIMARY,
  ICON,
}

const stylesForSize = {
  [ButtonSize.LARGE]: {
    withIconLeft: {
      base: [padding("8px 20px 8px 48px")],
      focused: [padding("7px 19px 7px 47px")],
    },
    withIconRight: {
      base: [padding("8px 48px 8px 20px")],
      focused: [padding("7px 47px 7px 19px")],
    },
    withIcons: {
      base: [padding("8px 48px 8px 48px")],
      focused: [padding("7px 47px 7px 47px")],
    },
    withoutIcons: {
      base: [padding("8px 20px")],
      focused: [padding("7px 19px")],
    },
  },
  [ButtonSize.MEDIUM]: {
    withIconLeft: {
      base: [padding("4px 16px 4px 48px")],
      focused: [padding("3px 15px 3px 47px")],
    },
    withIconRight: {
      base: [padding("4px 48px 4px 16px")],
      focused: [padding("3px 47px 3px 15px")],
    },
    withIcons: {
      base: [padding("4px 48px 4px 48px")],
      focused: [padding("3px 47px 3px 47px")],
    },
    withoutIcons: {
      base: [padding("4px 16px")],
      focused: [padding("3px 15px")],
    },
  },
};

const stylesForType = {
  [ButtonType.PRIMARY]: {
    default: [
      pointer,
      backgroundColor("blue/05"),
      border(1, "blue/07"),
      color("white"),
      child(fillColor("white"), ".icon use"),
    ],
    hover: [backgroundColor("blue/04")],
    focused: [backgroundColor(createLinearGradientColor("blue/04", "blue/05", "180deg")), border(2, "blue/09")],
  },
  [ButtonType.ICON]: {
    default: [
      pointer,
      backgroundColor("blue/05"),
      border(1, "blue/07"),
      color("white"),
      child(fillColor("white"), ".icon use"),
    ],
    hover: [backgroundColor("blue/04")],
    focused: [backgroundColor(createLinearGradientColor("blue/04", "blue/05", "180deg")), border(2, "blue/09")],
  },
};

function getStylesNameOnIcons(hasLeftIcon: boolean, hasRightIcon: boolean): keyof typeof stylesForSize["0"] {
  if (hasLeftIcon && hasRightIcon) return "withIcons";
  if (hasLeftIcon) return "withIconLeft";
  if (hasRightIcon) return "withIconRight";
  return "withoutIcons";
}

export interface BaseButtonWrapperInterface {
  iconLeft?: Icons;
  iconRight?: Icons;
  disabled?: boolean;
  spinner?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
}

interface ButtonWrapperInterface extends BaseButtonWrapperInterface {
  children: (styles: any, icons: JSX.Element) => JSX.Element;
}

function ButtonWrapper({
  children,
  size = ButtonSize.LARGE,
  type = ButtonType.PRIMARY,
  iconLeft,
  iconRight,
}: ButtonWrapperInterface) {
  const stylesOnIcons = stylesForSize[size][getStylesNameOnIcons(!!iconLeft, !!iconRight)];
  const stylesOnType = stylesForType[type];

  const leftIconElement = iconLeft && (
    <Icon
      className="icon"
      styles={[position("absolute"), top("50%"), left(18), transform("translateY(-50%)")]}
      iconName={iconLeft}
    />
  );

  const rightIconElement = iconRight && (
    <Icon
      className="icon"
      styles={[position("absolute"), top("50%"), right(18), transform("translateY(-50%)")]}
      iconName={iconRight}
    />
  );

  return (
    <Wrapper styles={[position("relative"), display("inline-block"), hover([stylesOnType.hover], "button")]}>
      {children(
        [
          transition("all 0.2s"),
          TypographyTypes["button"],
          borderRadius(4),
          disableOutline,
          stylesOnType.default,
          stylesOnIcons.base,
          focus([stylesOnType.focused, stylesOnIcons.focused]),
        ],
        <>
          {leftIconElement}
          {rightIconElement}
        </>,
      )}
    </Wrapper>
  );
}

export default ButtonWrapper;
