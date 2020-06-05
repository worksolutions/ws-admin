import React, { ReactNode, Ref } from "react";
import styled from "styled-components";

import { color, Colors, textDots, fontSize, fontWeight, letterSpacing, lineHeight, display } from "libs/styles";

import { StyledComponentsAS } from "types/StyledComponentsAS";

const TypographyWrapper = styled.span``;

export const TypographyTypes = {
  h1: [fontSize(28), lineHeight(32), fontWeight("bold")],
  h2: [fontSize(20), lineHeight(24), fontWeight("bold"), letterSpacing(0.15)],
  h3: [fontSize(16), lineHeight(20), fontWeight("bold"), letterSpacing(0.5)],
  "subtitle1-regular": [fontSize(16), lineHeight(28), letterSpacing(0.15)],
  "subtitle2-medium": [fontWeight(500), fontSize(14), lineHeight(24), letterSpacing(0.1)],
  "body-regular": [fontSize(14), lineHeight(20), letterSpacing(0.25)],
  "body-semi-bold": [] as any[],
  "caption-regular": [fontSize(12), lineHeight(16), letterSpacing("0.004em")],
  "caption-semi-bold": [] as any[],
  "overline-regular": [fontSize(10), lineHeight(12), letterSpacing(0.25)],
  "overline-semi-bold": [] as any[],
  button: [fontWeight(500), fontSize(14), lineHeight(24), letterSpacing(0.25)],
};

TypographyTypes["body-semi-bold"] = [...TypographyTypes["body-regular"], fontWeight(600)];
TypographyTypes["caption-semi-bold"] = [...TypographyTypes["caption-regular"], fontWeight(600)];
TypographyTypes["overline-semi-bold"] = [...TypographyTypes["overline-regular"], fontWeight("bold")];

export interface TypographyInterface {
  className?: string;
  as?: StyledComponentsAS;
  type?: keyof typeof TypographyTypes;
  color?: Colors;
  styles?: any;
  dots?: boolean;
  children: ReactNode;
}

const Typography = React.forwardRef(
  (
    { as, className, styles, children, type, color: colorProp, dots: dotsProp }: TypographyInterface,
    ref: Ref<HTMLSpanElement>,
  ) => (
    <TypographyWrapper
      className={className}
      ref={ref}
      as={as}
      css={[
        display("inline-block"),
        type ? TypographyTypes[type] : null,
        color(colorProp || "gray-blue/09"),
        dotsProp && textDots,
        styles,
      ]}
    >
      {children}
    </TypographyWrapper>
  ),
);

Typography.defaultProps = {
  type: "body-regular",
};

export default React.memo(Typography);
