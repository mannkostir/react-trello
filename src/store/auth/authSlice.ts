import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateKeys } from 'constants/localStorageKeys';
import { User } from 'types/BoardPage.types';
import { AuthState } from 'types/store.types';
import { createUUID } from 'utils/createUUID';

export const defaultAuth: AuthState = localStorage.getItem(
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
        password: action.payload.password,
      };

      state.currentUser = user;

      localStorage.setItem(RootStateKeys.AUTH_STATE, JSON.stringify(state));
    },
    signOut(state) {
      state.currentUser = null;

      localStorage.setItem(RootStateKeys.AUTH_STATE, JSON.stringify(state));
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
