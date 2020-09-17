import React from "react";
import { duration160 } from "layout/durations";

import Typography from "primitives/Typography";
import Icon from "primitives/Icon";

import stopPropagation from "libs/stopPropagation";
import {
  ai,
  Aligns,
  backgroundColor,
  borderNone,
  borderRadius,
  child,
  disableOutline,
  fillColor,
  flex,
  hover,
  maxWidth,
  padding,
  paddingRight,
  pointer,
  transition,
} from "libs/styles";

import Wrapper from "../Wrapper";

interface TokenInterface {
  title: string | number;
  styles?: any;
  canRemove?: boolean;
  remove?: () => void;
}

function Token({ title, styles, remove, canRemove }: TokenInterface) {
  return (
    <Wrapper
      styles={[
        maxWidth("100%"),
        flex,
        ai(Aligns.CENTER),
        padding("0 2px 0 8px"),
        backgroundColor("gray-blue/02"),
        disableOutline,
        borderNone,
        borderRadius(4),
        child(transition(`fill ${duration160}`), ".icon use"),
        canRemove ? [pointer, hover(fillColor("gray-blue/05"), ".icon use")] : [paddingRight(8)],
        styles,
      ]}
      as="button"
      onClick={canRemove && stopPropagation(remove)}
    >
      <Typography dots>{title}</Typography>
      {canRemove && <Icon className="icon" icon="cross-small" color="gray-blue/07" />}
    </Wrapper>
  );
}

export default React.memo(Token);
