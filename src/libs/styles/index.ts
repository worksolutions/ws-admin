import { is, memoizeWith } from "ramda";
import { css } from "styled-components";
import { CSSProperties } from "react";

import { identity } from "./identity";
import { AlphaColor, Colors, getColor, GradientColor } from "./colors-style";

export const stringOrPixels = (value: number | string) => (is(String, value) ? value : `${value}px`);

export * from "./colors-style";
export * from "./background-styles";
export * from "./border-styles";
export * from "./sizes-styles";
export * from "./flex-styles";

export const disableOutline = css`
  outline: none;
`;

export type BoxShadow = [
  number | string,
  number | string,
  number | string,
  number | string,
  Colors | GradientColor | AlphaColor,
  boolean?,
];

function makeShadow([offsetX, offsetY, blurRadius, spread, color, inset]: BoxShadow) {
  return `${inset ? "inset " : ""}${stringOrPixels(offsetX)} ${stringOrPixels(offsetY)} ${stringOrPixels(
    blurRadius,
  )} ${stringOrPixels(spread)} ${getColor(color)}`;
}

export const boxShadow = memoizeWith(
  (...shadows) => JSON.stringify(shadows),
  function (...shadows: BoxShadow[]) {
    return css`
      box-shadow: ${shadows.map(makeShadow).join(", ")};
    `;
  },
) as (...config: BoxShadow[]) => any;

export const emptyBoxShadow = css`
  box-shadow: none;
`;

export const transform = memoizeWith(identity, function (transform: string) {
  return css`
    transform: ${transform};`;
});

export const zIndex = memoizeWith(identity, function (value: number) {
  return css`
    z-index: ${value};`;
});

export const transition = memoizeWith(identity, function (value: string) {
  return css`
    transition: ${value};`;
});

export const verticalScroll = css`
  overflow-y: auto;
`;

export const horizontalScroll = css`
  overflow-x: auto;
`;

export const overflow = memoizeWith(identity, function (value: string) {
  return css`
    overflow: ${value};`;
});

export const overflowX = memoizeWith(identity, function (value: string) {
  return css`
    overflow-x: ${value};`;
});

export const overflowY = memoizeWith(identity, function (value: string) {
  return css`
    overflow-y: ${value};`;
});

export const textOverflow = memoizeWith(identity, function (value: string) {
  return css`
    text-overflow: ${value};`;
});

export const whiteSpace = memoizeWith(identity, function (value: string) {
  return css`
    white-space: ${value};`;
});

export const display = memoizeWith(identity, function (value: string) {
  return css`
    display: ${value};`;
});

export const opacity = memoizeWith(identity, function (value: string | number) {
  return css`
    opacity: ${value};`;
});

export const pointer = css`
  cursor: pointer;
`;

export const pointerEvents = memoizeWith(identity, function (value: CSSProperties["pointerEvents"]) {
  return css`
    pointer-events: ${value};`;
});

export const cursor = memoizeWith(identity, function (value: CSSProperties["cursor"]) {
  return css`
    cursor: ${value};`;
});

export const lineHeight = memoizeWith(identity, function (value: number) {
  return css`
    line-height: ${stringOrPixels(value)};`;
});

export const fontSize = memoizeWith(identity, function (value: string | number) {
  return css`
    font-size: ${stringOrPixels(value)};`;
});

export const letterSpacing = memoizeWith(identity, function (value: number | string) {
  return css`
    letter-spacing: ${stringOrPixels(value)};`;
});

export const fontWeight = memoizeWith(identity, function (value: string | number) {
  return css`
    font-weight: ${value};`;
});

export const capitalizeFirstLetter = css`
  display: block;
  &::first-letter {
    text-transform: capitalize;
  }
`;

export const textTransform = memoizeWith(identity, function (value: "uppercase" | "lowercase" | "none") {
  return css`
    text-transform: ${value};`;
});

export const color = memoizeWith(identity, function (value: Colors) {
  const color = getColor(value);
  return css`
    color: ${color};
    fill: ${color};`;
});

export const hover = function (styles: any, childSelector = "") {
  return css`
    :hover ${childSelector} {
      ${styles}
    }
  `;
};

export const focus = function (styles: any, childSelector = "") {
  return css`
    :focus ${childSelector} {
      ${styles}
    }
  `;
};
export const active = function (styles: any, childSelector = "") {
  return css`
    :active ${childSelector} {
      ${styles}
    }
  `;
};

export const mediaScreen = function (mediaQueries: string, values: string[]) {
  return css`
    @media screen and ${mediaQueries} {
      ${values}
    }
  `;
};

export const float = memoizeWith(identity, function (value: "left" | "right") {
  return css`
    float: ${value};`;
});

export const textAlign = memoizeWith(identity, function (value: "left" | "right" | "center") {
  return css`
    text-align: ${value};`;
});

export const nthChild = (selector: string | number, styles: any, preSelector = "& > *") => css`
  ${preSelector}:nth-child(${selector}) {
    ${styles};
  }
`;

export const nthLastChild = (selector: string | number, styles: any, preSelector = "& > *") => css`
  ${preSelector}:nth-last-child(${selector}) {
    ${styles};
  }
`;

export const child = (styles: any, preSelector = "& > *") => css`
  ${preSelector} {
    ${styles};
  }
`;

export const firstChild = (styles: any, preSelector = "& > *") => css`
  ${preSelector}:first-child {
    ${styles};
  }
`;

export const lastChild = (styles: any, preSelector = "& > *") => css`
  ${preSelector}:last-child {
    ${styles};
  }
`;

export const stylesForSelector = (selector: string | number, styles: any) => css`
  ${selector} {
    ${styles};
  }
`;

export const textDots = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block;
`;

export const disableDecoration = css`
  text-decoration: none;
`;

export const visibility = (value: "hidden" | "visible") => css`
  visibility: ${value};
`;

export const content = (value: string) => css`
  content: "${value}";
`;

export const verticalAlign = (value: string) => css`
  vertical-align: ${value};
`;
