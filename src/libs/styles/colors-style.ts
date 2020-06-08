import { memoizeWith } from "ramda";

import { colors } from "./colors";

export type Colors = keyof typeof colors;

export const getColor = function (color: Colors | GradientColor): string {
  // @ts-ignore
  return colors[color] || color;
};

export const createLinearGradientColor = memoizeWith(
  (fromColor: any, toColor: any, angle: any) => `${fromColor}_${toColor}_${angle}`,
  function (fromColor: Colors, toColor: Colors, angle: string) {
    return `linear-gradient(${angle}, ${getColor(fromColor)} 0%, ${getColor(toColor)} 100%);`;
  },
);

export type GradientColor = string;
