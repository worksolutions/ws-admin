import { StoreContext } from "light-state-manager";

import { _updatePageState } from "../lib";

const initialState = {};

export default new StoreContext(initialState, {
  _updatePageState,
});
