import { horizontalPadding, paddingLeft, paddingRight } from "libs/styles";

import { StyleForSizeAndType } from "../types";
import { primaryActive, primaryDisabled, primaryFocus, primaryHover, primaryStyle } from "../types/primary";
import { defaultLargeStyles } from "../common";

export default {
  withoutIcons: {
    default: [primaryStyle, defaultLargeStyles],
    hover: primaryHover,
    focused: primaryFocus,
    active: primaryActive,
    disabled: primaryDisabled,
  },
  withIconLeft: {
    default: [primaryStyle, defaultLargeStyles, paddingLeft(16)],
    hover: primaryHover,
    focused: primaryFocus,
    active: primaryActive,
    disabled: primaryDisabled,
  },
  withIconRight: {
    default: [primaryStyle, defaultLargeStyles, paddingRight(16)],
    hover: primaryHover,
    focused: primaryFocus,
    active: primaryActive,
    disabled: primaryDisabled,
  },
  withTwoIcons: {
    default: [primaryStyle, defaultLargeStyles, horizontalPadding(16)],
    hover: primaryHover,
    focused: primaryFocus,
    active: primaryActive,
    disabled: primaryDisabled,
  },
} as StyleForSizeAndType;
