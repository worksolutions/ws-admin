import React from "react";

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
  padding,
  pointer,
  transition,
} from "libs/styles";

import Wrapper from "../Wrapper";
import { duration160 } from "../../layout/durations";

interface TokenInterface {
  title: string | number;
  styles?: any;
  remove: () => void;
}

function Token({ title, styles, remove }: TokenInterface) {
  return (
    <Wrapper
      styles={[
        flex,
        ai(Aligns.CENTER),
        padding("0 2px 0 8px"),
        backgroundColor("gray-blue/02"),
        pointer,
        disableOutline,
        borderNone,
        borderRadius(4),
        child(transition(`fill ${duration160}`), ".icon use"),
        hover(fillColor("gray-blue/05"), ".icon use"),
        styles,
      ]}
      as="button"
      onClick={stopPropagation(remove)}
    >
      <Typography>{title}</Typography>
      <Icon className="icon" icon="cross-small" color="gray-blue/07" />
    </Wrapper>
  );
}

export default React.memo(Token);
