import { action, observable } from "mobx";

export class ProgressContainer {
  @observable
  progressValue = 0;

  @action.bound
  setProgress(progress: number, scale = 1) {
    this.progressValue = progress * scale;
  }
}
