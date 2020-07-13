import {
  backgroundColor,
  borderWidth,
  boxShadow,
  child,
  color,
  display,
  fillColor,
  horizontalPadding,
  marginLeft,
  marginRight,
  padding,
  paddingLeft,
  paddingRight,
} from "libs/styles";

import { ButtonSize, ButtonType } from "./types";

type DefaultStylesElementType = {
  default: any;
  hover: any;
  focused: any;
  active: any;
};

const primaryStyle = [
  borderWidth(0),
  color("white"),
  backgroundColor("blue/05"),
  child(marginRight(8), ".icon-left"),
  child(marginLeft(8), ".icon-right"),
  child(fillColor("white"), ".icon use"),
];
const primaryHover = [backgroundColor("blue/06")];
const primaryFocus = [boxShadow([0, 0, 0, 2, "blue/04"])];
const primaryActive = [backgroundColor("blue/07")];

const iconStyle = [backgroundColor("transparent"), borderWidth(0), child(fillColor("gray-blue/07"), ".icon use")];
const iconHover = [backgroundColor("gray-blue/01")];
const iconHoverForSmall = [child(fillColor("gray-blue/05"), ".icon use")];
const iconFocus = [boxShadow([0, 0, 0, 2, "blue/04"])];
const iconActive = [backgroundColor("gray-blue/02")];

const defaultLargeStyles = [padding("8px 20px")];
const defaultMediumStyles = [padding("4px 16px")];
const defaultSmallStyles = [padding("0 8px")];

const iconLargeStyles = [padding(8)];
const iconMediumStyles = [padding(4)];
const iconSmallStyles = [padding(0)];

export const buttonStylesMap: Record<
  ButtonSize,
  Record<
    ButtonType,
    {
      withIconLeft: DefaultStylesElementType;
      withIconRight: DefaultStylesElementType;
      withoutIcons: DefaultStylesElementType;
      withTwoIcons: DefaultStylesElementType;
    }
  >
> = {
  [ButtonSize.LARGE]: {
    [ButtonType.PRIMARY]: {
      withoutIcons: {
        default: [primaryStyle, defaultLargeStyles],
        hover: primaryHover,
        focused: primaryFocus,
        active: primaryActive,
      },
      withIconLeft: {
        default: [primaryStyle, defaultLargeStyles, paddingLeft(16)],
        hover: primaryHover,
        focused: primaryFocus,
        active: primaryActive,
      },
      withIconRight: {
        default: [primaryStyle, defaultLargeStyles, paddingRight(16)],
        hover: primaryHover,
        focused: primaryFocus,
        active: primaryActive,
      },
      withTwoIcons: {
        default: [primaryStyle, defaultLargeStyles, horizontalPadding(16)],
        hover: primaryHover,
        focused: primaryFocus,
        active: primaryActive,
      },
    },
    [ButtonType.ICON]: {
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
    },
  },
  [ButtonSize.MEDIUM]: {
    [ButtonType.PRIMARY]: {
      withoutIcons: {
        default: [primaryStyle, defaultMediumStyles],
        hover: primaryHover,
        focused: primaryFocus,
        active: primaryActive,
      },
      withIconLeft: {
        default: [primaryStyle, defaultMediumStyles, paddingLeft(12)],
        hover: primaryHover,
        focused: primaryFocus,
        active: primaryActive,
      },
      withIconRight: {
        default: [primaryStyle, defaultMediumStyles, paddingRight(12)],
        hover: primaryHover,
        focused: primaryFocus,
        active: primaryActive,
      },
      withTwoIcons: {
        default: [primaryStyle, defaultMediumStyles, horizontalPadding(12)],
        hover: primaryHover,
        focused: primaryFocus,
        active: primaryActive,
      },
    },
    [ButtonType.ICON]: {
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
    },
  },
  [ButtonSize.SMALL]: {
    [ButtonType.PRIMARY]: {
      withoutIcons: {
        default: [primaryStyle, defaultSmallStyles],
        hover: primaryHover,
        focused: primaryFocus,
        active: primaryActive,
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
    },
    [ButtonType.ICON]: {
      withoutIcons: {
        default: [iconStyle, iconSmallStyles],
        hover: iconHoverForSmall,
        focused: iconFocus,
        active: iconActive,
      },
      withIconLeft: {
        default: [iconStyle, iconSmallStyles],
        hover: iconHoverForSmall,
        focused: iconFocus,
        active: iconActive,
      },
      withIconRight: {
        default: [iconStyle, iconSmallStyles],
        hover: iconHoverForSmall,
        focused: iconFocus,
        active: iconActive,
      },
      withTwoIcons: {
        default: [iconStyle, iconMediumStyles],
        hover: iconHoverForSmall,
        focused: iconFocus,
        active: iconActive,
      },
    },
  },
};
