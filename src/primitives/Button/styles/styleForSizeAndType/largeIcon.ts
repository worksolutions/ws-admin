import { StyleForSizeAndType } from "../types";
import { iconLargeStyles } from "../common";
import { iconActive, iconDisabled, iconFocus, iconHover, iconStyle } from "../types/icon";

export default {
  withoutIcons: {
    default: [iconStyle, iconLargeStyles],
    hover: iconHover,
    focused: iconFocus,
    active: iconActive,
    disabled: iconDisabled,
  },
  withIconLeft: {
    default: [iconStyle, iconLargeStyles],
    hover: iconHover,
    focused: iconFocus,
    active: iconActive,
    disabled: iconDisabled,
  },
  withIconRight: {
    default: [iconStyle, iconLargeStyles],
    hover: iconHover,
    focused: iconFocus,
    active: iconActive,
    disabled: iconDisabled,
  },
  withTwoIcons: {
    default: [iconStyle, iconLargeStyles],
    hover: iconHover,
    focused: iconFocus,
    active: iconActive,
    disabled: iconDisabled,
  },
} as StyleForSizeAndType;
