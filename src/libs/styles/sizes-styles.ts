import { memoizeWith } from "ramda";
import { css } from "styled-components";

import { identity } from "./identity";
import { stringOrPixels } from "./index";

export const width = memoizeWith(identity, function (width: string | number) {
  return css`
    width: ${stringOrPixels(width)};`;
});

export const minWidth = memoizeWith(identity, function (minWidth: string | number) {
  return css`
    min-width: ${stringOrPixels(minWidth)};`;
});

export const maxWidth = memoizeWith(identity, function (maxWidth: string | number) {
  return css`
    max-width: ${stringOrPixels(maxWidth)};`;
});

export const height = memoizeWith(identity, function (height: string | number) {
  return css`
    height: ${stringOrPixels(height)};`;
});

export const minHeight = memoizeWith(identity, function (minHeight: string | number) {
  return css`
    min-height: ${stringOrPixels(minHeight)};`;
});

export const maxHeight = memoizeWith(identity, function (maxHeight: string | number) {
  return css`
    max-height: ${stringOrPixels(maxHeight)};`;
});

export const fullWidth = css`
  width: 100%;
`;

export const fullHeight = css`
  height: 100%;
`;

export const margin = memoizeWith(identity, function (margin: string | number) {
  return css`
    margin: ${stringOrPixels(margin)};`;
});

export const marginLeft = memoizeWith(identity, function (marginLeft: string | number) {
  return css`
    margin-left: ${stringOrPixels(marginLeft)};`;
});

export const marginRight = memoizeWith(identity, function (marginRight: string | number) {
  return css`
    margin-right: ${stringOrPixels(marginRight)};`;
});

export const marginTop = memoizeWith(identity, function (marginTop: string | number) {
  return css`
    margin-top: ${stringOrPixels(marginTop)};`;
});

export const marginBottom = memoizeWith(identity, function (marginBottom: string | number) {
  return css`
    margin-bottom: ${stringOrPixels(marginBottom)};`;
});

export const padding = memoizeWith(identity, function (padding: string | number) {
  return css`
    padding: ${stringOrPixels(padding)};`;
});

export const verticalPadding = memoizeWith(identity, function (padding: string | number) {
  return css`
    padding-top: ${stringOrPixels(padding)};
    padding-bottom: ${stringOrPixels(padding)};`;
});

export const horizontalPadding = memoizeWith(identity, function (padding: string | number) {
  return css`
    padding-left: ${stringOrPixels(padding)};
    padding-right: ${stringOrPixels(padding)};`;
});

export const paddingLeft = memoizeWith(identity, function (paddingLeft: number) {
  return css`
    padding-left: ${paddingLeft}px;`;
});

export const paddingRight = memoizeWith(identity, function (paddingRight: number) {
  return css`
    padding-right: ${paddingRight}px;`;
});

export const paddingTop = memoizeWith(identity, function (paddingTop: number) {
  return css`
    padding-top: ${paddingTop}px;`;
});

export const paddingBottom = memoizeWith(identity, function (paddingBottom: number) {
  return css`
    padding-bottom: ${paddingBottom}px;`;
});

type Position = "fixed" | "static" | "relative" | "absolute" | "sticky";

export const position = memoizeWith(identity, function (position: Position) {
  return css`
    position: ${position};`;
});

export const left = memoizeWith(identity, function (left: string | number) {
  return css`
    left: ${stringOrPixels(left)};`;
});

export const right = memoizeWith(identity, function (right: string | number) {
  return css`
    right: ${stringOrPixels(right)};`;
});

export const top = memoizeWith(identity, function (top: string | number) {
  return css`
    top: ${stringOrPixels(top)};`;
});

export const bottom = memoizeWith(identity, function (bottom: string | number) {
  return css`
    bottom: ${stringOrPixels(bottom)};`;
});

export const absoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
