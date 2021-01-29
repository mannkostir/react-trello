import { createAction } from 'types/actions.types';
import { User } from 'types/BoardPage.types';

export enum AuthActionTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

export const signInAC = (userData: User) =>
  createAction(AuthActionTypes.SIGN_IN, userData);

export const signOutAC = (userData: Pick<User, 'id'>) =>
  createAction(AuthActionTypes.SIGN_OUT, userData);

export type AuthAction =
  | ReturnType<typeof signInAC>
  | ReturnType<typeof signOutAC>;
