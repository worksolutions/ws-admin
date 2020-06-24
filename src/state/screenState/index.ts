import { Inject, Service } from "typedi";
import { observable } from "mobx";

import { StateContainer } from "../stateContainer";

@Service({ global: true })
export class ScreenState {
  @observable
  @Inject(() => StateContainer)
  stateContainer!: StateContainer;
}
