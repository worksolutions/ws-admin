import React from "react";
import { duration200 } from "layout/durations";

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

export interface ListItemInterface {
  id: ListItemId;
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

interface ListInterface {
  itemSize?: ListItemSize;
  styles?: any;
  outerStyles?: any;
  titleStyles?: any;
  titleDots?: boolean;
  dividerColor?: Colors;
  activeItemId?: ListItemId;
  items: ListItemInterface[];
  onClick?: (id: ListItemId) => void;
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
}: ListInterface) {
  return (
    <Wrapper styles={[flex, flexColumn, outerStyles, firstChild(marginTop(4))]}>
      {items.map(({ title, id, heading, leftContent, rightContent, subtitle, disabled }) => {
        const enabled = !disabled;
        return (
          <Wrapper
            key={id}
            as="button"
            styles={[
              backgroundColor("transparent"),
              disableOutline,
              borderNone,
              marginBottom(4),
              minHeight(heightForItemSize[itemSize]),
              flex,
              ai(Aligns.CENTER),
              borderRadius(4),
              horizontalPadding(4),
              transition(`all ${duration200}`),
              enabled && [pointer, hover(backgroundColor("gray-blue/01")), focus(boxShadow([0, 0, 0, 2, "blue/04"]))],
              activeItemId === id && [backgroundColor("gray-blue/01")],
              styles,
            ]}
            onClick={() => onClick && enabled && onClick(id)}
          >
            {leftContent}
            <Wrapper styles={[marginLeft(8), marginRight(8), flexValue(1), textAlign("left")]}>
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

export default React.memo(List);
