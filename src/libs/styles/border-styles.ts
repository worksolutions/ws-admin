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

export function borderLeftColor(color: Colors | AlphaColor) {
  return css`
    border-left-color: ${getColor(color)};
  `;
}

export const borderRadius = memoizeWith(identity, function (borderRadius: number | string) {
  return css`
    border-radius: ${stringOrPixels(borderRadius)};`;
});

export const borderLeftRadius = memoizeWith(identity, function (borderRadius: number | string) {
  return css`
    border-bottom-left-radius: ${stringOrPixels(borderRadius)};
    border-top-left-radius: ${stringOrPixels(borderRadius)};`;
});

export const borderRightRadius = memoizeWith(identity, function (borderRadius: number | string) {
  return css`
    border-bottom-right-radius: ${stringOrPixels(borderRadius)};
    border-top-right-radius: ${stringOrPixels(borderRadius)};`;
});
