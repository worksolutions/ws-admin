export enum BackgroundTaskStatus {
  ACTIVE = "ACTIVE",
  COMPLETE = "COMPLETE",
  ERROR = "ERROR",
}

export interface BackgroundTaskActiveInterface {
  text: string;
  percent: number;
}

export interface BackgroundTaskCompleteInterface {}

export interface BackgroundTaskErrorInterface {
  message: string;
}

export type BackgroundTaskInterface = {
  status: BackgroundTaskStatus;
  name: string;
} & BackgroundTaskActiveInterface &
  BackgroundTaskCompleteInterface &
  BackgroundTaskErrorInterface;
