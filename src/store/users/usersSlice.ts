import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/BoardPage.types';
import { UsersState } from 'types/store.types';

export const defaultUsers: UsersState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState: defaultUsers,
  reducers: {
    addUser(users, action: PayloadAction<User>) {
      users.push(action.payload);
    },
    removeUser(users, action: PayloadAction<User>) {
      const targetIndex = users.findIndex(
        (user) => user.id === action.payload.id
      );

      users.splice(targetIndex, 1);
    },
  },
});

export const { addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
