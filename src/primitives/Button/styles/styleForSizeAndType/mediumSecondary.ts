import { horizontalPadding, paddingLeft, paddingRight } from "libs/styles";

import { StyleForSizeAndType } from "../types";
import { defaultMediumStyles } from "../common";
import { secondaryActive, secondaryDisabled, secondaryFocus, secondaryHover, secondaryStyle } from "../types/secondary";

export default {
  withoutIcons: {
    default: [secondaryStyle, defaultMediumStyles],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
    disabled: secondaryDisabled,
  },
  withIconLeft: {
    default: [secondaryStyle, defaultMediumStyles, paddingLeft(12)],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
    disabled: secondaryDisabled,
  },
  withIconRight: {
    default: [secondaryStyle, defaultMediumStyles, paddingRight(12)],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
    disabled: secondaryDisabled,
  },
  withTwoIcons: {
    default: [secondaryStyle, defaultMediumStyles, horizontalPadding(12)],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
    disabled: secondaryDisabled,
  },
} as StyleForSizeAndType;
