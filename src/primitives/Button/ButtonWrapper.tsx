import React from "react";

import { TypographyTypes } from "primitives/Typography";
import Icon, { Icons } from "primitives/Icon";

import { borderRadius, disableOutline, focus, hover, transition } from "libs/styles";

import { stylesForSize, stylesForType } from "./styles";
import { ButtonSize, ButtonType } from "./types";

function getStylesNameOnIcons(
  hasLeftIcon: boolean,
  hasRightIcon: boolean,
): keyof typeof stylesForSize["0"]["defaultStyles"] {
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
  outerStyles?: any;
}

interface ButtonWrapperInterface extends BaseButtonWrapperInterface {
  children: (styles: any, iconLeft: React.ReactNode, iconRight: React.ReactNode) => JSX.Element;
}

function ButtonWrapper({
  children,
  size = ButtonSize.LARGE,
  type = ButtonType.PRIMARY,
  iconLeft,
  iconRight,
  outerStyles,
}: ButtonWrapperInterface) {
  const isIconButton = type === ButtonType.ICON;
  const { defaultStyles, overrideTypeStyles } = stylesForSize[size];
  const stylesOnIcons = defaultStyles[getStylesNameOnIcons(!!iconLeft, isIconButton ? false : !!iconRight)];
  const stylesOnType = stylesForType[type];
  const stylesOnTypeOverride = overrideTypeStyles[type];

  const leftIconElement = iconLeft && <Icon className="icon icon-left" iconName={iconLeft} />;
  const rightIconElement = !isIconButton && iconRight && <Icon className="icon icon-right" iconName={iconRight} />;

  return children(
    [
      transition("all 200ms"),
      TypographyTypes["button"],
      borderRadius(4),
      disableOutline,
      stylesOnType.default,
      stylesOnIcons.default,
      stylesOnTypeOverride?.default,
      hover(stylesOnType.hover),
      focus([stylesOnType.focused, stylesOnIcons.focused, stylesOnTypeOverride?.focused]),
      outerStyles,
    ],
    leftIconElement,
    rightIconElement,
  );
}

export default ButtonWrapper;
