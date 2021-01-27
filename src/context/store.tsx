import React, { createContext, Reducer, useEffect, useReducer } from 'react';
import type { ReducerWithoutAction } from 'react';
import { State } from 'types/store.types';
import { Action, AnyAction } from 'types/actions.types';
import { boardReducer } from './board/boardReducer';
import { signInAC } from './auth/authActions';
import { usersReducer } from './users/usersReducer';
import { authReducer } from './auth/authReducer';
import { card, comment, list, user } from 'types/BoardPage.types';

export let defaultState: State = {
  board: {
    lists: [],
    cards: [],
    comments: [],
  },
  users: {
    users: [],
  },
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
  const finalReducers: ReducersMapObject = {};

  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  const finalReducerKeys = Object.keys(finalReducers);

  return function combine(
    state: StateFromReducersMapObject<typeof reducers> = {},
    action: AnyAction
  ) {
    let hasChanged = false;
    const nextState: typeof state = {};

    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged =
      hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    // !!!
    // Just a temporary
    return hasChanged ? (nextState as State) : (state as State);
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
