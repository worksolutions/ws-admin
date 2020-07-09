import { Inject, Service } from "typedi";
import { observable } from "mobx";

import { StateContainer } from "../stateContainer";

export interface GlobalStateCommonPartInterface {
  currentUser: {
    avatar: string;
    email: string;
    name: string;
  };
}

@Service({ global: true })
export class GlobalState {
  @observable
  @Inject(() => StateContainer)
  stateContainer!: StateContainer<GlobalStateCommonPartInterface>;
}
