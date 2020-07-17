import { horizontalPadding, paddingLeft, paddingRight } from "libs/styles";

import { StyleForSizeAndType } from "../types";
import { defaultLargeStyles } from "../common";
import { ghostStyle, ghostHover, ghostFocus, ghostActive, ghostDisabled } from "../types/ghost";

export default {
  withoutIcons: {
    default: [ghostStyle, defaultLargeStyles],
    hover: ghostHover,
    focused: ghostFocus,
    active: ghostActive,
    disabled: ghostDisabled,
  },
  withIconLeft: {
    default: [ghostStyle, defaultLargeStyles, paddingLeft(16)],
    hover: ghostHover,
    focused: ghostFocus,
    active: ghostActive,
    disabled: ghostDisabled,
  },
  withIconRight: {
    default: [ghostStyle, defaultLargeStyles, paddingRight(16)],
    hover: ghostHover,
    focused: ghostFocus,
    active: ghostActive,
    disabled: ghostDisabled,
  },
  withTwoIcons: {
    default: [ghostStyle, defaultLargeStyles, horizontalPadding(16)],
    hover: ghostHover,
    focused: ghostFocus,
    active: ghostActive,
    disabled: ghostDisabled,
  },
} as StyleForSizeAndType;
