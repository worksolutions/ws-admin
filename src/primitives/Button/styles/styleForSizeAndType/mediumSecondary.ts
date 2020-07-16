import { horizontalPadding, paddingLeft, paddingRight } from "libs/styles";

import { StyleForSizeAndType } from "../types";
import { defaultMediumStyles } from "../common";
import { secondaryActive, secondaryFocus, secondaryHover, secondaryStyle } from "../types/secondary";

export default {
  withoutIcons: {
    default: [secondaryStyle, defaultMediumStyles],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
  },
  withIconLeft: {
    default: [secondaryStyle, defaultMediumStyles, paddingLeft(12)],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
  },
  withIconRight: {
    default: [secondaryStyle, defaultMediumStyles, paddingRight(12)],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
  },
  withTwoIcons: {
    default: [secondaryStyle, defaultMediumStyles, horizontalPadding(12)],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
  },
} as StyleForSizeAndType;
