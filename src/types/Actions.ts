import { METHODS } from "libs/request";

export enum ActionType {
  API_REQUEST = "api:request",
  API_UPLOAD_FILE = "api:uploadFile",
  REDIRECT = "redirect",
  UPDATE_CONTEXT = "update-context",
  OPEN_MODAL = "open-modal",
  CLOSE_MODAL = "close-modal",
}

export type RawActionOptions = {
  [ActionType.API_REQUEST]: {
    removeEmptyString?: boolean;
    removeNullableFields?: boolean;
    reference: string;
    method: METHODS;
    body?: Record<string, number | string>;
    saveToContext?: string;
  };
  [ActionType.API_UPLOAD_FILE]: {
    reference: string;
    saveToContext?: string;
  };
  [ActionType.REDIRECT]: {
    reference: string;
    useReplace?: boolean;
    delay?: number;
  };
  [ActionType.UPDATE_CONTEXT]: {
    context: string;
  };
  [ActionType.OPEN_MODAL]: {
    name: string;
  };
  [ActionType.CLOSE_MODAL]: string;
};

export interface RawActionInterface<T extends ActionType> {
  type: T;
  options: RawActionOptions[T];
}

export type RealAnyRawAction =
  | RawActionInterface<ActionType.API_REQUEST>
  | RawActionInterface<ActionType.REDIRECT>
  | RawActionInterface<ActionType.UPDATE_CONTEXT>;

export type AnyRawAction = RealAnyRawAction[] | RealAnyRawAction;

export type ContainsRawActions<Actions> = {
  actions: Actions;
};
