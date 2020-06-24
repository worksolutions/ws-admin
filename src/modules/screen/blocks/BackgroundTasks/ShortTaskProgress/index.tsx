import React from "react";

import Wrapper from "primitives/Wrapper";

import {
  borderRadius,
  border,
  backgroundColor,
  marginRight,
  flexShrink,
  overflow,
  fullHeight,
  width,
  height,
} from "libs/styles";

import { BackgroundTaskInterface } from "../types";
import { colorsForBackgroundTaskStatuses } from "../Task/PercentCircle/lib";

function ShortProgress({ task }: { task: BackgroundTaskInterface }) {
  return (
    <Wrapper
      styles={[
        height(8),
        overflow("hidden"),
        borderRadius(8),
        border(1, "gray-blue/02"),
        backgroundColor("white"),
        marginRight(8),
        flexShrink(0),
        width(`calc(25% - 8px)`),
      ]}
    >
      <Wrapper
        styles={[
          fullHeight,
          backgroundColor(colorsForBackgroundTaskStatuses[task.status]),
          width(`calc(${task.percent} * 100%)`),
        ]}
      />
    </Wrapper>
  );
}

export default React.memo(ShortProgress);
