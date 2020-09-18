import { memoizeWith } from "ramda";

import { colors } from "./colors";
import { stringOrPixels } from "./index";

export type Colors = keyof typeof colors;

export type AllAvailableColorsType = Colors | AlphaColor;

export const getColor = function (color: AllAvailableColorsType): string {
  // @ts-ignore
  return colors[color] || color;
};

export const createLinearGradientColor = memoizeWith(
  (fromColor: any, toColor: any, angle: any) => `${fromColor}_${toColor}_${angle}`,
  function (fromColor: Colors, toColor: Colors, angle: string) {
    return `linear-gradient(${angle}, ${getColor(fromColor)} 0%, ${getColor(toColor)} 100%)`;
  },
);

export const createRadialGradientColor = memoizeWith(
  // @ts-ignore
  ({ color: fromColor, filling: fromFilling }, { color: toColor, filling: toFilling }, { x, y } = {}) =>
    `${fromColor}_${fromFilling}_${toColor}_${toFilling}_${x}_${y}`,
  function (
    { color: fromColor, filling: fromFilling }: { color: Colors; filling?: string },
    { color: toColor, filling: toFilling }: { color: Colors; filling?: string },
    { x, y }: { x: string | number; y: string | number } = { x: "center", y: "center" },
  ) {
    const pos = `at ${stringOrPixels(x)} ${stringOrPixels(y)}`;
    const from = `${getColor(fromColor)} ${fromFilling || ""}`;
    const to = `${getColor(toColor)} ${toFilling || ""}`;
    return `radial-gradient(${pos}, ${from}, ${to})`;
  },
);

export const createAlphaColor = memoizeWith(
  (color: any, alpha: any) => `${color}_${alpha}`,
  function (color: Colors, alpha: number) {
    return `${getColor(color)}${alpha.toString(16).padStart(2, "0")}`;
  },
);

export type AlphaColor = string;
