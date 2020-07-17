import { makeSpinnerColorStyle } from "primitives/Spinner";

import { backgroundColor, borderWidth, boxShadow, child, color, fillColor, marginLeft, marginRight } from "libs/styles";

export const primaryStyle = [
  borderWidth(0),
  color("white"),
  backgroundColor("blue/05"),
  child(marginRight(8), ".icon-left"),
  child(marginLeft(8), ".icon-right"),
  child(fillColor("white"), ".icon use"),
  child(makeSpinnerColorStyle("white"), ".loader"),
];
export const primaryHover = [backgroundColor("blue/06")];
export const primaryFocus = [boxShadow([0, 0, 0, 2, "blue/04"])];
export const primaryActive = [backgroundColor("blue/07")];
export const primaryDisabled = [backgroundColor("blue/02")];
