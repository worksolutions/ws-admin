import React from "react";

import Wrapper from "primitives/Wrapper";

import {
  ai,
  Aligns,
  backgroundColor,
  border,
  borderRadius,
  child,
  flex,
  height,
  hover,
  margin,
  opacity,
  overflow,
  overflowX,
  overflowY,
  padding,
  transition,
  visibility,
  width,
} from "libs/styles";

import Task from "./Task";
import ShortTaskProgress from "./ShortTaskProgress";
import { BackgroundTaskInterface } from "./types";

export interface BackgroundTasksInterface {
  tasks: BackgroundTaskInterface[];
}

function BackgroundTasks({ tasks }: BackgroundTasksInterface) {
  return (
    <Wrapper
      styles={[
        margin("16px 24px"),
        padding("8px 0 8px 8px"),
        borderRadius(8),
        border(1, "gray-blue/02"),
        overflowX("scroll"),
        backgroundColor("gray-blue/01"),
        child([transition("all 0.2s"), height(0), opacity(0), visibility("hidden")], ".full-data"),
        child([transition("all 0.2s"), height(8), opacity(1), visibility("visible")], ".short-data"),
        hover([height(58), opacity(1), visibility("visible")], ".full-data"),
        hover([height(0), opacity(0), visibility("hidden")], ".short-data"),
      ]}
    >
      <Wrapper className="full-data" styles={[flex, ai(Aligns.CENTER)]}>
        {tasks.map((task, key) => (
          <Task task={task} key={key} />
        ))}
      </Wrapper>
      <Wrapper className="short-data" styles={[flex, ai(Aligns.CENTER)]}>
        {tasks.map((task, key) => (
          <ShortTaskProgress task={task} key={key} />
        ))}
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(BackgroundTasks);
