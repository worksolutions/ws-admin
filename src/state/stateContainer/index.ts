import { action, computed, observable, toJS } from "mobx";
import { Service } from "typedi";
import set from "lodash/set";
import { path } from "ramda";

import { isPureObject } from "libs/is";

@Service({ transient: true })
export class StateContainer<T = Record<string, any>> {
  static nullable() {
    const container = new StateContainer();
    container.setState(null!);
    return container;
  }

  private static deepMergeStates(toState: any, fromState: any) {
    Object.entries(fromState).forEach(([name, value]) => {
      if (isPureObject(value) && isPureObject(toState[name])) {
        StateContainer.deepMergeStates(toState[name], value);
        return;
      }
      toState[name] = value;
    });
  }

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
    StateContainer.deepMergeStates(this.state, value);
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
