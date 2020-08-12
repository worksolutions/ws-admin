import React from "react";
import { duration200 } from "layout/durations";
import { elevation32 } from "style/shadows";

import Wrapper from "primitives/Wrapper";

import {
  backgroundColor,
  border,
  borderRadius,
  height,
  left,
  opacity,
  padding,
  position,
  right,
  top,
  transition,
} from "libs/styles";
import { useMeasure } from "libs/hooks/useMeasure";

const paddingTopValue = 8;
const paddingBottomValue = 24;
const childContainerBorder = 1;

function getOpenedBoxHeight(childHeight: number) {
  return childHeight + paddingTopValue + paddingBottomValue + childContainerBorder * 2;
}

function DroppedMenuWrapper({ children, opened }: { children: React.ReactNode; opened: boolean }) {
  const [ref, bounds] = useMeasure();
  return (
    <Wrapper
      styles={[
        transition(`opacity ${duration200}, height ${duration200}, box-shadow ${duration200}`),
        position("absolute"),
        left(-1),
        right(-1),
        top("calc(100% + 4px)"),
        borderRadius(8),
        backgroundColor("white"),
        opened ? [elevation32, opacity(1), height(getOpenedBoxHeight(bounds.height))] : [opacity(0), height(0)],
      ]}
    >
      <Wrapper
        ref={ref}
        styles={[
          borderRadius(8),
          border(childContainerBorder, "gray-blue/02"),
          padding(`${paddingTopValue}px 16px ${paddingBottomValue}px 16px`),
        ]}
      >
        {children}
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(DroppedMenuWrapper);
