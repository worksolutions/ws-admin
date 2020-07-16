import { makeSpinnerColorStyle } from "primitives/Spinner";

import { backgroundColor, borderWidth, boxShadow, child, fillColor } from "libs/styles";

export const iconStyle = [
  backgroundColor("transparent"),
  borderWidth(0),
  child(fillColor("gray-blue/07"), ".icon use"),
  child(makeSpinnerColorStyle("gray-blue/07"), ".loader"),
];
export const iconHover = [backgroundColor("gray-blue/01")];
export const iconHoverForSmall = [child(fillColor("gray-blue/05"), ".icon use")];
export const iconFocus = [boxShadow([0, 0, 0, 2, "blue/04"])];
export const iconActive = [backgroundColor("gray-blue/02")];
