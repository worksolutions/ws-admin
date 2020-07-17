import { display } from "libs/styles";

import { StyleForSizeAndType } from "../types";
import { defaultSmallStyles } from "../common";
import { secondaryActive, secondaryDisabled, secondaryFocus, secondaryHover, secondaryStyle } from "../types/secondary";

export default {
  withoutIcons: {
    default: [secondaryStyle, defaultSmallStyles],
    hover: secondaryHover,
    focused: secondaryFocus,
    active: secondaryActive,
    disabled: secondaryDisabled,
  },
  withIconLeft: {
    default: [display("none")],
    hover: [],
    focused: [],
    active: [],
  },
  withIconRight: {
    default: [display("none")],
    hover: [],
    focused: [],
    active: [],
  },
  withTwoIcons: {
    default: [display("none")],
    hover: [],
    focused: [],
    active: [],
  },
} as StyleForSizeAndType;
