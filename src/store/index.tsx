import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { State } from 'types/store.types';
import usersReducer, { defaultUsers } from './users/usersSlice';
import authReducer, { defaultAuth } from './auth/authSlice';
import listsReducer, { defaultLists } from './lists/listsSlice';
import cardsReducer, { defaultCards } from './cards/cardsSlice';
import commentsReducer, { defaultComments } from './comments/commentsSlice';
import { Provider } from 'react-redux';

export let defaultState: State = {
  lists: defaultLists,
  cards: defaultCards,
  comments: defaultComments,
  users: defaultUsers,
  auth: defaultAuth,
};

interface IStoreProps {
  children: JSX.Element[] | JSX.Element;
}

const rootReducer = combineReducers({
  lists: listsReducer,
  cards: cardsReducer,
  comments: commentsReducer,
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
