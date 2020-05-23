import { METHODS } from "../../libs/request";

export enum ActionHandlerType {
  REDIRECT = "redirect",
  API_REQUEST = "api:request",
}

export type ActionHandlerOptions = {
  [ActionHandlerType.REDIRECT]: { url: string };
  [ActionHandlerType.API_REQUEST]: {
    url: string;
    method?: METHODS;
    params?: {
      [key: string]: string | number;
    };
  };
};

export interface ActionHandlerInterface<T extends ActionHandlerType> {
  type: T;
  options: ActionHandlerOptions[T];
}

export interface ActionsInterface {
  [key: string]: {
    permissions: boolean;
    type: string;
    options: ActionHandlerInterface<any>;
  };
}

export interface ActionInterface {
  (localContext?: any): Promise<any>;
}

export interface AdminComponentInterface {
  data?: any;
  config?: any;
  actions?: {
    [key: string]: ActionInterface;
  };
  blocks?: any[];
}
