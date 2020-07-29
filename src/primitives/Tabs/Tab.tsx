import React from "react";
import { duration200 } from "layout/durations";
import { UseMeasureRect } from "react-use/lib/useMeasure";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import { withPerformance } from "libs/CB/changeDetectionStrategy/withPerformance";
import {
  ai,
  Aligns,
  backgroundColor,
  borderBottom,
  borderNone,
  borderRadius,
  child,
  disableOutline,
  flex,
  flexColumn,
  horizontalPadding,
  padding,
  pointer,
  transition,
  focus,
  verticalPadding,
} from "libs/styles";

interface TabInterface {
  title: string;
  active: boolean;
  onClick: () => void;
  onWidthDetect: (width: number) => void;
}

export const calculateWidthDelayTime = 500;
export const tabHorizontalPadding = 8;

function Tab({ active, title, onClick, onWidthDetect }: TabInterface) {
  const ref = React.useRef<HTMLSpanElement>();

  React.useEffect(() => {
    setTimeout(() => onWidthDetect(ref.current!.getBoundingClientRect().width), calculateWidthDelayTime);
  }, []);

  return (
    <Wrapper
      as="button"
      ref={ref}
      disabled={active}
      styles={[
        pointer,
        disableOutline,
        verticalPadding(0),
        horizontalPadding(tabHorizontalPadding),
        borderRadius(6),
        backgroundColor("white"),
        flex,
        flexColumn,
        ai(Aligns.CENTER),
        borderNone,
        !active && focus(child(borderBottom(2, "gray-blue/02"))),
      ]}
      onClick={onClick}
    >
      <Typography
        type="body-semi-bold"
        styles={[transition(`border-bottom-color ${duration200}`), borderBottom(2, "transparent"), padding("8px 4px")]}
      >
        {title}
      </Typography>
    </Wrapper>
  );
}

export default withPerformance(["onClick"])(Tab);
