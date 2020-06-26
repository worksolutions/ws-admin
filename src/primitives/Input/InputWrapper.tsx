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
} from "libs/styles";
import { isString } from "libs/is";

export enum InputSize {
  MEDIUM,
  LARGE,
}

enum InputVariant {
  DEFAULT,
  ERROR,
  SUCCESS,
  DISABLED,
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

const colorsByVariant: Record<
  InputVariant,
  { background: Colors; border: Colors; tip: Colors; placeholder: Colors }
> = {
  [InputVariant.DEFAULT]: {
    background: "gray-blue/01",
    border: "gray-blue/02",
    tip: "gray-blue/07",
    placeholder: "gray-blue/04",
  },
  [InputVariant.ERROR]: {
    background: "red/01",
    border: "red/05",
    tip: "red/07",
    placeholder: "gray-blue/04",
  },
  [InputVariant.SUCCESS]: {
    background: "gray-blue/01",
    border: "green/05",
    tip: "green/07",
    placeholder: "gray-blue/04",
  },
  [InputVariant.DISABLED]: {
    background: "gray-blue/01",
    border: "transparent",
    tip: "gray-blue/07",
    placeholder: "gray-blue/03",
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
          border(1, colors.border),
          borderRadius(6),
          fullWidth,
          disableOutline,
          backgroundColor("transparent"),
          color("gray-blue/09"),
          child(color(colors.placeholder), "::placeholder"),
          styles.base,
          variant === InputVariant.DEFAULT
            ? [hover([borderColor("gray-blue/04")]), focus([border(2, "blue/05"), styles.focused])]
            : [styles.focused, borderWidth(2)],
        ])}
        {leftIconElement}
        {rightIconElement}
      </Wrapper>
      <Tip tip={tip} color={colors.tip} />
    </Wrapper>
  );
}

export default InputWrapper;
