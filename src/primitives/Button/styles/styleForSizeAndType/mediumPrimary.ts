import { horizontalPadding, paddingLeft, paddingRight } from "libs/styles";

import { StyleForSizeAndType } from "../types";
import { primaryActive, primaryFocus, primaryHover, primaryStyle } from "../types/primary";
import { defaultMediumStyles } from "../common";

export default {
  withoutIcons: {
    default: [primaryStyle, defaultMediumStyles],
    hover: primaryHover,
    focused: primaryFocus,
    active: primaryActive,
  },
  withIconLeft: {
    default: [primaryStyle, defaultMediumStyles, paddingLeft(12)],
    hover: primaryHover,
    focused: primaryFocus,
    active: primaryActive,
  },
  withIconRight: {
    default: [primaryStyle, defaultMediumStyles, paddingRight(12)],
    hover: primaryHover,
    focused: primaryFocus,
    active: primaryActive,
  },
  withTwoIcons: {
    default: [primaryStyle, defaultMediumStyles, horizontalPadding(12)],
    hover: primaryHover,
    focused: primaryFocus,
    active: primaryActive,
  },
} as StyleForSizeAndType;
