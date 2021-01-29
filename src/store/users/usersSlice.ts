import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/BoardPage.types';
import { IUsersState } from 'types/store.types';

export const defaultUsers: IUsersState = localStorage.getItem('usersState')
  ? JSON.parse(localStorage.getItem('usersState') || '')
  : {
      users: [],
    };

const usersSlice = createSlice({
  name: 'users',
  initialState: defaultUsers,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    removeUser(state, action: PayloadAction<User>) {
      const targetIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );

      delete state.users[targetIndex];
    },
  },
});

export const { addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
