import { StoreContext } from "light-state-manager";

import { updatePageState } from "./services";

export interface State {
  state: any;
}
const initialState: State = {
  state: null,
};

export default new StoreContext({
  initialState,
  actions: {
    updatePageState,
  },
});
