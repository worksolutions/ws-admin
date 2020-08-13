import React from "react";
import { duration160 } from "layout/durations";

import Typography from "primitives/Typography";
import Icon from "primitives/Icon";
import Wrapper from "primitives/Wrapper";

import {
  ai,
  Aligns,
  backgroundColor,
  border,
  borderColor,
  borderNone,
  borderRadius,
  boxShadow,
  disableOutline,
  flex,
  hover,
  jc,
  padding,
  pointer,
  transform,
  transition,
  width,
} from "libs/styles";

interface SwitchModeButtonInterface {
  opened: boolean;
  value: string | number;
  onClick: () => void;
  width?: number;
  styles?: any;
}

export function SwitchModeButton({ value, onClick, width: widthProp, opened, styles }: SwitchModeButtonInterface) {
  return (
    <Wrapper
      as="button"
      styles={[
        widthProp && width(widthProp),
        padding("4px 8px 4px 12px"),
        disableOutline,
        borderNone,
        borderRadius(6),
        flex,
        ai(Aligns.CENTER),
        jc(Aligns.SPACE_BETWEEN),
        pointer,
        backgroundColor("gray-blue/01"),
        transition(`box-shadow ${duration160}, border-color ${duration160}`),
        border(1, "gray-blue/02"),
        hover(borderColor("gray-blue/03")),
        opened && boxShadow([0, 0, 0, 2, "blue/04"]),
        styles,
      ]}
      onClick={onClick}
    >
      <Typography>{value}</Typography>
      <Icon
        icon="arrow-down"
        styles={[transition(`all ${duration160}`), transform(`rotateZ(${opened ? "180deg" : "0deg"})`)]}
        color="gray-blue/07"
      />
    </Wrapper>
  );
}
