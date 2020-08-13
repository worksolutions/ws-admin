import React from "react";
import { duration160 } from "layout/durations";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import { withPerformance } from "libs/CB/changeDetectionStrategy/withPerformance";
import {
  active,
  ai,
  Aligns,
  backgroundColor,
  borderNone,
  child,
  color,
  disableOutline,
  flex,
  flexColumn,
  horizontalPadding,
  hover,
  padding,
  pointer,
  transition,
  verticalPadding,
} from "libs/styles";

interface TabInterface {
  title: string;
  active: boolean;
  onClick: () => void;
}

export const tabHorizontalPadding = 8;

function Tab({ active: activeProp, title, onClick }: TabInterface) {
  return (
    <Wrapper
      as="button"
      disabled={activeProp}
      styles={[
        disableOutline,
        verticalPadding(0),
        horizontalPadding(tabHorizontalPadding),
        backgroundColor("white"),
        flex,
        flexColumn,
        ai(Aligns.CENTER),
        borderNone,
        !activeProp && [pointer, hover(child(color("gray-blue/07"))), active(child(color("gray-blue/09")))],
      ]}
      onClick={onClick}
    >
      <Typography
        type="body-semi-bold"
        color={activeProp ? "gray-blue/09" : "gray-blue/05"}
        styles={[transition(`border-bottom-color ${duration160}, color ${duration160}`), padding("8px 4px")]}
      >
        {title}
      </Typography>
    </Wrapper>
  );
}

export default withPerformance(["onClick"])(Tab);
