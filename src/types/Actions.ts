import { METHODS } from "libs/request";

export enum ActionType {
  API_REQUEST = "api:request",
  API_UPLOAD_FILE = "api:uploadFile",
  REDIRECT = "redirect",
  UPDATE_CONTEXT = "update-context",
  APPEND_CONTEXT = "append-context",
  OPEN_MODAL = "open-modal",
  CLOSE_MODAL = "close-modal",
  NOTIFY = "notify",
  MODIFY_OUTPUT_DATA_CONTEXT = "modify-output-data-context",
}

export type RawActionOptions = {
  [ActionType.API_REQUEST]: {
    removeEmptyString?: boolean;
    removeNullableFields?: boolean;
    reference: string;
    method: METHODS;
    body?: Record<string, number | string>;
    saveToContext?: string;
    takeIncomeDataFromPreviousAction?: boolean;
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
    takeIncomeDataFromPreviousAction?: boolean;
    context: string;
  };
  [ActionType.APPEND_CONTEXT]: {
    context: string;
    takeIncomeDataFromPreviousAction?: boolean;
  };
  [ActionType.OPEN_MODAL]: {
    name: string;
    takeIncomeDataFromActionInput?: boolean;
  };
  [ActionType.CLOSE_MODAL]: string;
  [ActionType.MODIFY_OUTPUT_DATA_CONTEXT]: {
    takeFromContext: string;
    giveToContext?: string;
    modificationTemplate?: string;
  };
  [ActionType.NOTIFY]: {
    text: string;
  };
};

export interface RawActionInterface<T extends ActionType> {
  type: T;
  options: RawActionOptions[T];
}

export type RealAnyRawAction =
  | RawActionInterface<ActionType.API_REQUEST>
  | RawActionInterface<ActionType.API_UPLOAD_FILE>
  | RawActionInterface<ActionType.REDIRECT>
  | RawActionInterface<ActionType.UPDATE_CONTEXT>
  | RawActionInterface<ActionType.APPEND_CONTEXT>
  | RawActionInterface<ActionType.OPEN_MODAL>
  | RawActionInterface<ActionType.CLOSE_MODAL>
  | RawActionInterface<ActionType.NOTIFY>
  | RawActionInterface<ActionType.MODIFY_OUTPUT_DATA_CONTEXT>;

export type AnyRawAction = RealAnyRawAction[] | RealAnyRawAction;

export type ContainsRawActions<Actions> = {
  actions: Actions;
};
