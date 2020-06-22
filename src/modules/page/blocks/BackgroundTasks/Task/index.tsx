import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import { withPerformance } from "libs/CB/changeDetectionStrategy/withPerformance";
import {
  ai,
  Aligns,
  backgroundColor,
  border,
  borderRadius,
  flex,
  flexColumn,
  flexShrink,
  flexValue,
  marginLeft,
  marginRight,
  padding,
  width,
} from "libs/styles";

import {
  BackgroundTaskActiveInterface,
  BackgroundTaskCompleteInterface,
  BackgroundTaskErrorInterface,
  BackgroundTaskInterface,
  BackgroundTaskStatus,
} from "../types";

import PercentCircle from "./PercentCircle";

const getTextForStatus = {
  [BackgroundTaskStatus.ACTIVE]: (task: BackgroundTaskActiveInterface) => task.text,
  [BackgroundTaskStatus.COMPLETE]: (_task: BackgroundTaskCompleteInterface) => "Завершено",
  [BackgroundTaskStatus.ERROR]: (_task: BackgroundTaskErrorInterface) => "Произошла ошибка",
};

export default withPerformance([])(function ({ task }: { task: BackgroundTaskInterface }) {
  return (
    <Wrapper
      styles={[
        flex,
        ai(Aligns.CENTER),
        padding("8px 12px"),
        borderRadius(8),
        border(1, "gray-blue/02"),
        backgroundColor("white"),
        marginRight(8),
        flexShrink(0),
        width(`calc(25% - 8px)`),
      ]}
    >
      <PercentCircle status={task.status} value={task.status === BackgroundTaskStatus.ACTIVE ? task.percent : 1} />
      <Wrapper styles={[flexValue(1), flex, flexColumn, marginLeft(8)]}>
        <Typography type="body-semi-bold">{task.name}</Typography>
        <Typography type="caption-regular" color="gray-blue/05">
          {getTextForStatus[task.status](task)}
        </Typography>
      </Wrapper>
    </Wrapper>
  );
});
