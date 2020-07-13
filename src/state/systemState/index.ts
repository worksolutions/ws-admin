import { action, observable } from "mobx";
import { Inject, Service } from "typedi";

import { METHODS, RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";
import { promisifyAPI } from "libs/promisifyAPI";

import { AuthTokenSaveStrategy } from "modules/auth/authTokenSaver";

import { StateContainer } from "../stateContainer";
import { LoadingContainer } from "../loadingContainer";

import { AnyAction, ContainsActions } from "types/Actions";
import { AnyDataSource, ContainsDataSourceInterface } from "types/DataSource";

export type BlockInterface<O extends Record<string, any> = {}, A extends string = string> = {
  dataSource?: AnyDataSource;
  options?: O;
} & Partial<ContainsActions<Record<A, AnyAction>>>;

export interface ScreenInterface {
  reference: string;
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
    screens: ScreenInterface[];
    mainReference: string;
    userAuthenticate: {
      topImage: string;
      rightImage: string;
      title: string;
      authTokenSaveStrategy?: AuthTokenSaveStrategy;
    } & ContainsDataSourceInterface<AnyDataSource> &
      ContainsActions<{
        authenticate: AnyAction;
        resetPassword: AnyAction;
      }>;
  }>;

  @observable
  @Inject(() => LoadingContainer)
  loadingContainer!: LoadingContainer;

  @action.bound
  loadConfig() {
    return promisifyAPI(
      this.requestManager.createRequest("/admin/config", METHODS.GET, identityValueDecoder),
      this.loadingContainer.promisifyAPI,
    ).then(this.stateContainer.setState);
  }
}
