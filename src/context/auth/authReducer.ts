import { State } from 'types/store.types';
import { UserAction, UserActionTypes } from './authActions';
import { defaultState } from '../store';

const createUUID = () => {
  return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
};

export const authReducer = (
  state = defaultState.auth,
  action: UserAction
): typeof defaultState.auth => {
  console.log(action.type);
  switch (action.type) {
    case UserActionTypes.SIGN_IN: {
      let uuid = createUUID();

      const newCurrentUser: typeof state.currentUser = {
        id: action.payload.id || uuid,
        username: action.payload.username,
      };

      return { ...state, currentUser: newCurrentUser };
    }
    case UserActionTypes.SIGN_OUT: {
      const newCurrentUser: typeof state.currentUser =
        defaultState.auth.currentUser;

      return { ...state, currentUser: newCurrentUser };
    }
  }
};
