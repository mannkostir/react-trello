import { IAuthState } from 'types/store.types';
import { AuthAction, AuthActionTypes } from './authActions';
import { defaultState } from '../store';

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

      return { ...state, currentUser: newCurrentUser };
    }
    case AuthActionTypes.SIGN_OUT: {
      const newCurrentUser: typeof state.currentUser =
        defaultState.auth.currentUser;

      return { ...state, currentUser: newCurrentUser };
    }
    default:
      return state;
  }
};
