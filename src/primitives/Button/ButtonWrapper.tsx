import React, { Ref } from "react";

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
import Hint from "../Popper/Hint";

import { buttonStylesMap } from "./styles";
import { ButtonSize, ButtonType } from "./types";

function getStylesNameOnIcons(
  hasLeftIcon: boolean,
  hasRightIcon: boolean,
): keyof typeof buttonStylesMap["PRIMARY"]["0"] {
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
  iconLeftWidth?: number;
  iconLeftHeight?: number;
  iconRightWidth?: number;
  iconRightHeight?: number;
  disabled?: boolean;
  spinner?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  alternativeText?: string;
  styles?: any;
}

interface ButtonWrapperInterface extends BaseButtonWrapperInterface {
  children: (
    styles: any,
    icons: { iconLeft: React.ReactNode; iconRight: React.ReactNode },
    hintRef?: Ref<HTMLElement>,
  ) => JSX.Element;
}

function ButtonWrapper({
  children,
  size = ButtonSize.LARGE,
  type = ButtonType.PRIMARY,
  iconLeft,
  iconRight,
  styles,
  loading,
  iconLeftWidth,
  iconLeftHeight,
  iconRightWidth,
  iconRightHeight,
  alternativeText,
  disabled,
}: ButtonWrapperInterface) {
  const isIconButton = type === ButtonType.ICON;
  const buttonStyles = buttonStylesMap[type][size];

  const icons = React.useMemo(() => {
    if (isIconButton)
      return {
        iconLeft: iconLeft || iconRight,
        iconRight: null,
        leftWidth: iconLeftWidth || iconRightWidth,
        leftHeight: iconLeftHeight || iconRightHeight,
        rightWidth: 0,
        rightHeight: 0,
      };

    return {
      iconLeft,
      iconRight: iconRight,
      leftWidth: iconLeftWidth,
      leftHeight: iconLeftHeight,
      rightWidth: iconRightWidth,
      rightHeight: iconRightHeight,
    };
  }, [iconLeft, iconRight]);

  const resultStyles = buttonStyles[getStylesNameOnIcons(!!icons.iconLeft, !!icons.iconRight)];

  const leftIconElement = icons.iconLeft && (
    <Icon className="icon icon-left" icon={icons.iconLeft} width={icons.leftWidth} height={icons.leftHeight} />
  );

  const rightIconElement = loading ? (
    <Spinner className="icon icon-right" />
  ) : (
    icons.iconRight && (
      <Icon className="icon icon-right" icon={icons.iconRight} width={icons.rightWidth} height={iconRightHeight} />
    )
  );

  const isActive = !loading;

  const getChildren = (initParent?: Ref<HTMLElement>) =>
    children(
      [
        position("relative"),
        inlineFlex,
        jc(Aligns.CENTER),
        transition("all 200ms"),
        TypographyTypes["button"],
        borderRadius(6),
        disableOutline,
        resultStyles.default,
        disabled
          ? resultStyles.disabled
          : isActive && [pointer, hover(resultStyles.hover), focus(resultStyles.focused), active(resultStyles.active)],
        styles,
      ],
      { iconLeft: leftIconElement, iconRight: rightIconElement },
      initParent,
    );

  return alternativeText ? (
    <div>
      <Hint text={alternativeText} margin={0}>
        {(initParent) => getChildren(initParent)}
      </Hint>
    </div>
  ) : (
    getChildren()
  );
}

export default ButtonWrapper;
