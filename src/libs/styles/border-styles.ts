import { css } from "styled-components";
import { memoizeWith } from "ramda";

import { identity } from "./identity";
import { AlphaColor, Colors, getColor, stringOrPixels } from "./index";

export function border(size: number, color: Colors | AlphaColor, mode = "solid") {
  return css`
    border: ${size}px ${mode} ${getColor(color)};
  `;
}

export function borderWidth(size: number) {
  return css`
    border-width: ${size}px;
  `;
}

export function borderColor(color: Colors | AlphaColor) {
  return css`
    border-color: ${getColor(color)};
  `;
}

export const borderNone = css`
  border: 0;
`;

export function borderBottom(size: number, color: Colors | AlphaColor) {
  return css`
    border-bottom: ${size}px solid ${getColor(color)};
  `;
}

export function borderLeft(size: number, color: Colors | AlphaColor) {
  return css`
    border-left: ${size}px solid ${getColor(color)};
  `;
}

export function borderTop(size: number, color: Colors | AlphaColor) {
  return css`
    border-top: ${size}px solid ${getColor(color)};
  `;
}

export function borderRight(size: number, color: Colors | AlphaColor) {
  return css`
    border-right: ${size}px solid ${getColor(color)};
  `;
}

export const borderRadius = memoizeWith(identity, function (borderRadius: number | string) {
  return css`
    border-radius: ${stringOrPixels(borderRadius)};`;
});
