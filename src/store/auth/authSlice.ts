import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateKeys } from 'constants/localStorageKeys';
import { User } from 'types/BoardPage.types';
import { IAuthState } from 'types/store.types';
import { createUUID } from 'utils/createUUID';

export const defaultAuth: IAuthState = localStorage.getItem(
  RootStateKeys.AUTH_STATE
)
  ? JSON.parse(localStorage.getItem(RootStateKeys.AUTH_STATE) || '')
  : {
      currentUser: null,
    };

const authSlice = createSlice({
  name: 'auth',
  initialState: defaultAuth,
  reducers: {
    signIn(state, action: PayloadAction<User>) {
      let uuid = createUUID();

      const user = {
        id: action.payload.id || uuid,
        username: action.payload.username,
      };

      state.currentUser = user;

      localStorage.setItem(RootStateKeys.AUTH_STATE, JSON.stringify(state));
    },
    signOut(state, action: PayloadAction<Pick<User, 'id'>>) {
      state.currentUser = null;

      localStorage.removeItem(RootStateKeys.AUTH_STATE);
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
