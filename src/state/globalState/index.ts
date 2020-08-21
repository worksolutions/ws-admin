import { action, observable } from "mobx";
import { Inject, Service } from "typedi";

import { METHODS, RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";
import { promisifyAPI } from "libs/promisifyAPI";

import { AuthTokenSaveStrategy } from "modules/auth/authTokenSaver";

import { StateContainer } from "../stateContainer";
import { LoadingContainer } from "../loadingContainer";
import { FieldListItemType } from "../../modules/screen/blocks/RowFields/FieldsList/types";

import { AnyRawAction, ContainsRawActions } from "types/Actions";
import { AnyDataSource, ContainsDataSourceInterface } from "types/DataSource";

export type BlockInterface<O extends Record<string, any> = {}, A extends string = string> = {
  dataSource?: AnyDataSource;
  options?: O | null;
  id?: string;
  waitForId?: string;
} & Partial<ContainsRawActions<Record<A, AnyRawAction>>>;

export type ContainBlocksInterface = {
  blocks: BlockInterface[];
};

export type ContainSlotsInterface = {
  slots: Record<string, BlockInterface>;
};

export interface UserInterface {
  avatar: string;
  email: string;
  name: string;
  postName?: string;
  customFields?: { title: string; type: FieldListItemType; options: any }[];
}

@Service({ global: true })
export class GlobalState {
  @Inject(() => RequestManager) private requestManager!: RequestManager;

  @observable
  @Inject(() => StateContainer)
  stateContainer!: StateContainer<{
    currentUser: UserInterface;
  }>;

  @observable
  @Inject(() => StateContainer)
  systemStateContainer!: StateContainer<{
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
      ContainsRawActions<{
        authenticate: AnyRawAction;
        resetPassword: AnyRawAction;
        logout: AnyRawAction;
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
    ).then(this.systemStateContainer.setState);
  }
}
