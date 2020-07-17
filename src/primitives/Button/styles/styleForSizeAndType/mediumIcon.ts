import { StyleForSizeAndType } from "../types";
import { iconMediumStyles } from "../common";
import { iconActive, iconDisabled, iconFocus, iconHover, iconStyle } from "../types/icon";

export default {
  withoutIcons: {
    default: [iconStyle, iconMediumStyles],
    hover: iconHover,
    focused: iconFocus,
    active: iconActive,
    disabled: iconDisabled,
  },
  withIconLeft: {
    default: [iconStyle, iconMediumStyles],
    hover: iconHover,
    focused: iconFocus,
    active: iconActive,
    disabled: iconDisabled,
  },
  withIconRight: {
    default: [iconStyle, iconMediumStyles],
    hover: iconHover,
    focused: iconFocus,
    active: iconActive,
    disabled: iconDisabled,
  },
  withTwoIcons: {
    default: [iconStyle, iconMediumStyles],
    hover: iconHover,
    focused: iconFocus,
    active: iconActive,
    disabled: iconDisabled,
  },
} as StyleForSizeAndType;
