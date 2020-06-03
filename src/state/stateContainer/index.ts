import { action, computed, observable } from "mobx";
import { Service } from "typedi";
import set from "lodash/set";
import merge from "lodash/merge";
import { path } from "ramda";

@Service({ transient: true })
export class StateContainer<T = Record<string, any>> {
  @observable state: T = {} as T;

  @computed get empty() {
    return Object.keys(this.state).length === 0;
  }

  path(pathValue: (string | number)[]) {
    return path(pathValue, this.state);
  }

  @action
  patchState(path: (string | number)[], value: any) {
    set(this.state as any, path, value);
  }

  @action.bound
  mergeStates(value: object) {
    merge(this.state, value);
  }

  @action.bound
  setState(state: T) {
    this.state = state;
  }

  @action.bound
  clearState() {
    this.state = {} as T;
  }
}
