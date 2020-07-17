import { horizontalPadding, paddingLeft, paddingRight } from "libs/styles";

import { StyleForSizeAndType } from "../types";
import { defaultLargeStyles } from "../common";
import { secondaryActive, secondaryDisabled, secondaryFocus, secondaryHover, secondaryStyle } from "../types/secondary";

export default {
  withoutIcons: {
    default: [secondaryStyle, defaultLargeStyles],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
    disabled: secondaryDisabled,
  },
  withIconLeft: {
    default: [secondaryStyle, defaultLargeStyles, paddingLeft(16)],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
    disabled: secondaryDisabled,
  },
  withIconRight: {
    default: [secondaryStyle, defaultLargeStyles, paddingRight(16)],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
    disabled: secondaryDisabled,
  },
  withTwoIcons: {
    default: [secondaryStyle, defaultLargeStyles, horizontalPadding(16)],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
    disabled: secondaryDisabled,
  },
} as StyleForSizeAndType;
