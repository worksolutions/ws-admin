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
  hover,
  margin,
  marginLeft,
  marginRight,
  marginTop,
  minHeight,
  pointer,
  textAlign,
  transition,
} from "libs/styles";

interface ListInterface {
  styles?: any;
  outerStyles?: any;
  titleStyles?: any;
  dividerColor?: Colors;
  items: {
    leftContent?: JSX.Element | null;
    heading?: string | number;
    subtitle?: string | number;
    title: string | number;
    rightContent?: JSX.Element | null;
  }[];
  onClick?: (index: number) => void;
}

function List({ outerStyles, styles, titleStyles, items, onClick }: ListInterface) {
  return (
    <Wrapper styles={[flex, flexColumn, outerStyles, firstChild(marginTop(4))]}>
      {items.map(({ title, heading, leftContent, rightContent, subtitle }, key) => (
        <Wrapper
          key={key}
          as="button"
          styles={[
            pointer,
            backgroundColor("transparent"),
            disableOutline,
            borderNone,
            margin("0 4px 4px 4px"),
            minHeight(40),
            flex,
            ai(Aligns.CENTER),
            borderRadius(4),
            transition(`all ${duration200}`),
            hover(backgroundColor("gray-blue/01")),
            focus(boxShadow([0, 0, 0, 2, "blue/04"])),
            styles,
          ]}
          onClick={() => onClick && onClick(key)}
        >
          {leftContent}
          <Wrapper styles={[marginLeft(12), marginRight(12), flexValue(1), textAlign("left")]}>
            {heading && <Typography type="caption-regular">{heading}</Typography>}
            <Typography styles={titleStyles}>{title}</Typography>
            {subtitle && <Typography type="caption-regular">{subtitle}</Typography>}
          </Wrapper>
          {rightContent}
        </Wrapper>
      ))}
    </Wrapper>
  );
}

List.defaultProps = {
  dividerColor: "gray-blue/02",
};

export default React.memo(List);
