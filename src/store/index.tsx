import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { State } from 'types/store.types';
import boardReducer, { defaultBoard } from './board/boardSlice';
import usersReducer, { defaultUsers } from './users/usersSlice';
import authReducer, { defaultAuth } from './auth/authSlice';
import { Provider } from 'react-redux';

export let defaultState: State = {
  board: defaultBoard,
  users: defaultUsers,
  auth: defaultAuth,
};

interface IStoreProps {
  children: JSX.Element[] | JSX.Element;
}

const rootReducer = combineReducers({
  board: boardReducer,
  auth: authReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const StoreProvider = ({ children }: IStoreProps) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: defaultState,
  });

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
