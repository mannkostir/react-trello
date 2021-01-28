import { Action, ActionWithPayload } from 'types/actions.types';
import { user } from 'types/BoardPage.types';

export enum AuthActionTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

function createAction<T extends string>(type: T): Action<T>;
function createAction<T extends string, P extends object>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;
function createAction<T extends string, P extends object>(
  type: T,
  payload?: P
) {
  return { type, ...(payload ? { payload } : {}) };
}

export const signInAC = (userData: user) =>
  createAction(AuthActionTypes.SIGN_IN, userData);

export const signOutAC = (userData: Pick<user, 'id'>) =>
  createAction(AuthActionTypes.SIGN_OUT, userData);

export type AuthAction =
  | ReturnType<typeof signInAC>
  | ReturnType<typeof signOutAC>;