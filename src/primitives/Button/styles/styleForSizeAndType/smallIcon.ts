import { StyleForSizeAndType } from "../types";
import { iconMediumStyles, iconSmallStyles } from "../common";
import { iconActive, iconDisabled, iconFocus, iconHoverForSmall, iconStyle } from "../types/icon";

export default {
  withoutIcons: {
    default: [iconStyle, iconSmallStyles],
    hover: iconHoverForSmall,
    focused: iconFocus,
    active: iconActive,
    disabled: iconDisabled,
  },
  withIconLeft: {
    default: [iconStyle, iconSmallStyles],
    hover: iconHoverForSmall,
    focused: iconFocus,
    active: iconActive,
    disabled: iconDisabled,
  },
  withIconRight: {
    default: [iconStyle, iconSmallStyles],
    hover: iconHoverForSmall,
    focused: iconFocus,
    active: iconActive,
    disabled: iconDisabled,
  },
  withTwoIcons: {
    default: [iconStyle, iconMediumStyles],
    hover: iconHoverForSmall,
    focused: iconFocus,
    active: iconActive,
    disabled: iconDisabled,
  },
} as StyleForSizeAndType;
