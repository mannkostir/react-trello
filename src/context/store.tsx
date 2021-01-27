import React, { createContext, useReducer } from 'react';
import { State } from 'types/store.types';
import { Action } from 'types/actions.types';
import { boardReducer } from './board/boardReducer';

let defaultState: State = {
  lists: [],
  cards: [],
  comments: [],
  users: [],
};
let defaultDispatch: React.Dispatch<any> = () => {};

export const StateContext = createContext(defaultState);
export const DispatchContext = createContext(defaultDispatch);

interface IStoreProps {
  children: JSX.Element[] | JSX.Element;
}

export const StoreProvider = ({ children }: IStoreProps) => {
  const [state, dispatch] = useReducer(boardReducer, defaultState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default StoreProvider;
