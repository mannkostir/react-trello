import React, { createContext, Reducer, useEffect, useReducer } from 'react';
import type { ReducerWithoutAction } from 'react';
import { State } from 'types/store.types';
import { Action, AnyAction } from 'types/actions.types';
import { boardReducer } from './board/boardReducer';
import { signInAC } from './auth/authActions';
import { usersReducer } from './users/usersReducer';
import { authReducer } from './auth/authReducer';

export let defaultState: State = {
  board: {
    lists: [],
    cards: [],
    comments: [],
  },
  users: [],
  auth: {
    currentUser: null,
  },
};
let defaultDispatch: React.Dispatch<any> = () => {};

export const StateContext = createContext(defaultState);
export const DispatchContext = createContext(defaultDispatch);

interface IStoreProps {
  children: JSX.Element[] | JSX.Element;
}

export type ReducersMapObject<S = any, A extends Action = AnyAction> = {
  [K in keyof S]: Reducer<S[K], A>;
};

export type StateFromReducersMapObject<M> = M extends ReducersMapObject
  ? { [P in keyof M]: M[P] extends Reducer<infer S, any> ? S : never }
  : never;

const combineReducers = (reducers: ReducersMapObject) => {
  const reducerKeys = Object.keys(reducers);

  return function combine(
    state: StateFromReducersMapObject<typeof reducers> = {},
    action: AnyAction
  ) {
    const nextState: typeof state = {};

    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
    }
    // !!!
    // Just a temporary
    return nextState as State;
  };
};

export const StoreProvider = ({ children }: IStoreProps) => {
  const [state, dispatch] = useReducer(
    combineReducers({
      board: boardReducer,
      auth: authReducer,
      users: usersReducer,
    }),
    defaultState
  );

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default StoreProvider;
