import { display } from "libs/styles";

import { StyleForSizeAndType } from "../types";
import { primaryActive, primaryDisabled, primaryFocus, primaryHover, primaryStyle } from "../types/primary";
import { defaultSmallStyles } from "../common";

export default {
  withoutIcons: {
    default: [primaryStyle, defaultSmallStyles],
    hover: primaryHover,
    focused: primaryFocus,
    active: primaryActive,
    disabled: primaryDisabled,
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
