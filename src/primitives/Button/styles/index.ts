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
import largeGhost from "./styleForSizeAndType/largeGhost";
import mediumGhost from "./styleForSizeAndType/mediumGhost";
import smallGhost from "./styleForSizeAndType/smallGhost";
import { StyleForSizeAndType } from "./types";

export const buttonStylesMap: Record<ButtonType, Record<ButtonSize, StyleForSizeAndType>> = {
  [ButtonType.PRIMARY]: {
    [ButtonSize.LARGE]: largePrimary,
    [ButtonSize.MEDIUM]: mediumPrimary,
    [ButtonSize.SMALL]: smallPrimary,
  },
  [ButtonType.SECONDARY]: {
    [ButtonSize.LARGE]: largeSecondary,
    [ButtonSize.MEDIUM]: mediumSecondary,
    [ButtonSize.SMALL]: smallSecondary,
  },
  [ButtonType.ICON]: {
    [ButtonSize.LARGE]: largeIcon,
    [ButtonSize.MEDIUM]: mediumIcon,
    [ButtonSize.SMALL]: smallIcon,
  },
  [ButtonType.GHOST]: {
    [ButtonSize.LARGE]: largeGhost,
    [ButtonSize.MEDIUM]: mediumGhost,
    [ButtonSize.SMALL]: smallGhost,
  },
};
