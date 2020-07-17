import { horizontalPadding, paddingLeft, paddingRight } from "libs/styles";

import { StyleForSizeAndType } from "../types";
import { defaultMediumStyles } from "../common";
import { ghostStyle, ghostHover, ghostFocus, ghostActive, ghostDisabled } from "../types/ghost";

export default {
  withoutIcons: {
    default: [ghostStyle, defaultMediumStyles],
    hover: ghostHover,
    focused: ghostFocus,
    active: ghostActive,
    disabled: ghostDisabled,
  },
  withIconLeft: {
    default: [ghostStyle, defaultMediumStyles, paddingLeft(12)],
    hover: ghostHover,
    focused: ghostFocus,
    active: ghostActive,
    disabled: ghostDisabled,
  },
  withIconRight: {
    default: [ghostStyle, defaultMediumStyles, paddingRight(12)],
    hover: ghostHover,
    focused: ghostFocus,
    active: ghostActive,
    disabled: ghostDisabled,
  },
  withTwoIcons: {
    default: [ghostStyle, defaultMediumStyles, horizontalPadding(12)],
    hover: ghostHover,
    focused: ghostFocus,
    active: ghostActive,
    disabled: ghostDisabled,
  },
} as StyleForSizeAndType;
