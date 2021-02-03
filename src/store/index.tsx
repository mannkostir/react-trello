import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { State } from 'types/store.types';
import usersReducer, { defaultUsers } from './users/usersSlice';
import authReducer, { defaultAuth } from './auth/authSlice';
import listsReducer, { defaultLists } from './lists/listsSlice';
import cardsReducer, { defaultCards } from './cards/cardsSlice';
import commentsReducer, { defaultComments } from './comments/commentsSlice';
import { Provider } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

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

const persistedReducer = persistReducer({ key: 'root', storage }, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const StoreProvider = ({ children }: IStoreProps) => {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState: defaultState,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  });

  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
