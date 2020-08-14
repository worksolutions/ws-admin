import { observable } from "mobx";

export class ProviderLogic {
  static attributeName = "system-loader-provider";

  private id = 1;

  @observable
  providers: Record<number | string, { spinnerCount: number }> = {};

  generateId() {
    return this.id++;
  }
}

export const providerLogicStore = new ProviderLogic();
