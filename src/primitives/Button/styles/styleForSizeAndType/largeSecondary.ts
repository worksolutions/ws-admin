import { horizontalPadding, paddingLeft, paddingRight } from "libs/styles";

import { StyleForSizeAndType } from "../types";
import { defaultLargeStyles } from "../common";
import { secondaryActive, secondaryFocus, secondaryHover, secondaryStyle } from "../types/secondary";

export default {
  withoutIcons: {
    default: [secondaryStyle, defaultLargeStyles],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
  },
  withIconLeft: {
    default: [secondaryStyle, defaultLargeStyles, paddingLeft(16)],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
  },
  withIconRight: {
    default: [secondaryStyle, defaultLargeStyles, paddingRight(16)],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
  },
  withTwoIcons: {
    default: [secondaryStyle, defaultLargeStyles, horizontalPadding(16)],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
  },
} as StyleForSizeAndType;
