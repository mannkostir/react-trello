import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/BoardPage.types';
import { AuthState } from 'types/store.types';
import { createUUID } from 'utils/createUUID';

export const defaultAuth: AuthState = {
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
    },
    signOut(state) {
      state.currentUser = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
