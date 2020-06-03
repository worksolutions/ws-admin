import { curry } from "ramda";

import { colors } from "./colors";

export type Colors = keyof typeof colors;

export const getColor = curry(function (color: Colors) {
  return colors[color] || color;
});
