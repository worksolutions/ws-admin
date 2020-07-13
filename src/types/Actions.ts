import { METHODS } from "../libs/request";

export enum ActionType {
  API_REQUEST = "api:request",
  REDIRECT = "redirect",
}

export type ActionOptions = {
  [ActionType.API_REQUEST]: {
    url: string;
    method: METHODS;
    body?: Record<string, number | string>;
  };
  [ActionType.REDIRECT]: {
    reference: string;
    useReplace?: boolean;
  };
};

export interface ActionInterface<T extends ActionType> {
  type: T;
  options: ActionOptions[T];
  context?: string;
}

export type AnyAction = ActionInterface<ActionType.API_REQUEST> | ActionInterface<ActionType.REDIRECT>;

export type ContainsActions<Actions> = {
  actions: Actions;
};
