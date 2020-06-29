import React from "react";

import { TypographyTypes } from "primitives/Typography";
import Icon, { Icons } from "primitives/Icon";

import { Aligns, borderRadius, disableOutline, focus, hover, inlineFlex, jc, pointer, transition } from "libs/styles";

import Spinner from "../Spinner";

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
  loading?: boolean;
  loadingText?: string;
  iconLeft?: Icons;
  iconRight?: Icons;
  disabled?: boolean;
  spinner?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  styles?: any;
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
  styles,
  loading,
}: ButtonWrapperInterface) {
  const isIconButton = type === ButtonType.ICON;
  const { defaultStyles, overrideTypeStyles } = stylesForSize[size];
  const stylesOnIcons = defaultStyles[getStylesNameOnIcons(!!iconLeft, isIconButton ? false : !!iconRight || loading!)];
  const stylesOnType = stylesForType[type];
  const stylesOnTypeOverride = overrideTypeStyles[type];

  const leftIconElement = iconLeft && <Icon className="icon icon-left" iconName={iconLeft} />;
  const rightIconElement = !isIconButton && loading ? <Spinner className="icon icon-right" /> : iconRight;

  const isActive = !loading;

  return children(
    [
      inlineFlex,
      jc(Aligns.CENTER),
      transition("all 200ms"),
      TypographyTypes["button"],
      borderRadius(6),
      disableOutline,
      stylesOnType.default,
      stylesOnIcons.default,
      stylesOnTypeOverride?.default,
      isActive && [
        pointer,
        hover(stylesOnType.hover),
        focus([stylesOnType.focused, stylesOnIcons.focused, stylesOnTypeOverride?.focused]),
      ],
      styles,
    ],
    leftIconElement,
    rightIconElement,
  );
}

export default ButtonWrapper;
