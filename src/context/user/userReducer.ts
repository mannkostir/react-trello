import { State } from 'types/store.types';
import { UserAction, UserActionTypes } from './userActions';

const createUUID = () => {
  return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
};

export const userReducer = (state: State, action: UserAction): State => {
  switch (action.type) {
    case UserActionTypes.ADD_USER: {
      let uuid = createUUID();

      const newUsers: typeof state.users = [
        ...state.users,
        { id: uuid, username: action.payload.username },
      ];

      return { ...state, users: newUsers };
    }
    case UserActionTypes.REMOVE_USER: {
      const newUsers: typeof state.users = state.users.filter(
        (user) => user.id !== action.payload.id
      );

      return { ...state, users: newUsers };
    }
  }
};
