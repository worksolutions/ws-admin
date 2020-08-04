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
  options?: O | null;
  id?: string;
  waitForId?: string;
} & Partial<ContainsActions<Record<A, AnyAction>>>;

export type ContainBlocksInterface = {
  blocks: BlockInterface[];
};

export type ContainSlotsInterface = {
  slots: Record<string, BlockInterface>;
};

export interface CurrentUserInterface {
  avatar: string;
  email: string;
  name: string;
}

@Service({ global: true })
export class SystemState {
  @Inject(() => RequestManager) private requestManager!: RequestManager;

  @observable
  @Inject(() => StateContainer)
  stateContainer!: StateContainer<{
    currentUser: CurrentUserInterface;
    title: string;
    roles: string[];
    logo: string;
    sideMenu: ContainsDataSourceInterface<AnyDataSource>;
    mainBlock: BlockInterface;
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
        logout: AnyAction;
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
