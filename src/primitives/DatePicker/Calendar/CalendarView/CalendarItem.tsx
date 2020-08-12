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
  child,
  color,
  disableOutline,
  flex,
  focus,
  fullHeight,
  fullWidth,
  hover,
  jc,
  padding,
  pointer,
  transition,
} from "libs/styles";

type ItemVariants = { isToday?: boolean; selected?: boolean; holiday?: boolean };

function getItemData(data: ItemVariants) {
  if (data.selected) {
    return { styles: [child([color("white"), backgroundColor("blue/05")])], canClick: false };
  }

  if (data.isToday) {
    return {
      styles: [pointer, child(boxShadow([0, 0, 0, 1, "gray-blue/03"])), hover(child(backgroundColor("gray-blue/01")))],
      canClick: true,
    };
  }

  if (data.holiday) {
    return {
      styles: [pointer, hover(child(backgroundColor("gray-blue/01"))), child(color("red/05"))],
      canClick: true,
    };
  }

  return {
    styles: [pointer, hover(child(backgroundColor("gray-blue/01")))],
    canClick: true,
  };
}

function CalendarItem({
  value,
  selected,
  isToday,
  holiday,
  onClick,
}: {
  value?: string | number;
  onClick?: () => void;
} & ItemVariants) {
  const { styles, canClick } = getItemData({ selected, isToday, holiday });
  return (
    <Wrapper
      as="button"
      className="day"
      styles={[
        backgroundColor("transparent"),
        disableOutline,
        borderNone,
        padding("8px 6px"),
        canClick && focus(child(boxShadow([0, 0, 0, 2, "blue/04"]))),
        value && styles,
      ]}
      onClick={() => canClick && onClick && onClick()}
    >
      <Typography
        color={null}
        styles={[
          transition(`background-color ${duration200}, box-shadow ${duration200}, color ${duration200}`),
          flex,
          fullWidth,
          fullHeight,
          ai(Aligns.CENTER),
          jc(Aligns.CENTER),
          borderRadius(6),
        ]}
      >
        {value}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(CalendarItem);
