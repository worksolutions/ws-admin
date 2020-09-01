import React from "react";
import { duration160 } from "layout/durations";
import { useMeasure } from "react-use";
import { memoizeWith } from "ramda";

import Typography, { TypographyTypes } from "primitives/Typography";
import Wrapper from "primitives/Wrapper";
import Icon, { Icons } from "primitives/Icon";

import {
  ai,
  Aligns,
  backgroundColor,
  borderRadius,
  borderWidth,
  boxShadow,
  child,
  color,
  Colors,
  disableOutline,
  flex,
  focus,
  fullHeight,
  fullWidth,
  hover,
  left,
  marginBottom,
  marginRight,
  marginTop,
  maxHeight,
  opacity,
  overflow,
  padding,
  position,
  right,
  top,
  transform,
  transition,
} from "libs/styles";
import { isString } from "libs/is";

export enum InputSize {
  MEDIUM = "medium",
  LARGE = "large",
}

export enum InputTitlePosition {
  TOP,
  LEFT,
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
    placeholder: "red/03",
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

export type InputIconProp = Icons | JSX.Element | undefined;

export interface BaseInputWrapperInterface {
  outerStyles?: any;
  iconLeft?: InputIconProp;
  iconRight?: InputIconProp;
  iconLeftStyles?: any;
  iconRightStyles?: any;
  disabled?: boolean;
  title?: string;
  titlePosition?: InputTitlePosition;
  tip?: string;
  size?: InputSize;
  error?: boolean;
  success?: boolean;
  children?: React.ReactNode;
  outerRef?: any;
  onClick?: () => void;
}

function getInputVariant(error?: boolean, success?: boolean, disabled?: boolean) {
  if (disabled) return InputVariant.DISABLED;
  if (error) return InputVariant.ERROR;
  if (success) return InputVariant.SUCCESS;
  return InputVariant.DEFAULT;
}

function Title({ title, styles }: { title?: string | number; styles?: any }) {
  if (!title) return null;
  return (
    <Typography styles={styles} color="gray-blue/05" noWrap>
      {title}
    </Typography>
  );
}

function Tip({ tip, color }: { tip: string | undefined; color: Colors }) {
  const hasTip = !!tip;

  return (
    <Wrapper
      styles={[
        overflow("hidden"),
        tip ? maxHeight("auto") : maxHeight(0),
        transition(`opacity ${duration160}`),
        hasTip ? opacity(1) : opacity(0),
      ]}
    >
      <Typography styles={marginTop(4)} type="caption-regular" color={color}>
        {tip || "\u00A0"}
      </Typography>
    </Wrapper>
  );
}

const defaultIconStyles = [position("absolute"), top("50%"), transform("translateY(-50%)")];

const cssAnimateProperties = [
  "color",
  "border",
  "box-shadow",
  "opacity",
  "visibility",
  "background-color",
  "transform",
];

const transitionStyle = transition(cssAnimateProperties.map((val) => `${val} ${duration160}`).join(","));

export const wrapperStylesByTitlePosition: Record<InputTitlePosition, { wrapper?: any; title?: any }> = {
  [InputTitlePosition.LEFT]: { wrapper: [flex, ai(Aligns.CENTER)], title: marginRight(8) },
  [InputTitlePosition.TOP]: { title: marginBottom(8) },
};

function makeIconElement(icon: InputIconProp, defaultColor: Colors, styles: any) {
  return icon ? (
    <Wrapper styles={[defaultIconStyles, styles]}>
      {isString(icon) ? <Icon color={defaultColor} icon={icon} /> : icon}
    </Wrapper>
  ) : undefined;
}

export const createDefaultInputStyles = memoizeWith(
  (placeholderColor) => placeholderColor || "",
  (placeholderColor: Colors = "gray-blue/04") => [
    TypographyTypes["body-regular"],
    transitionStyle,
    borderWidth(0),
    borderRadius(6),
    fullWidth,
    fullHeight,
    disableOutline,
    backgroundColor("transparent"),
    color("gray-blue/09"),
    child([color(placeholderColor), transition(`color ${duration160}`)], "::placeholder, .placeholder"),
  ],
);

function InputWrapper({
  outerStyles,
  children,
  title,
  titlePosition = InputTitlePosition.TOP,
  size = InputSize.LARGE,
  tip,
  iconLeft,
  iconRight,
  iconLeftStyles,
  iconRightStyles,
  error,
  success,
  disabled,
  renderComponent,
  outerRef,
  onClick,
}: BaseInputWrapperInterface & {
  renderComponent: (styles: any) => JSX.Element;
}) {
  const leftIconElement = makeIconElement(iconLeft, "gray-blue/05", [left(8), iconLeftStyles]);
  const rightIconElement = makeIconElement(iconRight, "gray-blue/07", [right(8), iconRightStyles]);

  const styles = stylesForSize[size][getStylesNameOnIcons(!!iconLeft, !!iconRight)];

  const variant = getInputVariant(error, success, disabled);

  const colors = colorsByVariant[variant];

  const positioningStyles = wrapperStylesByTitlePosition[titlePosition];

  return (
    <Wrapper styles={outerStyles} onClick={onClick}>
      <Wrapper styles={positioningStyles.wrapper}>
        <Title styles={positioningStyles.title} title={title} />
        <Wrapper
          ref={outerRef}
          styles={[fullWidth, backgroundColor(colors.background), borderRadius(6), position("relative")]}
        >
          {renderComponent([
            createDefaultInputStyles(colors.placeholder),
            boxShadow([0, 0, 0, 1, colors.shadowColor]),
            styles,
            variant === InputVariant.DEFAULT
              ? [hover(boxShadow([0, 0, 0, 1, "gray-blue/03"]))]
              : [boxShadow([0, 0, 0, 2, colors.shadowColor])],
            focus([boxShadow([0, 0, 0, 2, "blue/05"])]),
          ])}
          {leftIconElement}
          {rightIconElement}
          {children}
        </Wrapper>
      </Wrapper>

      <Tip tip={tip} color={colors.tip} />
    </Wrapper>
  );
}

export default InputWrapper;
