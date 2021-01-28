import { updateState } from 'shared/utils/updateState';
import { IUsersState, State } from 'types/store.types';
import { UsersAction, UsersActions } from './usersActions';

const createUUID = () => {
  return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
};

export const usersReducer = (
  state: IUsersState,
  action: UsersAction
): IUsersState => {
  switch (action.type) {
    case UsersActions.ADD_USER: {
      const newUsers: typeof state.users = [
        ...state.users,
        { id: action.payload.id, username: action.payload.username },
      ];

      return updateState(state, { users: newUsers }, 'usersState');
    }
    default:
      return state;
  }
};
