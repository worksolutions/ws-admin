import { css } from "styled-components";
import { memoizeWith } from "ramda";

import { identity } from "./identity";
import { stringOrPixels } from "./index";

export const flex = css`
  display: flex;
`;

export const inlineFlex = css`
  display: inline-flex;
`;

export const flexWrap = css`
  flex-wrap: wrap;
`;

export const flexValue = memoizeWith(identity, function (value: string | number) {
  return css`
    flex: ${value};`;
});

export const flexGrow = memoizeWith(identity, function (grow: number) {
  return css`
    flex-grow: ${grow};`;
});

export const flexBasis = memoizeWith(identity, function (basis: number | string) {
  return css`
    flex-basis: ${stringOrPixels(basis)};`;
});

export const flexShrink = memoizeWith(identity, function (shrink: number) {
  return css`
    flex-shrink: ${shrink};`;
});

export const flexColumn = css`
  flex-direction: column;
`;

export enum Aligns {
  START = "flex-start",
  END = "flex-end",
  CENTER = "center",
  SPACE_AROUND = "space-around",
  SPACE_BETWEEN = "space-between",
  STRETCH = "stretch",
  BASELINE = "baseline",
}

export const jc = memoizeWith(identity, function (value: Aligns) {
  return css`
    justify-content: ${value};`;
});

export const alignSelf = memoizeWith(identity, function (value: Aligns) {
  return css`
    align-self: ${value};`;
});

export const ai = memoizeWith(identity, function (value: Aligns) {
  return css`
    align-items: ${value};`;
});
