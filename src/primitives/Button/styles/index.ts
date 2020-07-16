import { ButtonSize, ButtonType } from "../types";

import largePrimary from "./styleForSizeAndType/largePrimary";
import largeIcon from "./styleForSizeAndType/largeIcon";
import largeSecondary from "./styleForSizeAndType/largeSecondary";
import mediumPrimary from "./styleForSizeAndType/mediumPrimary";
import mediumIcon from "./styleForSizeAndType/mediumIcon";
import mediumSecondary from "./styleForSizeAndType/mediumSecondary";
import smallPrimary from "./styleForSizeAndType/smallPrimary";
import smallIcon from "./styleForSizeAndType/smallIcon";
import smallSecondary from "./styleForSizeAndType/smallSecondary";
import { StyleForSizeAndType } from "./types";

export const buttonStylesMap: Record<ButtonSize, Record<ButtonType, StyleForSizeAndType>> = {
  [ButtonSize.LARGE]: {
    [ButtonType.PRIMARY]: largePrimary,
    [ButtonType.ICON]: largeIcon,
    [ButtonType.SECONDARY]: largeSecondary,
  },
  [ButtonSize.MEDIUM]: {
    [ButtonType.PRIMARY]: mediumPrimary,
    [ButtonType.ICON]: mediumIcon,
    [ButtonType.SECONDARY]: mediumSecondary,
  },
  [ButtonSize.SMALL]: {
    [ButtonType.PRIMARY]: smallPrimary,
    [ButtonType.ICON]: smallIcon,
    [ButtonType.SECONDARY]: smallSecondary,
  },
};
