import {
  ai,
  Aligns,
  backgroundColor,
  border,
  borderColor,
  child,
  color,
  createLinearGradientColor,
  fillColor,
  inlineFlex,
  margin,
  marginLeft,
  marginRight,
  padding,
  pointer,
} from "libs/styles";

import { ButtonSize, ButtonType } from "./types";

export const stylesForType = {
  [ButtonType.PRIMARY]: {
    default: [
      inlineFlex,
      ai(Aligns.CENTER),
      pointer,
      backgroundColor("blue/05"),
      border(1, "blue/07"),
      color("white"),
      child(fillColor("white"), ".icon use"),
    ],
    hover: [backgroundColor("blue/04")],
    focused: [backgroundColor(createLinearGradientColor("blue/04", "blue/05", "180deg")), border(2, "blue/09")],
  },
  [ButtonType.ICON]: {
    default: [
      inlineFlex,
      pointer,
      backgroundColor("white"),
      border(1, "white"),
      child(fillColor("gray-blue/07"), ".icon use"),
    ],
    hover: [backgroundColor("gray-blue/01"), borderColor("gray-blue/01")],
    focused: [backgroundColor("white"), border(2, "blue/09")],
  },
};

type DefaultStylesElementType = {
  default: any;
  focused: any;
};

export const stylesForSize: Record<
  ButtonSize,
  {
    defaultStyles: {
      withIconLeft: DefaultStylesElementType;
      withIconRight: DefaultStylesElementType;
      withIcons: DefaultStylesElementType;
      withoutIcons: DefaultStylesElementType;
    };
    overrideTypeStyles: Partial<Record<ButtonType, Partial<DefaultStylesElementType>>>;
  }
> = {
  [ButtonSize.LARGE]: {
    defaultStyles: {
      withIconLeft: {
        default: [padding("7px 19px 7px 15px"), child(marginRight(8), ".icon-left")],
        focused: [padding("6px 18px 6px 14px")],
      },
      withIconRight: {
        default: [padding("7px 15px 7px 19px"), child(marginLeft(8), ".icon-right")],
        focused: [padding("6px 14px 6px 18px")],
      },
      withIcons: {
        default: [padding("7px 15px"), child(marginRight(8), ".icon-left"), child(marginLeft(8), ".icon-right")],
        focused: [padding("6px 14px")],
      },
      withoutIcons: {
        default: [padding("7px 19px")],
        focused: [padding("6px 18px")],
      },
    },
    overrideTypeStyles: {
      [ButtonType.ICON]: {
        default: [padding("7px"), child(margin(0), ".icon")],
        focused: [padding("6px")],
      },
    },
  },
  [ButtonSize.MEDIUM]: {
    defaultStyles: {
      withIconLeft: {
        default: [padding("3px 15px 3px 11px"), child(marginRight(8), ".icon-left")],
        focused: [padding("2px 14px 2px 10px")],
      },
      withIconRight: {
        default: [padding("3px 11px 3px 15px"), child(marginLeft(8), ".icon-right")],
        focused: [padding("2px 10px 2px 14px")],
      },
      withIcons: {
        default: [padding("3px 11px"), child(marginRight(8), ".icon-left"), child(marginLeft(8), ".icon-right")],
        focused: [padding("2px 10px")],
      },
      withoutIcons: {
        default: [padding("3px 15px")],
        focused: [padding("2px 14px")],
      },
    },
    overrideTypeStyles: {
      [ButtonType.ICON]: {
        default: [padding("3px"), child(margin(0), ".icon")],
        focused: [padding("2px")],
      },
    },
  },
};
