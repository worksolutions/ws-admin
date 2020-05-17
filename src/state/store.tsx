import React from "react";

import { useForceUpdate } from "libs/hooks";

export class StoreContext<State extends Record<string, any>, Actions> {
  static connectContexts(
    storeContexts: [StoreContext<any, any>, string][],
    Component: React.FC<any>,
  ) {
    let current = Component;
    storeContexts.forEach(([storeContext, name]) => {
      current = storeContext.provideContext(current, name);
    });
    return current;
  }

  private readonly context: React.Context<any>;
  private readonly Provider: React.FC<{ children: any }>;
  private readonly actions: any;

  constructor(initialState: State, actions: Actions) {
    this.context = React.createContext(null);
    this.actions = actions;

    const storeInitialState = Object.assign({}, initialState, actions);

    this.Provider = ({ children }) => {
      const state = React.useRef(storeInitialState);
      const update = useForceUpdate();

      const actions: any = {};
      for (const thisActionKey in this.actions) {
        const realAction = this.actions[thisActionKey];
        const patchedAction: any = {};
        for (const actionKey in realAction.actions) {
          patchedAction[actionKey] = (payload) => {
            state.current = Object.assign(
              {},
              state.current,
              realAction.actions[actionKey].call(null, state.current, payload),
            );
            update();
          };
        }
        actions[thisActionKey] = realAction.caller.bind(
          state.current,
          patchedAction,
        );
      }

      return (
        <this.context.Provider
          value={Object.assign({}, state.current, actions)}
        >
          {children}
        </this.context.Provider>
      );
    };
  }

  getState() {
    return React.useContext<Actions & State>(this.context);
  }

  provideContext<T>(Component: React.FC<T>, name: string): React.FC<T> {
    const cmp = (props) => (
      <this.Provider>
        <Component {...props} />
      </this.Provider>
    );
    cmp.displayName = name;
    return cmp;
  }
}

export class Action<State> {
  create<
    CallerData,
    CallerResult,
    Actions extends {
      [name: string]: (state: State, payload?: any) => State;
    }
  >(
    actions: Actions,
    caller: (
      this: State,
      actions: {
        [K in keyof Actions]: (payload?: Parameters<Actions[K]>[1]) => State;
      },
      data: CallerData,
    ) => CallerResult,
  ): unknown extends Required<CallerData>
    ? () => CallerResult
    : (data: CallerData) => CallerResult {
    // @ts-ignore
    return {
      actions,
      caller,
    };
  }
}

export function createLoadingStartAction<
  State extends { loading: boolean; error: string }
>(append?: (state: State) => State) {
  return function (state: State) {
    let newState: State = { ...state, loading: true, error: null };
    if (append) newState = append(newState);
    return newState;
  };
}

export function createLoadingSuccessAction<
  State extends { loading: boolean; error: string }
>(append?: (state: State) => State) {
  return function (state: State) {
    let newState: State = { ...state, loading: false };
    if (append) newState = append(newState);
    return newState;
  };
}

export function createLoadingErrorAction<
  State extends { loading: boolean; error: string }
>(append?: (state: State) => State) {
  return function (state: State, error: string) {
    let newState: State = { ...state, loading: false, error };
    if (append) newState = append(newState);
    return newState;
  };
}

export type LoadingState<
  LOADING extends string = "loading",
  ERROR extends string = "error"
> = { [T in LOADING]: boolean } & { [T in ERROR]: string };
