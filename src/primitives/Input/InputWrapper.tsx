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
  Colors,
  borderWidth,
  boxShadow,
} from "libs/styles";
import { isString } from "libs/is";

export enum InputSize {
  MEDIUM = "medium",
  LARGE = "large",
}

enum InputVariant {
  DEFAULT,
  ERROR,
  SUCCESS,
  DISABLED,
}

const stylesForSize = {
  [InputSize.LARGE]: {
    withIconLeft: padding("10px 12px 10px 40px"),
    withIconRight: padding("10px 40px 10px 12px"),
    withIcons: padding("10px 40px 10px 40px"),
    withoutIcons: padding("10px 12px"),
  },
  [InputSize.MEDIUM]: {
    withIconLeft: padding("6px 12px 6px 40px"),
    withIconRight: padding("6px 40px 6px 12px"),
    withIcons: padding("6px 40px 6px 40px"),
    withoutIcons: padding("6px 12px"),
  },
};

const colorsByVariant: Record<
  InputVariant,
  { background: Colors; shadowColor: Colors; tip: Colors; placeholder: Colors }
> = {
  [InputVariant.DEFAULT]: {
    background: "gray-blue/01",
    shadowColor: "gray-blue/02",
    tip: "gray-blue/07",
    placeholder: "gray-blue/04",
  },
  [InputVariant.ERROR]: {
    background: "red/01",
    shadowColor: "red/05",
    tip: "red/07",
    placeholder: "gray-blue/04",
  },
  [InputVariant.SUCCESS]: {
    background: "green/01",
    shadowColor: "green/05",
    tip: "green/07",
    placeholder: "gray-blue/04",
  },
  [InputVariant.DISABLED]: {
    background: "gray-blue/01",
    shadowColor: "transparent",
    tip: "gray-blue/07",
    placeholder: "gray-blue/03",
  },
};

function getStylesNameOnIcons(hasLeftIcon: boolean, hasRightIcon: boolean): keyof typeof stylesForSize["large"] {
  if (hasLeftIcon && hasRightIcon) return "withIcons";
  if (hasLeftIcon) return "withIconLeft";
  if (hasRightIcon) return "withIconRight";
  return "withoutIcons";
}

export interface BaseInputWrapperInterface {
  outerStyles?: any;
  fullWidth?: boolean;
  iconLeft?: Icons;
  iconRight?: Icons | JSX.Element;
  disabled?: boolean;
  title?: string;
  tip?: string;
  size?: InputSize;
  error?: boolean;
  success?: boolean;
}

function getInputVariant(error?: boolean, success?: boolean, disabled?: boolean) {
  if (disabled) return InputVariant.DISABLED;
  if (error) return InputVariant.ERROR;
  if (success) return InputVariant.SUCCESS;
  return InputVariant.DEFAULT;
}

function Title({ title }: Record<"title", string | undefined>) {
  if (!title) return null;
  return <Typography styles={[marginBottom(8)]}>{title}</Typography>;
}

function Tip({ tip, color }: { tip: string | undefined; color: Colors }) {
  if (!tip) return null;
  return (
    <Typography type="caption-regular" color={color} styles={[marginTop(4)]}>
      {tip}
    </Typography>
  );
}

export const _defaultIconStyles = [position("absolute"), top("50%"), transform("translateY(-50%)")];

function InputWrapper({
  outerStyles,
  children,
  fullWidth: fullWidthProp,
  title,
  size = InputSize.LARGE,
  tip,
  iconLeft,
  iconRight,
  error,
  success,
  disabled,
}: BaseInputWrapperInterface & {
  children: (styles: any) => JSX.Element;
}) {
  const styles = stylesForSize[size][getStylesNameOnIcons(!!iconLeft, !!iconRight)];

  const leftIconElement = iconLeft && (
    <Icon styles={[_defaultIconStyles, left(8)]} color="gray-blue/05" iconName={iconLeft} />
  );
  const rightIconElement = isString(iconRight) ? (
    <Icon styles={[_defaultIconStyles, right(8)]} color="gray-blue/07" iconName={iconRight} />
  ) : (
    iconRight
  );

  const variant = getInputVariant(error, success, disabled);

  const colors = colorsByVariant[variant];

  return (
    <Wrapper styles={[fullWidthProp && fullWidth, outerStyles]}>
      <Title title={title} />
      <Wrapper styles={[fullWidth, backgroundColor(colors.background), borderRadius(6), position("relative")]}>
        {children([
          TypographyTypes["body-regular"],
          transition("all 0.2s"),
          borderWidth(0),
          boxShadow([0, 0, 0, 1, colors.shadowColor]),
          borderRadius(6),
          fullWidth,
          disableOutline,
          backgroundColor("transparent"),
          color("gray-blue/09"),
          child([color(colors.placeholder), transition("all 0.2s")], "::placeholder"),
          styles,
          variant === InputVariant.DEFAULT
            ? [hover(boxShadow([0, 0, 0, 1, "gray-blue/03"]))]
            : [boxShadow([0, 0, 0, 2, colors.shadowColor])],
          focus([boxShadow([0, 0, 0, 2, "blue/05"]), child(color("gray-blue/03"), "::placeholder")]),
        ])}
        {leftIconElement}
        {rightIconElement}
      </Wrapper>
      <Tip tip={tip} color={colors.tip} />
    </Wrapper>
  );
}

export default InputWrapper;
