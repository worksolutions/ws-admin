import { StoreContext } from "light-state-manager";

import { SystemStateInterface } from "./services";

export interface State extends SystemStateInterface {}

const initialState: State = {
  appConfig: null,
};

export default new StoreContext({
  initialState,
  actions: {},
});
