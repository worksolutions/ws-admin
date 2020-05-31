import { Action } from "light-state-manager";
import { assocPath } from "ramda";

export function promisifyAPI<T>(
  api: () => Promise<T>,
  states: {
    stateStart?: () => any;
    stateSuccess?: (data: T) => any;
    stateError?: (data: any) => any;
  },
): Promise<T> {
  return new Promise((resolve, reject) => {
    if (states.stateStart) states.stateStart();
    api().then(
      (data) => {
        if (states.stateSuccess) states.stateSuccess(data);
        resolve(data);
      },
      (error) => {
        if (states.stateError) states.stateError(error);
        reject(error);
      },
    );
  });
}

export interface UpdateStatePayload {
  path: string;
  data: any;
}
export const _updatePageState = new Action<any>().create(
  {
    save: (state, { path, data }: UpdateStatePayload) => {
      const pathList = path ? path.split(".") : [];
      return assocPath(pathList, data)(state);
    },
  },
  (actions, payload: UpdateStatePayload) => {
    actions.save(payload);
  },
);
