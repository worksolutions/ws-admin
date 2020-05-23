import { StoreContext } from "light-state-manager";

import { updatePageState } from "./services";

export interface State {
  context: any;
}
const initialState: State = {
  context: null,
};

export default new StoreContext({
  initialState,
  actions: {
    updatePageState,
  },
});
