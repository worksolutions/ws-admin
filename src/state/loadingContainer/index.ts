import { Service } from "typedi";
import { action, observable } from "mobx";

@Service({ transient: true })
export class LoadingContainer {
  @observable loading = false;

  @action.bound
  private promisifyStateSuccess(arg: any) {
    this.stopLoading();
    return arg;
  }

  promisifyAPI = {
    stateStart: this.startLoading,
    stateSuccess: this.promisifyStateSuccess,
    stateError: this.stopLoading,
  };

  @action
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  @action.bound
  startLoading() {
    this.loading = true;
  }

  @action.bound
  stopLoading() {
    this.loading = false;
  }
}
