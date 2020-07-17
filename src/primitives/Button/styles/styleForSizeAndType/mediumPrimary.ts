import { horizontalPadding, paddingLeft, paddingRight } from "libs/styles";

import { StyleForSizeAndType } from "../types";
import { primaryActive, primaryDisabled, primaryFocus, primaryHover, primaryStyle } from "../types/primary";
import { defaultMediumStyles } from "../common";

export default {
  withoutIcons: {
    default: [primaryStyle, defaultMediumStyles],
    hover: primaryHover,
    focused: primaryFocus,
    active: primaryActive,
    disabled: primaryDisabled,
  },
  withIconLeft: {
    default: [primaryStyle, defaultMediumStyles, paddingLeft(12)],
    hover: primaryHover,
    focused: primaryFocus,
    active: primaryActive,
    disabled: primaryDisabled,
  },
  withIconRight: {
    default: [primaryStyle, defaultMediumStyles, paddingRight(12)],
    hover: primaryHover,
    focused: primaryFocus,
    active: primaryActive,
    disabled: primaryDisabled,
  },
  withTwoIcons: {
    default: [primaryStyle, defaultMediumStyles, horizontalPadding(12)],
    hover: primaryHover,
    focused: primaryFocus,
    active: primaryActive,
    disabled: primaryDisabled,
  },
} as StyleForSizeAndType;
