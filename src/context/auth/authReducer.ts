import { IAuthState } from 'types/store.types';
import { AuthAction, AuthActionTypes } from './authActions';
import { defaultState } from '../store';
import { updateState } from 'shared/utils/updateState';

const createUUID = () => {
  return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
};

export const authReducer = (
  state: IAuthState,
  action: AuthAction
): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN: {
      let uuid = createUUID();

      const newCurrentUser: typeof state.currentUser = {
        id: action.payload.id || uuid,
        username: action.payload.username,
      };

      return updateState(state, { currentUser: newCurrentUser }, 'authState');
    }
    case AuthActionTypes.SIGN_OUT: {
      const newCurrentUser: typeof state.currentUser =
        defaultState.auth.currentUser;

      return updateState(state, { currentUser: newCurrentUser }, 'authState');
    }
    default:
      return state;
  }
};
