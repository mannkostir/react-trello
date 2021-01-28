import React, { createContext, Reducer, useReducer } from 'react';
import { IAuthState, IBoardState, IUsersState, State } from 'types/store.types';
import { Action, AnyAction } from 'types/actions.types';
import { boardReducer } from './board/boardReducer';
import { usersReducer } from './users/usersReducer';
import { authReducer } from './auth/authReducer';

console.log();

const defaultBoard: IBoardState | null = localStorage.getItem('boardState')
  ? JSON.parse(localStorage.getItem('boardState') || '')
  : null;

const defaultUsers: IUsersState | null = localStorage.getItem('usersState')
  ? JSON.parse(localStorage.getItem('usersState') || '')
  : null;

const defaultAuth: IAuthState | null = localStorage.getItem('authState')
  ? JSON.parse(localStorage.getItem('authState') || '')
  : null;

export let defaultState: State = {
  board: defaultBoard || {
    lists: [
      { id: '1', title: 'To Do' },
      { id: '2', title: 'In Progress' },
      { id: '3', title: 'Testing' },
      { id: '4', title: 'Done' },
    ],
    cards: [],
    comments: [],
  },
  users: defaultUsers || {
    users: [],
  },
  auth: defaultAuth || {
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
