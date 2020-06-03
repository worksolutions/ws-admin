import React, { ReactNode, Ref } from "react";
import styled from "styled-components";

import { color, Colors, fontSize, fontWeight, letterSpacing, lineHeight } from "libs/styles";

import { StyledComponentsAS } from "types/StyledComponentsAS";

const TypographyWrapper = styled.span``;

export const TypographyTypes = {
  "subtitle1-regular": [fontSize(16), lineHeight(28), letterSpacing(0.15)],
  "subtitle2-medium": [fontWeight(500), fontSize(14), lineHeight(24), letterSpacing(0.1)],
  "body1-regular": [fontSize(16), lineHeight(24), letterSpacing(0.5)],
  "body1-semi-bold": [fontWeight(600), fontSize(16), lineHeight(24), letterSpacing(0.5)],
  "body2-regular": [fontSize(14), lineHeight(20), letterSpacing(0.25)],
  "body2-semi-bold": [fontWeight(600), fontSize(14), lineHeight(24), letterSpacing(0.25)],
  "caption-regular": [fontSize(12), lineHeight(16), letterSpacing("0.004em")],
  "caption-semi-bold": [fontWeight(600), fontSize(12), lineHeight(16), letterSpacing("0.004em")],
};

export interface TypographyInterface {
  className?: string;
  as?: StyledComponentsAS;
  type?: keyof typeof TypographyTypes;
  color?: Colors;
  styles?: any;
  children: ReactNode;
}

const Typography = React.forwardRef(
  ({ as, className, styles, children, type, color: colorProp }: TypographyInterface, ref: Ref<HTMLSpanElement>) => (
    <TypographyWrapper
      className={className}
      ref={ref}
      as={as}
      css={[type ? TypographyTypes[type] : null, color(colorProp || "gray-blue/09"), styles]}
    >
      {children}
    </TypographyWrapper>
  ),
);

Typography.defaultProps = {
  type: "body2-regular",
};

export default React.memo(Typography);
