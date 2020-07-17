import { METHODS } from "../libs/request";

export enum ActionType {
  API_REQUEST = "api:request",
  REDIRECT = "redirect",
  NONE = "none",
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
  [ActionType.NONE]: {};
};

export interface ActionInterface<T extends ActionType> {
  type: T;
  options: ActionOptions[T];
  context?: string;
}

export type AnyAction =
  | ActionInterface<ActionType.API_REQUEST>
  | ActionInterface<ActionType.REDIRECT>
  | ActionInterface<ActionType.NONE>;

export type ContainsActions<Actions> = {
  actions: Actions;
};
