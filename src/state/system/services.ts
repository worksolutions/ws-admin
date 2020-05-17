import { assocPath, compose } from "ramda";

import { Action } from "state/store";

import { State } from "./state";

import ApiDataProvider from "dataProviders/ApiDataProvider";
import { promisifyAPI } from "state/lib";

export const getAdminConfig = new Action<State>().create(
  {
    success: (state, payload) => {
      return compose(
        assocPath(["loading"], false),
        assocPath(["workShifts"], payload),
      )(state) as State;
    },
  },
  (actions) =>
    promisifyAPI(
      ApiDataProvider.getMainConfig,
      () => {},
      actions.success,
      () => {},
    ),
);

export interface SystemStateInterface {
  appConfig: any[];
}
