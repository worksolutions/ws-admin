import { makeSpinnerColorStyle } from "primitives/Spinner";

import {
  backgroundColor,
  border,
  borderWidth,
  boxShadow,
  child,
  color,
  createAlphaColor,
  fillColor,
  marginLeft,
  marginRight,
} from "libs/styles";

export const ghostStyle = [
  borderWidth(0),
  color("gray-blue/07"),
  backgroundColor("transparent"),
  child(marginRight(8), ".icon-left"),
  child(marginLeft(8), ".icon-right"),
  child(fillColor("gray-blue/07"), ".icon use"),
  child(makeSpinnerColorStyle("gray-blue/07"), ".loader"),
];
export const ghostHover = [backgroundColor("gray-blue/01"), boxShadow([0, 0, 1, 0, createAlphaColor("black", 81)])];
export const ghostFocus = [boxShadow([0, 0, 0, 2, "blue/04"])];
export const ghostActive = [backgroundColor("gray-blue/02")];
export const ghostDisabled = [
  color("gray-blue/03"),
  child(fillColor("gray-blue/03"), ".icon use"),
  child(makeSpinnerColorStyle("gray-blue/03"), ".loader"),
];
