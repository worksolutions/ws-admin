import { StyleForSizeAndType } from "../types";
import { iconMediumStyles, iconSmallStyles } from "../common";
import { iconActive, iconFocus, iconHoverForSmall, iconStyle } from "../types/icon";

export default {
  withoutIcons: {
    default: [iconStyle, iconSmallStyles],
    hover: iconHoverForSmall,
    focused: iconFocus,
    active: iconActive,
  },
  withIconLeft: {
    default: [iconStyle, iconSmallStyles],
    hover: iconHoverForSmall,
    focused: iconFocus,
    active: iconActive,
  },
  withIconRight: {
    default: [iconStyle, iconSmallStyles],
    hover: iconHoverForSmall,
    focused: iconFocus,
    active: iconActive,
  },
  withTwoIcons: {
    default: [iconStyle, iconMediumStyles],
    hover: iconHoverForSmall,
    focused: iconFocus,
    active: iconActive,
  },
} as StyleForSizeAndType;
