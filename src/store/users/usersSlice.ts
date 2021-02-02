import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateKeys } from 'constants/localStorageKeys';
import { User } from 'types/BoardPage.types';
import { UsersState } from 'types/store.types';

export const defaultUsers: UsersState = localStorage.getItem('usersState')
  ? JSON.parse(localStorage.getItem('usersState') || '')
  : [];

const usersSlice = createSlice({
  name: 'users',
  initialState: defaultUsers,
  reducers: {
    addUser(users, action: PayloadAction<User>) {
      users.push(action.payload);

      localStorage.setItem(RootStateKeys.USERS_STATE, JSON.stringify(users));
    },
    removeUser(users, action: PayloadAction<User>) {
      const targetIndex = users.findIndex(
        (user) => user.id === action.payload.id
      );

      users.splice(targetIndex, 1);

      localStorage.setItem(RootStateKeys.USERS_STATE, JSON.stringify(users));
    },
  },
});

export const { addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
