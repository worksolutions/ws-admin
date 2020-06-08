import { css } from "styled-components";

import { Colors, getColor, GradientColor } from "./colors-style";

export function background(background: string) {
  return css`
    background: ${background};
  `;
}

export function backgroundColor(backgroundColor: Colors | GradientColor) {
  return css`
    background-color: ${getColor(backgroundColor)};
  `;
}

export function backgroundImage(value: string) {
  return css`
    background-image: url("${value}");
  `;
}

export function backgroundRepeat(value: string) {
  return css`
    background-repeat: ${value};
  `;
}

export function backgroundSize(value: string) {
  return css`
    background-size: ${value};
  `;
}

export function backgroundPosition(value: string) {
  return css`
    background-position: ${value};
  `;
}

export function fillColor(color: Colors) {
  return css`
    fill: ${getColor(color)};
  `;
}
