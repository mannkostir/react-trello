import { State } from 'types/store.types';
import { UsersAction, UsersActions } from './usersActions';

const createUUID = () => {
  return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
};

export const usersReducer = (state: State, action: UsersAction): State => {
  switch (action.type) {
    case UsersActions.ADD_USER: {
      const newUsers: typeof state.users = [
        ...state.users,
        { id: action.payload.id, username: action.payload.username },
      ];

      return { ...state, users: newUsers };
    }
    default:
      return state;
  }
};
