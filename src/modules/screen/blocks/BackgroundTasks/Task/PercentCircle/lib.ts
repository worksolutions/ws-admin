import { Colors, getColor } from "libs/styles";

import { BackgroundTaskStatus } from "../../types";

export const colorsForBackgroundTaskStatuses: Record<BackgroundTaskStatus, Colors> = {
  [BackgroundTaskStatus.ACTIVE]: "blue/05",
  [BackgroundTaskStatus.COMPLETE]: "green/05",
  [BackgroundTaskStatus.ERROR]: "red/05",
};

export function getProgressGradientColor(status: BackgroundTaskStatus) {
  const color = getColor(colorsForBackgroundTaskStatuses[status]);
  return [
    { stop: 0.0, color },
    { stop: 1, color },
  ];
}

export const circleWidth = 40;
const originalWidth = 200;

export function getStroke(strokeWidth: number) {
  return (strokeWidth * originalWidth) / circleWidth;
}
