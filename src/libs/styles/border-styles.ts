import { css } from "styled-components";
import { memoizeWith } from "ramda";

import { identity } from "./identity";
import { AllAvailableColorsType, getColor, stringOrPixels } from "./index";

export function border(size: number, color: AllAvailableColorsType, mode = "solid") {
  return css`
    border: ${size}px ${mode} ${getColor(color)};
  `;
}

export function borderWidth(size: number) {
  return css`
    border-width: ${size}px;
  `;
}

export function borderColor(color: AllAvailableColorsType) {
  return css`
    border-color: ${getColor(color)};
  `;
}

export function borderBottom(size: number, color: AllAvailableColorsType) {
  return css`
    border-bottom: ${size}px solid ${getColor(color)};
  `;
}

export function borderLeft(size: number, color: AllAvailableColorsType) {
  return css`
    border-left: ${size}px solid ${getColor(color)};
  `;
}

export function borderTop(size: number, color: AllAvailableColorsType) {
  return css`
    border-top: ${size}px solid ${getColor(color)};
  `;
}

export function borderRight(size: number, color: AllAvailableColorsType) {
  return css`
    border-right: ${size}px solid ${getColor(color)};
  `;
}

export function borderLeftColor(color: AllAvailableColorsType) {
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

export const borderBottomRadius = memoizeWith(identity, function (borderRadius: number | string) {
  return css`
    border-bottom-right-radius: ${stringOrPixels(borderRadius)};
    border-bottom-left-radius: ${stringOrPixels(borderRadius)};`;
});

export const borderTopRadius = memoizeWith(identity, function (borderRadius: number | string) {
  return css`
    border-top-right-radius: ${stringOrPixels(borderRadius)};
    border-top-left-radius: ${stringOrPixels(borderRadius)};`;
});
