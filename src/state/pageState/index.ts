import { Inject, Service } from "typedi";
import { observable } from "mobx";

import { StateContainer } from "../stateContainer";

@Service({ global: true })
export class PageState {
  @observable
  @Inject(() => StateContainer)
  stateContainer!: StateContainer;
}
