import React from "react";
import { duration200 } from "layout/durations";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Icon from "primitives/Icon";

import {
  ai,
  Aligns,
  backgroundColor,
  borderNone,
  borderRadius,
  boxShadow,
  disableOutline,
  focus,
  hover,
  inlineFlex,
  marginLeft,
  marginRight,
  maxWidth,
  minWidth,
  padding,
  pointer,
  transition,
  width,
} from "libs/styles";

interface FilterItemInterface {
  selected: boolean;
  applied: boolean;
  name: string;
  styles?: any;
  onClick: () => void;
}

function FilterItem({ styles, applied, selected, name, onClick }: FilterItemInterface) {
  return (
    <Wrapper
      as="button"
      styles={[
        inlineFlex,
        ai(Aligns.CENTER),
        transition(`box-shadow ${duration200}, background-color ${duration200}`),
        disableOutline,
        borderNone,
        marginRight(8),
        padding("4px 12px"),
        backgroundColor("gray-blue/02"),
        borderRadius(4),
        focus([boxShadow([0, 0, 0, 2, "blue/04"])]),
        selected && !applied && [backgroundColor("gray-blue/04")],
        applied && [backgroundColor("blue/05")],
        !selected && !applied && [pointer, hover(backgroundColor("gray-blue/03"))],
        styles,
      ]}
      onClick={onClick}
    >
      <Typography
        type="body-semi-bold"
        color={selected || applied ? "white" : "gray-blue/07"}
        styles={[transition(`color ${duration200}`)]}
      >
        {name}
      </Typography>
      <Icon
        styles={[
          transition(`margin-left ${duration200}, width ${duration200}, min-width ${duration200}`),
          applied ? [marginLeft(8)] : [width(0), minWidth(0)],
        ]}
        color="white"
        icon="check"
      />
    </Wrapper>
  );
}

export default React.memo(FilterItem);
