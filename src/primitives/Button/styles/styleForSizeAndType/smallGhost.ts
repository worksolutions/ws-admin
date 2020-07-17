import { horizontalPadding, paddingLeft, paddingRight } from "libs/styles";

import { StyleForSizeAndType } from "../types";
import { defaultSmallStyles } from "../common";
import { ghostStyle, ghostHover, ghostFocus, ghostActive, ghostDisabled } from "../types/ghost";

export default {
  withoutIcons: {
    default: [ghostStyle, defaultSmallStyles],
    hover: ghostHover,
    focused: ghostFocus,
    active: ghostActive,
    disabled: ghostDisabled,
  },
  withIconLeft: {
    default: [ghostStyle, defaultSmallStyles, paddingLeft(8)],
    hover: ghostHover,
    focused: ghostFocus,
    active: ghostActive,
    disabled: ghostDisabled,
  },
  withIconRight: {
    default: [ghostStyle, defaultSmallStyles, paddingRight(8)],
    hover: ghostHover,
    focused: ghostFocus,
    active: ghostActive,
    disabled: ghostDisabled,
  },
  withTwoIcons: {
    default: [ghostStyle, defaultSmallStyles, horizontalPadding(8)],
    hover: ghostHover,
    focused: ghostFocus,
    active: ghostActive,
    disabled: ghostDisabled,
  },
} as StyleForSizeAndType;
