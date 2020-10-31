import React from "react";
import { duration160 } from "layout/durations";

import { TypographyTypes } from "primitives/Typography";
import Icon, { Icons } from "primitives/Icon";

import {
  active,
  Aligns,
  borderRadius,
  child,
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

function getStylesNameOnIcons(
  hasLeftIcon: boolean,
  hasRightIcon: boolean,
): keyof typeof buttonStylesMap["PRIMARY"]["LARGE"] {
  if (hasLeftIcon && hasRightIcon) return "withTwoIcons";
  if (hasLeftIcon) return "withIconLeft";
  if (hasRightIcon) return "withIconRight";
  return "withoutIcons";
}

export interface BaseButtonWrapperInterface {
  loadingLeft?: boolean;
  loadingRight?: boolean;
  iconLeft?: Icons;
  iconRight?: Icons;
  iconLeftWidth?: number;
  iconLeftHeight?: number;
  iconRightWidth?: number;
  iconRightHeight?: number;
  disabled?: boolean;
  spinner?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  styles?: any;
}

interface ButtonWrapperInterface extends BaseButtonWrapperInterface {
  children: (styles: any, iconLeft: React.ReactNode, iconRight: React.ReactNode) => JSX.Element;
}

const cssAnimateProperties = [
  "color",
  "fill",
  "border",
  "box-shadow",
  "opacity",
  "background-color",
  "width",
  "height",
  "padding",
  "transform",
];

const transitionStyle = transition(cssAnimateProperties.map((val) => `${val} ${duration160}`).join(","));

function makeIcon(
  loading: boolean | undefined,
  icon: Icons | undefined,
  { height, width, className }: { className: string; width?: number; height?: number },
) {
  const resultClassName = `icon ${className}`;

  if (loading) return <Spinner className={resultClassName} />;
  if (!icon) return null;

  return <Icon className={resultClassName} icon={icon} width={width} height={height} />;
}

function ButtonWrapper({
  children,
  size = ButtonSize.LARGE,
  type = ButtonType.PRIMARY,
  iconLeft,
  iconRight,
  styles,
  loadingLeft,
  loadingRight,
  iconLeftWidth,
  iconLeftHeight,
  iconRightWidth,
  iconRightHeight,
  disabled,
}: ButtonWrapperInterface) {
  const isIconButton = type === ButtonType.ICON;
  const buttonStyles = buttonStylesMap[type][size];

  const icons = React.useMemo(() => {
    if (isIconButton)
      return {
        iconLeft: iconLeft || iconRight,
        iconRight: undefined,
        leftWidth: iconLeftWidth || iconRightWidth,
        leftHeight: iconLeftHeight || iconRightHeight,
        rightWidth: 0,
        rightHeight: 0,
      };

    return {
      iconLeft,
      iconRight,
      leftWidth: iconLeftWidth,
      leftHeight: iconLeftHeight,
      rightWidth: iconRightWidth,
      rightHeight: iconRightHeight,
    };
  }, [iconLeft, iconRight]);

  const resultStyles = buttonStyles[getStylesNameOnIcons(!!icons.iconLeft, !!icons.iconRight)];

  const leftIconElement = makeIcon(loadingLeft, icons.iconLeft, {
    className: "icon-left",
    width: icons.leftWidth,
    height: icons.leftHeight,
  });

  const rightIconElement = makeIcon(loadingRight, icons.iconRight, {
    className: "icon-right",
    width: icons.rightWidth,
    height: icons.rightHeight,
  });

  const isNotLoading = !(loadingLeft || loadingRight);

  return children(
    [
      position("relative"),
      inlineFlex,
      jc(Aligns.CENTER),
      transitionStyle,
      child(transitionStyle, ".icon"),
      child(transitionStyle, ".icon use"),
      TypographyTypes["button"],
      borderRadius(6),
      disableOutline,
      resultStyles.default,
      disabled
        ? resultStyles.disabled
        : isNotLoading && [
            pointer,
            hover(resultStyles.hover),
            focus(resultStyles.focused),
            active(resultStyles.active),
          ],
      styles,
    ],
    leftIconElement,
    rightIconElement,
  );
}

export default ButtonWrapper;
