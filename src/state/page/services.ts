import { assocPath } from "ramda";
import { Action } from "light-state-manager";

import { State } from "./state";

interface Payload {
  path: string;
  data: any;
}
export const updatePageState = new Action<State>().create(
  {
    save: (state, { path, data }: Payload) => {
      return assocPath(["state", ...path.split(".")], data)(state) as State;
    },
  },
  (actions, payload: Payload) => {
    actions.save(payload);
  },
);
