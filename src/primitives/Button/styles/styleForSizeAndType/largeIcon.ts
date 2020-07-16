import { StyleForSizeAndType } from "../types";
import { iconLargeStyles } from "../common";
import { iconActive, iconFocus, iconHover, iconStyle } from "../types/icon";

export default {
  withoutIcons: {
    default: [iconStyle, iconLargeStyles],
    hover: iconHover,
    focused: iconFocus,
    active: iconActive,
  },
  withIconLeft: {
    default: [iconStyle, iconLargeStyles],
    hover: iconHover,
    focused: iconFocus,
    active: iconActive,
  },
  withIconRight: {
    default: [iconStyle, iconLargeStyles],
    hover: iconHover,
    focused: iconFocus,
    active: iconActive,
  },
  withTwoIcons: {
    default: [iconStyle, iconLargeStyles],
    hover: iconHover,
    focused: iconFocus,
    active: iconActive,
  },
} as StyleForSizeAndType;
