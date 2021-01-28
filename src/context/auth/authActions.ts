import { createAction } from 'types/actions.types';
import { user } from 'types/BoardPage.types';

export enum AuthActionTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

export const signInAC = (userData: user) =>
  createAction(AuthActionTypes.SIGN_IN, userData);

export const signOutAC = (userData: Pick<user, 'id'>) =>
  createAction(AuthActionTypes.SIGN_OUT, userData);

export type AuthAction =
  | ReturnType<typeof signInAC>
  | ReturnType<typeof signOutAC>;
