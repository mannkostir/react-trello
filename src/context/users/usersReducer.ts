import { updateState } from 'utils/updateState';
import { IUsersState } from 'types/store.types';
import { UsersAction, UsersActions } from './usersActions';

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
