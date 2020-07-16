import { StyleForSizeAndType } from "../types";
import { iconMediumStyles } from "../common";
import { iconActive, iconFocus, iconHover, iconStyle } from "../types/icon";

export default {
  withoutIcons: {
    default: [iconStyle, iconMediumStyles],
    hover: iconHover,
    focused: iconFocus,
    active: iconActive,
  },
  withIconLeft: {
    default: [iconStyle, iconMediumStyles],
    hover: iconHover,
    focused: iconFocus,
    active: iconActive,
  },
  withIconRight: {
    default: [iconStyle, iconMediumStyles],
    hover: iconHover,
    focused: iconFocus,
    active: iconActive,
  },
  withTwoIcons: {
    default: [iconStyle, iconMediumStyles],
    hover: iconHover,
    focused: iconFocus,
    active: iconActive,
  },
} as StyleForSizeAndType;
