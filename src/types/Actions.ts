import { METHODS } from "libs/request";

export enum ActionType {
  API_REQUEST = "api:request",
  REDIRECT = "redirect",
  UPDATE_CONTEXT = "update-context",
}

export type RawActionOptions = {
  [ActionType.API_REQUEST]: {
    removeEmptyString?: boolean;
    reference: string;
    method: METHODS;
    body?: Record<string, number | string>;
  };
  [ActionType.REDIRECT]: {
    reference: string;
    useReplace?: boolean;
    delay?: number;
  };
  [ActionType.UPDATE_CONTEXT]: {};
};

export interface RawActionInterface<T extends ActionType> {
  type: T;
  options: RawActionOptions[T];
  context?: string;
}

export type RealAnyRawAction =
  | RawActionInterface<ActionType.API_REQUEST>
  | RawActionInterface<ActionType.REDIRECT>
  | RawActionInterface<ActionType.UPDATE_CONTEXT>;

export type AnyRawAction = RealAnyRawAction[] | RealAnyRawAction;

export type ContainsRawActions<Actions> = {
  actions: Actions;
};
