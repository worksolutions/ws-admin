import React from "react";

import { TypographyTypes } from "primitives/Typography";
import Icon, { Icons } from "primitives/Icon";

import {
  active,
  Aligns,
  borderRadius,
  disableOutline,
  focus,
  hover,
  inlineFlex,
  jc,
  pointer,
  position,
  transition,
} from "libs/styles";

import Spinner from "../Spinner";

import { buttonStylesMap } from "./styles";
import { ButtonSize, ButtonType } from "./types";

function getStylesNameOnIcons(hasLeftIcon: boolean, hasRightIcon: boolean): keyof typeof buttonStylesMap["0"]["0"] {
  if (hasLeftIcon && hasRightIcon) return "withTwoIcons";
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
  const buttonStyles = buttonStylesMap[size][type];

  const [icons] = React.useState(() => {
    return {
      iconLeft: isIconButton ? iconLeft || iconRight : loading ? <Spinner className="icon icon-left" /> : iconLeft,
      iconRight: isIconButton ? null : iconRight,
    };
  });

  const resultStyles = buttonStyles[getStylesNameOnIcons(!!icons.iconLeft, !!icons.iconRight)];

  const leftIconElement = iconLeft && <Icon className="icon icon-left" iconName={iconLeft} />;

  const rightIconElement = isIconButton ? null : loading ? (
    <Spinner className="icon icon-right" />
  ) : (
    <Icon className="icon icon-right" iconName={iconRight} />
  );

  const isActive = !loading;

  return children(
    [
      position("relative"),
      inlineFlex,
      jc(Aligns.CENTER),
      transition("all 200ms"),
      TypographyTypes["button"],
      borderRadius(6),
      disableOutline,
      resultStyles.default,
      isActive && [pointer, hover(resultStyles.hover), focus(resultStyles.focused), active(resultStyles.active)],
      styles,
    ],
    leftIconElement,
    rightIconElement,
  );
}

export default ButtonWrapper;
