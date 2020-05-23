import { StoreContext } from "light-state-manager";

import { _updatePageState } from "./services";

export interface State {}
const initialState: State = {};

export default new StoreContext({
  initialState,
  actions: {
    _updatePageState,
  },
});
