import { assocPath, compose } from "ramda";

import { Action } from "state/store";

import { State } from "./state";

import AppDataProvider from "dataProviders";
import { promisifyAPI } from "state/lib";

export const getAdminConfig = new Action<State>().create(
  {
    success: (state, payload) => {
      return compose(assocPath(["appConfig"], payload))(state) as State;
    },
  },
  (actions) =>
    promisifyAPI(
      AppDataProvider.getMainConfig,
      () => {},
      actions.success,
      () => {},
    ),
);

export interface SystemStateInterface {
  appConfig: any;
}
