import React, { useMemo } from "react";
import { duration160 } from "layout/durations";

import Wrapper from "primitives/Wrapper";

import {
  backgroundColor,
  borderRadius,
  boxShadow,
  createAlphaColor,
  fullHeight,
  fullWidth,
  height,
  left,
  overflow,
  position,
  top,
  transition,
  width,
  willChange,
  zIndex,
} from "libs/styles";

interface ProgressBarProps {
  value: number;
  styles?: any;
}

function ProgressBar({ value, styles }: ProgressBarProps) {
  const progressWidth = useMemo(() => width(`${value * 100}%`), [value]);

  return (
    <Wrapper
      styles={[
        fullWidth,
        boxShadow([0, 0, 0, 1, createAlphaColor("gray-blue/03", 127), true]),
        height(8),
        borderRadius(8),
        position("relative"),
        overflow("hidden"),
        styles,
      ]}
    >
      <Wrapper
        styles={[
          position("absolute"),
          top(0),
          left(0),
          willChange("width"),
          fullHeight,
          backgroundColor("blue/05"),
          progressWidth,
          zIndex(-1),
          transition(`width ${duration160}`),
        ]}
      />
    </Wrapper>
  );
}

export default React.memo(ProgressBar);
