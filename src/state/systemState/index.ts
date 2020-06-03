import { action, observable } from "mobx";
import { Inject, Service } from "typedi";

import { Icons } from "primitives/Icon";

import { METHODS, RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";
import { promisifyAPI } from "libs/promisifyAPI";

import { StateContainer } from "../stateContainer";
import { LoadingContainer } from "../loadingContainer";

import { ContainsDataSourceInterface, DataSourceInterface } from "types/DataSource";

export type PrimarySideMenuDataSourceInterface = DataSourceInterface<{ to: string; hint: string; icon: Icons }[]>;

@Service({ global: true })
export class SystemState {
  @Inject(() => RequestManager) private requestManager!: RequestManager;

  @observable
  @Inject(() => StateContainer)
  stateContainer!: StateContainer<{
    title: string;
    roles: string[];
    logo: string;
    sideMenu: {
      primary: ContainsDataSourceInterface<PrimarySideMenuDataSourceInterface>;
      secondary: ContainsDataSourceInterface<any>;
    };
    pages: any[];
  }>;

  @observable
  @Inject(() => LoadingContainer)
  loadingContainer!: LoadingContainer;

  @action.bound
  loadConfig() {
    promisifyAPI(
      this.requestManager.createRequest("/admin/config", METHODS.GET, identityValueDecoder),
      this.loadingContainer.promisifyAPI,
    ).then(this.stateContainer.setState);
  }
}
