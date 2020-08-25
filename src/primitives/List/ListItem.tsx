import React from "react";
import { duration160 } from "layout/durations";

import {
  ai,
  Aligns,
  backgroundColor,
  borderNone,
  borderRadius,
  boxShadow,
  createAlphaColor,
  disableOutline,
  flex,
  flexValue,
  focus,
  horizontalPadding,
  hover,
  marginBottom,
  marginRight,
  marginTop,
  minHeight,
  pointer,
  textAlign,
  transition,
} from "libs/styles";

import Wrapper from "../Wrapper";
import Typography from "../Typography";

import SuggestInterface from "types/SuggestInterface";

export interface ListItemInterface<ITEM extends string | number> extends SuggestInterface<ITEM> {
  leftContent?: JSX.Element | null;
  heading?: string | number;
  subtitle?: string | number;
  disabled?: boolean;
  rightContent?: JSX.Element | null;
}

export enum ListItemSize {
  LARGE = "LARGE",
  MEDIUM = "MEDIUM",
}

const heightForItemSize: Record<ListItemSize, number> = { [ListItemSize.LARGE]: 40, [ListItemSize.MEDIUM]: 32 };

export function getItemStyles(itemSize: ListItemSize, enabled: boolean, isActiveItem: boolean) {
  return [
    backgroundColor("transparent"),
    disableOutline,
    borderNone,
    minHeight(heightForItemSize[itemSize]),
    flex,
    marginTop(2),
    marginBottom(2),
    ai(Aligns.CENTER),
    borderRadius(4),
    horizontalPadding(8),
    transition(`all ${duration160}`),
    enabled && [
      pointer,
      hover([backgroundColor("gray-blue/01"), boxShadow([0, 0, 1, 0, createAlphaColor("black", 81)])]),
      focus(boxShadow([0, 0, 0, 2, "blue/04"])),
    ],
    isActiveItem && [backgroundColor("gray-blue/01"), boxShadow([0, 0, 1, 0, createAlphaColor("black", 81)])],
  ];
}

type ListItemComponent<CODE extends string | number> = {
  item: ListItemInterface<CODE>;
  itemSize: ListItemSize;
  isActiveItem: boolean;
  onClick?: (id: CODE) => void;
  titleStyles?: any;
  titleDots?: boolean;
  styles?: any;
};

function ListItem<CODE extends string | number>({
  item: { title, leftContent, code, disabled, heading, rightContent, subtitle },
  itemSize,
  isActiveItem,
  onClick,
  titleDots,
  titleStyles,
  styles,
}: ListItemComponent<CODE>) {
  const enabled = !disabled;
  return (
    <Wrapper
      styles={[getItemStyles(itemSize, enabled, isActiveItem), styles]}
      onClick={() => onClick && enabled && onClick(code)}
    >
      {leftContent}
      <Wrapper styles={[marginRight(8), flexValue(1), textAlign("left")]}>
        {heading && <Typography type="caption-regular">{heading}</Typography>}
        <Typography dots={titleDots} noWrap styles={titleStyles}>
          {title}
        </Typography>
        {subtitle && <Typography type="caption-regular">{subtitle}</Typography>}
      </Wrapper>
      {rightContent}
    </Wrapper>
  );
}

export default React.memo(ListItem);
