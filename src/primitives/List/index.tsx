import React, { Ref } from "react";
import { duration160 } from "layout/durations";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import {
  ai,
  Aligns,
  backgroundColor,
  borderNone,
  borderRadius,
  boxShadow,
  Colors,
  createAlphaColor,
  disableOutline,
  firstChild,
  flex,
  flexColumn,
  flexValue,
  focus,
  horizontalPadding,
  hover,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  minHeight,
  pointer,
  textAlign,
  transition,
} from "libs/styles";

export type ListItemId = string | number;

export interface ListItemInterface<ITEM> {
  code: ITEM;
  leftContent?: JSX.Element | null;
  heading?: string | number;
  subtitle?: string | number;
  title: string | number;
  disabled?: boolean;
  rightContent?: JSX.Element | null;
}

export enum ListItemSize {
  LARGE = "LARGE",
  MEDIUM = "MEDIUM",
}

interface ListInterface<ITEM> {
  itemSize?: ListItemSize;
  styles?: any;
  outerStyles?: any;
  titleStyles?: any;
  titleDots?: boolean;
  dividerColor?: Colors;
  activeItemId?: ITEM;
  items: ListItemInterface<ITEM>[];
  onClick?: (id: ITEM) => void;
}

const heightForItemSize: Record<ListItemSize, number> = { [ListItemSize.LARGE]: 40, [ListItemSize.MEDIUM]: 32 };

function List({
  outerStyles,
  styles,
  itemSize = ListItemSize.LARGE,
  activeItemId,
  titleDots,
  titleStyles,
  items,
  onClick,
}: ListInterface<any>) {
  return (
    <Wrapper styles={[flex, flexColumn, outerStyles, firstChild(marginTop(4))]}>
      {items.map(({ title, code, heading, leftContent, rightContent, subtitle, disabled }) => {
        const enabled = !disabled;
        return (
          <Wrapper
            key={code}
            styles={[
              backgroundColor("transparent"),
              disableOutline,
              borderNone,
              marginBottom(4),
              minHeight(heightForItemSize[itemSize]),
              flex,
              ai(Aligns.CENTER),
              borderRadius(4),
              horizontalPadding(8),
              transition(`all ${duration160}`),
              enabled && [
                pointer,
                hover([backgroundColor("gray-blue/01"), boxShadow([0, 0, 1, 0, createAlphaColor("black", 81)])]),
                focus(boxShadow([0, 0, 0, 2, "blue/04"])),
              ],
              activeItemId === code && [
                backgroundColor("gray-blue/01"),
                boxShadow([0, 0, 1, 0, createAlphaColor("black", 81)]),
              ],
              styles,
            ]}
            onClick={() => onClick && enabled && onClick(code)}
          >
            {leftContent}
            <Wrapper styles={[marginRight(8), flexValue(1), textAlign("left")]}>
              {heading && <Typography type="caption-regular">{heading}</Typography>}
              <Typography dots={titleDots} styles={titleStyles}>
                {title}
              </Typography>
              {subtitle && <Typography type="caption-regular">{subtitle}</Typography>}
            </Wrapper>
            {rightContent}
          </Wrapper>
        );
      })}
    </Wrapper>
  );
}

List.defaultProps = {
  dividerColor: "gray-blue/02",
};

export default React.memo(List) as <ITEM>(props: ListInterface<ITEM>) => JSX.Element;
