import { Inject, Service } from "typedi";
import { observable } from "mobx";

import { StateContainer } from "../stateContainer";
import { LoadingContainer } from "../loadingContainer";

class User {
  login = "";
  permissions: string[] = [];
}

@Service({ global: true })
export class GlobalState {
  @observable
  @Inject(() => StateContainer)
  stateContainer!: StateContainer;

  @observable
  @Inject(() => LoadingContainer)
  loadingState!: LoadingContainer;

  @observable currentUser: User = new User();
}
