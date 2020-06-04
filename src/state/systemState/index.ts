import { action, observable } from "mobx";
import { Inject, Service } from "typedi";

import { METHODS, RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";
import { promisifyAPI } from "libs/promisifyAPI";

import { StateContainer } from "../stateContainer";
import { LoadingContainer } from "../loadingContainer";

import { AnyDataSource, ContainsDataSourceInterface } from "types/DataSource";

export interface BlockInterface {
  type: string;
  dataSource?: AnyDataSource;
}

export interface PageInterface {
  pageUrl: string;
  title: string;
  blocks: BlockInterface[];
}

@Service({ global: true })
export class SystemState {
  @Inject(() => RequestManager) private requestManager!: RequestManager;

  @observable
  @Inject(() => StateContainer)
  stateContainer!: StateContainer<{
    title: string;
    roles: string[];
    logo: string;
    sideMenu: ContainsDataSourceInterface<AnyDataSource>;
    pages: PageInterface[];
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
