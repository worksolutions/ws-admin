import { METHODS } from "../libs/request";

export enum ActionType {
  API_REQUEST = "api:request",
  REDIRECT = "redirect",
  UPDATE_CONTEXT = "update-context",
}

export type ActionOptions = {
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

export interface ActionInterface<T extends ActionType> {
  type: T;
  options: ActionOptions[T];
  context?: string;
}

export type AnyAction =
  | ActionInterface<ActionType.API_REQUEST>
  | ActionInterface<ActionType.REDIRECT>
  | ActionInterface<ActionType.UPDATE_CONTEXT>;

export type ContainsActions<Actions> = {
  actions: Actions;
};
