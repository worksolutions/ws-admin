import React from "react";
import styled from "styled-components";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Icon from "primitives/Icon";

import { position, absoluteCenter } from "libs/styles";

import { BackgroundTaskStatus } from "../../types";

import { getProgressGradientColor, getStroke, circleWidth } from "./lib";

const { Progress } = require("react-circle-progress-bar");

const StyledProgress = styled(Progress)`
  width: ${circleWidth}px !important;
`;

const getChildForStatus = {
  [BackgroundTaskStatus.ACTIVE]: (valuePercent: number) => (
    <Typography styles={[position("absolute"), absoluteCenter]} type="overline-medium" color="gray-blue/05">
      {valuePercent.toFixed(0)}%
    </Typography>
  ),
  [BackgroundTaskStatus.COMPLETE]: (_valuePercent: number) => (
    <Icon styles={[position("absolute"), absoluteCenter]} iconName="check" color="green/05" />
  ),
  [BackgroundTaskStatus.ERROR]: (_valuePercent: number) => (
    <Icon styles={[position("absolute"), absoluteCenter]} iconName="alert" color="red/05" />
  ),
};

function PercentCircle({ value, status }: { status: BackgroundTaskStatus; value: number }) {
  const valuePercent = value * 100;
  return (
    <Wrapper styles={[position("relative")]}>
      <StyledProgress
        transitionDuration={0.2}
        progress={valuePercent}
        strokeWidth={getStroke(2)}
        hideBall
        hideValue
        reduction={0}
        gradient={getProgressGradientColor(status)}
      />
      {getChildForStatus[status](valuePercent)}
    </Wrapper>
  );
}

export default React.memo(PercentCircle);
